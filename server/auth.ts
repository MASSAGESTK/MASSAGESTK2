import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express, Request, Response, NextFunction } from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import csurf from "csurf";
import xss from "xss";
import jwt from "jsonwebtoken";
import { storage } from "./storage";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { User as SelectUser } from "@shared/schema";

declare global {
  namespace Express {
    interface User extends SelectUser {}
    interface Request {
      user?: SelectUser; // Для совместимости с JWT типами
    }
  }
}

// Promisify scrypt для асинхронного хеширования
const scryptAsync = promisify(scrypt);

// Хеширование паролей
async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

// Сравнение паролей
async function comparePasswords(supplied: string, stored: string): Promise<boolean> {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

// Санитизация ввода для защиты от XSS
function sanitizeInput(input: string): string {
  return xss(input);
}

// Генерация JWT токена
function generateToken(user: SelectUser): string {
  return jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );
}

// Проверка JWT токена
function verifyToken(token: string): any {
  return jwt.verify(token, process.env.JWT_SECRET!);
}

// Middleware для JWT аутентификации
function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: "Требуется аутентификация" });
  }

  try {
    const user = verifyToken(token);
    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Недействительный или истекший токен" });
  }
}

// Настройка авторизации и аутентификации
export function setupAuth(app: Express) {
  // Парсинг кук для аутентификации
  app.use(cookieParser());

  // Ограничение запросов для защиты от брутфорс атак
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 минут
    max: 100, // Лимит 100 запросов за 15 минут
    standardHeaders: true,
    legacyHeaders: false,
  });

  // Защита от CSRF атак
  const csrfProtection = csurf({ 
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    } 
  });

  // Настройка сессий для аутентификации через форму
  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    store: storage.sessionStore,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 дней
      sameSite: 'lax'
    }
  };

  // Устанавливаем доверие к прокси для работы с HTTPS за обратным прокси
  app.set("trust proxy", 1);
  
  // Инициализация сессий и паспорта
  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  // Установка стратегии локальной аутентификации
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        // Получаем пользователя по имени
        const user = await storage.getUserByUsername(username);
        
        // Проверяем существование пользователя и соответствие пароля
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

  // Сериализация/десериализация пользователя для сессий
  passport.serializeUser((user, done) => done(null, user.id));
  
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

  // Маршрут регистрации (можно регистрироваться через форму или через API)
  app.post("/api/register", async (req, res, next) => {
    try {
      // Проверяем существование пользователя
      const existingUser = await storage.getUserByUsername(req.body.username);
      
      if (existingUser) {
        return res.status(400).json({ message: "Пользователь с таким именем уже существует" });
      }

      // Создаем нового пользователя с хешированным паролем
      const user = await storage.createUser({
        ...req.body,
        password: await hashPassword(req.body.password),
      });

      // Генерируем JWT токен
      const token = generateToken(user);

      // Если это запрос API, возвращаем токен
      if (req.headers["accept"] === "application/json") {
        return res.status(201).json({ user, token });
      }

      // Иначе авторизуем через сессию и перенаправляем
      req.login(user, (err) => {
        if (err) return next(err);
        return res.status(201).json({ user });
      });
    } catch (error) {
      next(error);
    }
  });

  // Маршрут аутентификации (через форму или через API)
  app.post("/api/login", (req, res, next) => {
    passport.authenticate("local", (err: Error, user: SelectUser) => {
      if (err) return next(err);
      if (!user) return res.status(401).json({ message: "Неверное имя пользователя или пароль" });

      // Если это запрос API, генерируем JWT токен
      if (req.headers["accept"] === "application/json") {
        const token = generateToken(user);
        return res.status(200).json({ user, token });
      }

      // Иначе авторизуем через сессию
      req.login(user, (err) => {
        if (err) return next(err);
        return res.status(200).json({ user });
      });
    })(req, res, next);
  });

  // Маршрут выхода
  app.post("/api/logout", (req, res, next) => {
    // Для обеих аутентификаций (сессия и API) выполняем выход
    req.logout((err) => {
      if (err) return next(err);
      res.status(200).json({ message: "Выход выполнен успешно" });
    });
  });

  // Маршрут получения информации о текущем пользователе
  app.get("/api/user", (req, res) => {
    // Для сессионной аутентификации
    if (req.isAuthenticated()) {
      return res.json(req.user);
    }

    // Для JWT аутентификации
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token) {
      try {
        const user = verifyToken(token);
        return res.json(user);
      } catch (err) {
        return res.status(401).json({ message: "Недействительный или истекший токен" });
      }
    }

    return res.status(401).json({ message: "Не авторизован" });
  });

  // Возвращаем инструменты для использования в других маршрутах
  return { 
    apiLimiter, 
    authenticateToken, 
    sanitizeInput, 
    csrfProtection 
  };
}