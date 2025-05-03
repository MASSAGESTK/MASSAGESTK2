import { 
  Service, 
  InsertService, 
  Program, 
  InsertProgram, 
  Promotion, 
  InsertPromotion, 
  ServiceEffect, 
  InsertServiceEffect,
  User,
  InsertUser
} from "@shared/schema";
import { imageUrls } from "../client/src/lib/utils";
import session from "express-session";
import createMemoryStore from "memorystore";

// Создаем memorystore для сессий
const MemoryStore = createMemoryStore(session);

// Интерфейс для методов хранилища
export interface IStorage {
  // Хранилище сессий
  sessionStore: session.Store;
  // Пользователи (сохранено из базового шаблона)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Услуги
  getAllServices(): Promise<Service[]>;
  getServiceById(id: number): Promise<Service | undefined>;
  getServicesByCategory(category: string): Promise<Service[]>;
  getPopularServices(): Promise<Service[]>;
  createService(service: InsertService): Promise<Service>;
  
  // Программы
  getAllPrograms(): Promise<Program[]>;
  getProgramById(id: number): Promise<Program | undefined>;
  createProgram(program: InsertProgram): Promise<Program>;
  
  // Акции
  getAllPromotions(): Promise<Promotion[]>;
  getPromotionById(id: number): Promise<Promotion | undefined>;
  createPromotion(promotion: InsertPromotion): Promise<Promotion>;
  
  // Эффекты услуг
  getServiceEffects(serviceId: number): Promise<ServiceEffect[]>;
  createServiceEffect(effect: InsertServiceEffect): Promise<ServiceEffect>;
}

// Реализация хранилища в памяти
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private services: Map<number, Service>;
  private programs: Map<number, Program>;
  private promotions: Map<number, Promotion>;
  private serviceEffects: Map<number, ServiceEffect[]>;
  
  private currentUserId: number;
  private currentServiceId: number;
  private currentProgramId: number;
  private currentPromotionId: number;
  private currentServiceEffectId: number;
  
  // Добавляем хранилище сессий
  public sessionStore: session.Store;

  constructor() {
    this.users = new Map();
    this.services = new Map();
    this.programs = new Map();
    this.promotions = new Map();
    this.serviceEffects = new Map();
    
    this.currentUserId = 1;
    this.currentServiceId = 1;
    this.currentProgramId = 1;
    this.currentPromotionId = 1;
    this.currentServiceEffectId = 1;
    
    // Инициализируем хранилище сессий
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000 // Очистка просроченных сессий раз в 24 часа
    });

    // Инициализация данными-примерами
    this.initializeData();
  }

  private initializeData() {
    // Примеры услуг
    const services: InsertService[] = [
      {
        name: "Комбинированная чистка лица",
        price: "2700₽",
        description: "Комбинированная чистка лица - это процедура глубокого очищения кожи, которая сочетает в себе механическое удаление загрязнений и использование специальных средств для более эффективного результата.",
        duration: "60 минут",
        category: "cosmetology",
        image: imageUrls.beautyServices[0],
        isPopular: true,
      },
      {
        name: "Пилинг омолаживающий",
        price: "2500₽",
        description: "Омолаживающий пилинг помогает отшелушить верхний слой клеток кожи, стимулируя обновление и регенерацию тканей для более молодого и свежего вида.",
        duration: "45 минут",
        category: "cosmetology",
        image: imageUrls.beautyServices[1],
        isPopular: false,
      },
      {
        name: "Антицеллюлитный массаж",
        price: "1200₽",
        description: "Интенсивный массаж, направленный на разбивание жировых отложений и улучшение кровообращения в проблемных зонах.",
        duration: "45 минут",
        category: "massage",
        image: imageUrls.massageTherapy[1],
        isPopular: true,
      },
      {
        name: "Спа массаж",
        price: "2000₽",
        description: "Расслабляющий массаж с использованием ароматических масел для полного расслабления тела и разума.",
        duration: "60 минут",
        category: "massage",
        image: imageUrls.spaServices[1],
        isPopular: true,
      },
    ];

    services.forEach(service => this.createService(service));

    // Примеры эффектов от услуг
    const serviceEffects: InsertServiceEffect[] = [
      { serviceId: 1, effect: "Глубокое очищение пор" },
      { serviceId: 1, effect: "Удаление комедонов и загрязнений" },
      { serviceId: 1, effect: "Выравнивание текстуры кожи" },
      { serviceId: 1, effect: "Улучшение цвета лица" },
      { serviceId: 2, effect: "Омоложение кожи" },
      { serviceId: 2, effect: "Уменьшение морщин" },
      { serviceId: 3, effect: "Уменьшение целлюлита" },
      { serviceId: 3, effect: "Улучшение кровообращения" },
      { serviceId: 4, effect: "Снятие стресса" },
      { serviceId: 4, effect: "Глубокое расслабление" },
    ];

    serviceEffects.forEach(effect => this.createServiceEffect(effect));

    // Примеры программ
    const programs: InsertProgram[] = [
      {
        title: "Коррекция фигуры: 5 сеансов",
        price: "17000₽",
        description: "Комплексная программа коррекции фигуры, включающая различные процедуры для достижения наилучшего результата.",
        features: ["прессотерапия", "вибро-прессо-роликовый массаж", "массаж антицеллюлитный"]
      },
      {
        title: "Программа похудения: 10 сеансов",
        price: "35000₽",
        description: "Интенсивный курс для похудения и улучшения контуров тела, сочетающий аппаратные и ручные методики.",
        features: ["прессотерапия", "вибро-прессо-роликовый массаж", "массаж антицеллюлитный"]
      }
    ];

    programs.forEach(program => this.createProgram(program));

    // Примеры акций
    const promotions: InsertPromotion[] = [
      {
        title: "Скидка 20% на первое посещение",
        description: "Получите скидку 20% на любую услугу при первом посещении нашего салона. Предложение действует для новых клиентов.",
        image: imageUrls.beautyServices[0],
        badge: "До 31.12.2023",
        buttonText: "Получить скидку",
        expiryDate: new Date("2023-12-31")
      },
      {
        title: "Абонемент на массаж спины",
        description: "10 сеансов классического массажа спины по специальной цене. Срок действия абонемента - 3 месяца.",
        image: imageUrls.massageTherapy[0],
        badge: "Выгода 10%",
        price: "8200₽",
        buttonText: "Приобрести",
        expiryDate: null
      }
    ];

    promotions.forEach(promotion => this.createPromotion(promotion));
  }

  // Методы пользователя (сохранены из базового шаблона)
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Методы для работы с услугами
  async getAllServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }

  async getServiceById(id: number): Promise<Service | undefined> {
    return this.services.get(id);
  }

  async getServicesByCategory(category: string): Promise<Service[]> {
    return Array.from(this.services.values()).filter(
      (service) => service.category === category
    );
  }

  async getPopularServices(): Promise<Service[]> {
    return Array.from(this.services.values()).filter(
      (service) => service.isPopular
    );
  }

  async createService(insertService: InsertService): Promise<Service> {
    const id = this.currentServiceId++;
    
    // Устанавливаем isPopular значение по умолчанию, чтобы избежать undefined
    const service: Service = { 
      ...insertService, 
      id,
      isPopular: insertService.isPopular ?? false, // Используем null coalescing для установки значения по умолчанию
    };
    
    this.services.set(id, service);
    return service;
  }

  // Методы для работы с программами
  async getAllPrograms(): Promise<Program[]> {
    return Array.from(this.programs.values());
  }

  async getProgramById(id: number): Promise<Program | undefined> {
    return this.programs.get(id);
  }

  async createProgram(insertProgram: InsertProgram): Promise<Program> {
    const id = this.currentProgramId++;
    const program: Program = { ...insertProgram, id };
    this.programs.set(id, program);
    return program;
  }

  // Методы для работы с акциями
  async getAllPromotions(): Promise<Promotion[]> {
    return Array.from(this.promotions.values());
  }

  async getPromotionById(id: number): Promise<Promotion | undefined> {
    return this.promotions.get(id);
  }

  async createPromotion(insertPromotion: InsertPromotion): Promise<Promotion> {
    const id = this.currentPromotionId++;
    
    // Обеспечиваем корректные типы для полей, не допуская undefined
    const promotion: Promotion = { 
      ...insertPromotion, 
      id,
      price: insertPromotion.price ?? null,
      badge: insertPromotion.badge ?? null,
      expiryDate: insertPromotion.expiryDate ?? null
    };
    
    this.promotions.set(id, promotion);
    return promotion;
  }

  // Методы для работы с эффектами услуг
  async getServiceEffects(serviceId: number): Promise<ServiceEffect[]> {
    return this.serviceEffects.get(serviceId) || [];
  }

  async createServiceEffect(insertEffect: InsertServiceEffect): Promise<ServiceEffect> {
    const id = this.currentServiceEffectId++;
    const effect: ServiceEffect = { ...insertEffect, id };
    
    const existingEffects = this.serviceEffects.get(effect.serviceId) || [];
    existingEffects.push(effect);
    this.serviceEffects.set(effect.serviceId, existingEffects);
    
    return effect;
  }
}

export const storage = new MemStorage();
