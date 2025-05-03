import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import helmet from "helmet";
import { z } from "zod";
import xss from "xss";

export async function registerRoutes(app: Express): Promise<Server> {
  // Настройка базовой защиты
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"], // Разрешаем inline скрипты для работы клиентского приложения
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "blob:"],
        connectSrc: ["'self'", "https://api.example.com"], // Разрешаем подключение к API (при необходимости)
      }
    },
    xssFilter: true,
    noSniff: true,
    hidePoweredBy: true,
    frameguard: { action: "deny" },
    referrerPolicy: { policy: "same-origin" }
  }));

  // Настройка авторизации и аутентификации
  const { apiLimiter, authenticateToken, sanitizeInput, csrfProtection } = setupAuth(app);

  // Общая обработка ошибок для API запросов
  const apiErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(`API Error: ${err.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  };

  // Middleware для валидации ID параметра
  const validateIdParam = (req: Request, res: Response, next: NextFunction) => {
    const idSchema = z.number().int().positive();
    
    try {
      const id = parseInt(req.params.id);
      idSchema.parse(id);
      next();
    } catch (error) {
      res.status(400).json({ message: "Invalid ID parameter" });
    }
  };

  // Middleware для валидации категории
  const validateCategoryParam = (req: Request, res: Response, next: NextFunction) => {
    const categorySchema = z.enum(["cosmetology", "massage", "bodyCorrection", "men"]);
    
    try {
      categorySchema.parse(req.params.category);
      next();
    } catch (error) {
      res.status(400).json({ message: "Invalid category parameter" });
    }
  };

  // Применяем ограничение запросов ко всем API маршрутам
  app.use('/api', apiLimiter);

  // Группа маршрутов для публичного API
  // ======================================

  // Получить все услуги
  app.get('/api/services', async (req, res, next) => {
    try {
      const services = await storage.getAllServices();
      
      // Удаляем чувствительные поля если они будут добавлены в будущем
      const safeServices = services.map(service => ({
        ...service,
        // Здесь можно добавить преобразование или удаление полей
      }));
      
      res.json(safeServices);
    } catch (error) {
      next(error);
    }
  });

  // Получить услугу по ID
  app.get('/api/services/:id', validateIdParam, async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const service = await storage.getServiceById(id);
      
      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }
      
      res.json(service);
    } catch (error) {
      next(error);
    }
  });

  // Получить услуги по категории
  app.get('/api/services/category/:category', validateCategoryParam, async (req, res, next) => {
    try {
      // Санитизация ввода для предотвращения XSS
      const sanitizedCategory = sanitizeInput(req.params.category);
      const services = await storage.getServicesByCategory(sanitizedCategory);
      
      res.json(services);
    } catch (error) {
      next(error);
    }
  });

  // Получить все программы
  app.get('/api/programs', async (req, res, next) => {
    try {
      const programs = await storage.getAllPrograms();
      res.json(programs);
    } catch (error) {
      next(error);
    }
  });

  // Получить программу по ID
  app.get('/api/programs/:id', validateIdParam, async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const program = await storage.getProgramById(id);
      
      if (!program) {
        return res.status(404).json({ message: 'Program not found' });
      }
      
      res.json(program);
    } catch (error) {
      next(error);
    }
  });

  // Получить все акции
  app.get('/api/promotions', async (req, res, next) => {
    try {
      const promotions = await storage.getAllPromotions();
      res.json(promotions);
    } catch (error) {
      next(error);
    }
  });

  // Защищенные маршруты с CSRF и JWT защитой 
  // ======================================
  
  // Пример маршрута с защитой CSRF для web-приложения через куки
  app.post('/api/contact', csrfProtection, async (req, res, next) => {
    try {
      // Валидация и санитизация
      const name = sanitizeInput(req.body.name || '');
      const email = sanitizeInput(req.body.email || '');
      const message = sanitizeInput(req.body.message || '');
      
      if (!name || !email || !message) {
        return res.status(400).json({ message: 'All fields are required' });
      }
      
      // TODO: Обработка формы контакта, например, отправка email

      res.status(200).json({ message: 'Your message has been sent' });
    } catch (error) {
      next(error);
    }
  });
  
  // Пример защищенного маршрута, требующего JWT аутентификацию
  // Используется для API интеграций и мобильных приложений
  app.post('/api/protected/action', authenticateToken, async (req, res, next) => {
    try {
      // Пример защищенного действия
      res.json({ 
        message: 'Protected action successful',
        user: req.user
      });
    } catch (error) {
      next(error);
    }
  });
  
  // Регистрируем общий обработчик ошибок для API
  app.use('/api', apiErrorHandler);

  const httpServer = createServer(app);

  return httpServer;
}
