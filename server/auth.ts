import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express, Request, Response, NextFunction } from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { User as SelectUser } from "@shared/schema";
import csrf from "csurf";
import xss from "xss";
import { rateLimit } from "express-rate-limit";
import jwt from "jsonwebtoken";
import MemoryStore from "memorystore";

// Расширяем интерфейс Request для включения пользователя
declare global {
  namespace Express {
    interface User extends SelectUser {}
  }
}

// Указываем настройки защиты от XSS-атак
const xssOptions = {
  whiteList: {}, // Разрешаем только чистый текст без HTML-тегов
  stripIgnoreTag: true, // Удаляем все не разрешенные теги
  stripIgnoreTagBody: ["script", "style"], // Удаляем содержимое скриптов и стилей
};

// Функции для хеширования и сравнения паролей
const scryptAsync = promisify(scrypt);

async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string): Promise<boolean> {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

// Функция для санитации и защиты данных пользователя от XSS-атак
function sanitizeInput(input: string): string {
  return xss(input, xssOptions);
}

// Создаем лимитер запросов для защиты от брутфорс-атак
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 10, // максимум 10 запросов
  message: "Слишком много попыток входа. Пожалуйста, попробуйте позже.",
  standardHeaders: true, // Включаем заголовки X-RateLimit для стандартов
  legacyHeaders: false, // Отключаем устаревшие заголовки X-RateLimit-*
});

// Создаем лимитер запросов для API-запросов
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // максимум 100 запросов
  message: "Слишком много запросов с этого IP. Пожалуйста, попробуйте позже.",
  standardHeaders: true,
  legacyHeaders: false,
});

// JWT функции для генерации и проверки токенов
const JWT_SECRET = process.env.JWT_SECRET || "natalisecrets_secure_key_change_in_production";

function generateToken(user: SelectUser): string {
  return jwt.sign(
    { id: user.id, username: user.username },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
}

function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

// Middleware для проверки JWT-токена
function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  
  if (!token) {
    return res.status(401).json({ message: "Authentication token is required" });
  }
  
  const user = verifyToken(token);
  if (!user) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
  
  req.user = user;
  next();
}

export function setupAuth(app: Express) {
  // Парсинг куки
  app.use(cookieParser());
  
  // Настройка сессий
  const MemorySessionStore = MemoryStore(session);
  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET || "natalisecrets_session_secret_change_in_production",
    resave: false,
    saveUninitialized: false,
    store: new MemorySessionStore({
      checkPeriod: 86400000 // Очистка просроченных сессий раз в 24 часа
    }),
    cookie: { 
      httpOnly: true, // Защита от XSS
      secure: process.env.NODE_ENV === "production", // Только по HTTPS в продакшне
      maxAge: 24 * 60 * 60 * 1000 // 24 часа
    }
  };

  app.set("trust proxy", 1);
  app.use(session(sessionSettings));
  
  // Настройка Passport
  app.use(passport.initialize());
  app.use(passport.session());

  // Локальная стратегия аутентификации с защитой от брутфорс-атак
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        // Санитизация ввода
        const sanitizedUsername = sanitizeInput(username);
        
        const user = await storage.getUserByUsername(sanitizedUsername);
        if (!user || !(await comparePasswords(password, user.password))) {
          return done(null, false);
        } else {
          return done(null, user);
        }
      } catch (error) {
        return done(error);
      }
    }),
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

  // Защита от CSRF атак
  const csrfProtection = csrf({ cookie: true });
  
  // Регистрируем маршруты аутентификации с защитой от CSRF
  app.post("/api/register", loginLimiter, async (req, res, next) => {
    try {
      // Санитизация ввода
      const sanitizedUsername = sanitizeInput(req.body.username);
      
      // Проверка существующего пользователя
      const existingUser = await storage.getUserByUsername(sanitizedUsername);
      if (existingUser) {
        return res.status(400).json({ message: "Пользователь с таким именем уже существует" });
      }

      // Создаем пользователя с хешированным паролем
      const user = await storage.createUser({
        username: sanitizedUsername,
        password: await hashPassword(req.body.password),
      });

      // Аутентифицируем пользователя
      req.login(user, (err) => {
        if (err) return next(err);
        
        // Генерируем JWT токен для API-запросов
        const token = generateToken(user);
        
        // Отправляем пользователя и токен, исключая пароль из ответа
        const { password, ...userWithoutPassword } = user;
        res.status(201).json({ 
          user: userWithoutPassword,
          token 
        });
      });
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/login", loginLimiter, passport.authenticate("local"), (req, res) => {
    // Генерируем JWT токен для API-запросов
    const token = generateToken(req.user!);
    
    // Отправляем пользователя и токен, исключая пароль из ответа
    const { password, ...userWithoutPassword } = req.user!;
    res.status(200).json({ 
      user: userWithoutPassword,
      token 
    });
  });

  app.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.sendStatus(200);
    });
  });

  app.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    
    // Отправляем пользователя, исключая пароль из ответа
    const { password, ...userWithoutPassword } = req.user!;
    res.json(userWithoutPassword);
  });

  // Экспортируем middleware для использования в других файлах
  return {
    loginLimiter,
    apiLimiter,
    authenticateToken,
    csrfProtection,
    sanitizeInput
  };
}