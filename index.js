// server/index.ts
import express2 from "express";
import path3 from "path";

// server/routes.ts
import { createServer } from "http";

// client/src/lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
var imageUrls = {
  // Услуги красоты - косметология
  beautyServices: [
    "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  ],
  // SPA-услуги - общие процедуры для релаксации
  spaServices: [
    "https://img.freepik.com/free-photo/close-up-woman-being-massaged_23-2148815335.jpg?",
    "https://img.freepik.com/free-photo/young-attractive-woman-having-massage-relaxing-spa-salon_176420-7572.jpg?",
    "https://img.freepik.com/free-photo/young-woman-bright-multicolored-sweater-blue-holds-gift-certificate-smiles-enthusiastically_343596-7683.jpg?t=st=1746219444~exp=1746223044~hmac=280038ffa393249e7836b52ec1d8509dd826dca9b7f75e32d0c5ba1223392d26&w=826",
    "https://img.freepik.com/free-photo/young-woman-with-beautiful-body-measure-tape_1150-14452.jpg?",
    "https://img.freepik.com/free-photo/closeup-pressotherapy-treatment-spa-center_637285-9469.jpg?",
    "https://img.freepik.com/free-photo/high-angle-man-getting-massage_23-2150649807.jpg?"
  ],
  // Интерьер салона
  salonInterior: [
    "https://img.freepik.com/free-photo/armchair-couch_1203-772.jpg?",
    "https://img.freepik.com/free-photo/front-view-womans-hand-with-flowers-valentines-day_23-2149164940.jpg?"
  ],
  // Массажные процедуры
  massageTherapy: [
    "https://img.freepik.com/free-photo/young-attractive-woman-having-massage-relaxing-spa-salon_176420-7572.jpg?",
    "https://img.freepik.com/free-photo/relaxing-spa-concept-with-woman_23-2147816920.jpg?",
    "https://img.freepik.com/free-photo/woman-getting-back-massage-from-female-masseur_23-2150461420.jpg?",
    "https://img.freepik.com/free-photo/close-up-greeting-card_1098-2833.jpg?",
    "https://img.freepik.com/free-photo/young-attractive-woman-having-massage-relaxing-spa-salon_176420-7572.jpg?",
    "https://img.freepik.com/free-photo/front-view-woman-working-spa_23-2150911790.jpg?",
    "https://img.freepik.com/free-photo/physiotherapist-performing-therapeutic-massage-male-client_23-2149143841.jpg?"
  ],
  // Уход за телом - скрабы, обертывания, коррекция фигуры
  bodyTreatments: [
    "https://img.freepik.com/premium-photo/side-view-beautiful-woman-is-receiving-massaging-procedure-spa-salon-she-is-lying-with-pleasure-beautician-is-holding-special-equipment-her-back_2221-9113.jpg?"
  ],
  // Уход за лицом - чистки, маски, пилинги
  facialTreatments: [
    "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    "https://img.freepik.com/free-photo/close-up-smiley-woman-with-face-treatment_23-2149182155.jpg?",
    "https://img.freepik.com/free-photo/view-woman-getting-facial-yoga-massage-stay-young_23-2150520769.jpg?",
    "https://img.freepik.com/free-photo/photo-lovely-european-woman-has-blue-spa-salt-granules-face-wears-waterproof-headgear-points-with-index-finger-upwards_273609-30751.jpg?",
    "https://img.freepik.com/free-photo/young-woman-getting-face-skin-treatment-spa_23-2148825383.jpg?"
  ],
  // Мужские процедуры
  menServices: [
    "https://img.freepik.com/free-photo/pleasure-face-massage_23-2147638155.jpg?",
    "https://img.freepik.com/free-photo/relaxed-man-having-thai-herbal-head-massage-wellness-center_637285-1715.jpg?"
  ],
  // Комплексные программы
  complexPrograms: [
    "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1591343395082-e120087004b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1596755094894-336dfe33c7c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  ],
  // Сертификаты и подарочные карты
  certificates: [
    "https://img.freepik.com/free-photo/front-view-young-male-holding-yellow-background_140725-103809.jpg?"
  ],
  // Anti-age процедуры
  antiAge: [
    "https://img.freepik.com/free-photo/front-view-hands-touching-woman-s-face_23-2149349930.jpg?",
    "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  ],
  // Массаж лица
  facialMassage: [
    "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  ]
};

// server/storage.ts
import session from "express-session";
import createMemoryStore from "memorystore";
var MemoryStore = createMemoryStore(session);
var MemStorage = class {
  users;
  services;
  programs;
  promotions;
  serviceEffects;
  currentUserId;
  currentServiceId;
  currentProgramId;
  currentPromotionId;
  currentServiceEffectId;
  // Добавляем хранилище сессий
  sessionStore;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.services = /* @__PURE__ */ new Map();
    this.programs = /* @__PURE__ */ new Map();
    this.promotions = /* @__PURE__ */ new Map();
    this.serviceEffects = /* @__PURE__ */ new Map();
    this.currentUserId = 1;
    this.currentServiceId = 1;
    this.currentProgramId = 1;
    this.currentPromotionId = 1;
    this.currentServiceEffectId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 864e5
      // Очистка просроченных сессий раз в 24 часа
    });
    this.initializeData();
  }
  initializeData() {
    const services = [
      {
        name: "\u041A\u043E\u043C\u0431\u0438\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u0430\u044F \u0447\u0438\u0441\u0442\u043A\u0430 \u043B\u0438\u0446\u0430",
        price: "2700\u20BD",
        description: "\u041A\u043E\u043C\u0431\u0438\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u0430\u044F \u0447\u0438\u0441\u0442\u043A\u0430 \u043B\u0438\u0446\u0430 - \u044D\u0442\u043E \u043F\u0440\u043E\u0446\u0435\u0434\u0443\u0440\u0430 \u0433\u043B\u0443\u0431\u043E\u043A\u043E\u0433\u043E \u043E\u0447\u0438\u0449\u0435\u043D\u0438\u044F \u043A\u043E\u0436\u0438, \u043A\u043E\u0442\u043E\u0440\u0430\u044F \u0441\u043E\u0447\u0435\u0442\u0430\u0435\u0442 \u0432 \u0441\u0435\u0431\u0435 \u043C\u0435\u0445\u0430\u043D\u0438\u0447\u0435\u0441\u043A\u043E\u0435 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u0437\u0430\u0433\u0440\u044F\u0437\u043D\u0435\u043D\u0438\u0439 \u0438 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0445 \u0441\u0440\u0435\u0434\u0441\u0442\u0432 \u0434\u043B\u044F \u0431\u043E\u043B\u0435\u0435 \u044D\u0444\u0444\u0435\u043A\u0442\u0438\u0432\u043D\u043E\u0433\u043E \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0430.",
        duration: "60 \u043C\u0438\u043D\u0443\u0442",
        category: "cosmetology",
        image: imageUrls.beautyServices[0],
        isPopular: true
      },
      {
        name: "\u041F\u0438\u043B\u0438\u043D\u0433 \u043E\u043C\u043E\u043B\u0430\u0436\u0438\u0432\u0430\u044E\u0449\u0438\u0439",
        price: "2500\u20BD",
        description: "\u041E\u043C\u043E\u043B\u0430\u0436\u0438\u0432\u0430\u044E\u0449\u0438\u0439 \u043F\u0438\u043B\u0438\u043D\u0433 \u043F\u043E\u043C\u043E\u0433\u0430\u0435\u0442 \u043E\u0442\u0448\u0435\u043B\u0443\u0448\u0438\u0442\u044C \u0432\u0435\u0440\u0445\u043D\u0438\u0439 \u0441\u043B\u043E\u0439 \u043A\u043B\u0435\u0442\u043E\u043A \u043A\u043E\u0436\u0438, \u0441\u0442\u0438\u043C\u0443\u043B\u0438\u0440\u0443\u044F \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u0438 \u0440\u0435\u0433\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u044E \u0442\u043A\u0430\u043D\u0435\u0439 \u0434\u043B\u044F \u0431\u043E\u043B\u0435\u0435 \u043C\u043E\u043B\u043E\u0434\u043E\u0433\u043E \u0438 \u0441\u0432\u0435\u0436\u0435\u0433\u043E \u0432\u0438\u0434\u0430.",
        duration: "45 \u043C\u0438\u043D\u0443\u0442",
        category: "cosmetology",
        image: imageUrls.beautyServices[1],
        isPopular: false
      },
      {
        name: "\u0410\u043D\u0442\u0438\u0446\u0435\u043B\u043B\u044E\u043B\u0438\u0442\u043D\u044B\u0439 \u043C\u0430\u0441\u0441\u0430\u0436",
        price: "1200\u20BD",
        description: "\u0418\u043D\u0442\u0435\u043D\u0441\u0438\u0432\u043D\u044B\u0439 \u043C\u0430\u0441\u0441\u0430\u0436, \u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043D\u044B\u0439 \u043D\u0430 \u0440\u0430\u0437\u0431\u0438\u0432\u0430\u043D\u0438\u0435 \u0436\u0438\u0440\u043E\u0432\u044B\u0445 \u043E\u0442\u043B\u043E\u0436\u0435\u043D\u0438\u0439 \u0438 \u0443\u043B\u0443\u0447\u0448\u0435\u043D\u0438\u0435 \u043A\u0440\u043E\u0432\u043E\u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u044F \u0432 \u043F\u0440\u043E\u0431\u043B\u0435\u043C\u043D\u044B\u0445 \u0437\u043E\u043D\u0430\u0445.",
        duration: "45 \u043C\u0438\u043D\u0443\u0442",
        category: "massage",
        image: imageUrls.massageTherapy[1],
        isPopular: true
      },
      {
        name: "\u0421\u043F\u0430 \u043C\u0430\u0441\u0441\u0430\u0436",
        price: "2000\u20BD",
        description: "\u0420\u0430\u0441\u0441\u043B\u0430\u0431\u043B\u044F\u044E\u0449\u0438\u0439 \u043C\u0430\u0441\u0441\u0430\u0436 \u0441 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435\u043C \u0430\u0440\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0445 \u043C\u0430\u0441\u0435\u043B \u0434\u043B\u044F \u043F\u043E\u043B\u043D\u043E\u0433\u043E \u0440\u0430\u0441\u0441\u043B\u0430\u0431\u043B\u0435\u043D\u0438\u044F \u0442\u0435\u043B\u0430 \u0438 \u0440\u0430\u0437\u0443\u043C\u0430.",
        duration: "60 \u043C\u0438\u043D\u0443\u0442",
        category: "massage",
        image: imageUrls.spaServices[1],
        isPopular: true
      }
    ];
    services.forEach((service) => this.createService(service));
    const serviceEffects = [
      { serviceId: 1, effect: "\u0413\u043B\u0443\u0431\u043E\u043A\u043E\u0435 \u043E\u0447\u0438\u0449\u0435\u043D\u0438\u0435 \u043F\u043E\u0440" },
      { serviceId: 1, effect: "\u0423\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u043A\u043E\u043C\u0435\u0434\u043E\u043D\u043E\u0432 \u0438 \u0437\u0430\u0433\u0440\u044F\u0437\u043D\u0435\u043D\u0438\u0439" },
      { serviceId: 1, effect: "\u0412\u044B\u0440\u0430\u0432\u043D\u0438\u0432\u0430\u043D\u0438\u0435 \u0442\u0435\u043A\u0441\u0442\u0443\u0440\u044B \u043A\u043E\u0436\u0438" },
      { serviceId: 1, effect: "\u0423\u043B\u0443\u0447\u0448\u0435\u043D\u0438\u0435 \u0446\u0432\u0435\u0442\u0430 \u043B\u0438\u0446\u0430" },
      { serviceId: 2, effect: "\u041E\u043C\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u043A\u043E\u0436\u0438" },
      { serviceId: 2, effect: "\u0423\u043C\u0435\u043D\u044C\u0448\u0435\u043D\u0438\u0435 \u043C\u043E\u0440\u0449\u0438\u043D" },
      { serviceId: 3, effect: "\u0423\u043C\u0435\u043D\u044C\u0448\u0435\u043D\u0438\u0435 \u0446\u0435\u043B\u043B\u044E\u043B\u0438\u0442\u0430" },
      { serviceId: 3, effect: "\u0423\u043B\u0443\u0447\u0448\u0435\u043D\u0438\u0435 \u043A\u0440\u043E\u0432\u043E\u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u044F" },
      { serviceId: 4, effect: "\u0421\u043D\u044F\u0442\u0438\u0435 \u0441\u0442\u0440\u0435\u0441\u0441\u0430" },
      { serviceId: 4, effect: "\u0413\u043B\u0443\u0431\u043E\u043A\u043E\u0435 \u0440\u0430\u0441\u0441\u043B\u0430\u0431\u043B\u0435\u043D\u0438\u0435" }
    ];
    serviceEffects.forEach((effect) => this.createServiceEffect(effect));
    const programs = [
      {
        title: "\u041A\u043E\u0440\u0440\u0435\u043A\u0446\u0438\u044F \u0444\u0438\u0433\u0443\u0440\u044B: 5 \u0441\u0435\u0430\u043D\u0441\u043E\u0432",
        price: "17000\u20BD",
        description: "\u041A\u043E\u043C\u043F\u043B\u0435\u043A\u0441\u043D\u0430\u044F \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0430 \u043A\u043E\u0440\u0440\u0435\u043A\u0446\u0438\u0438 \u0444\u0438\u0433\u0443\u0440\u044B, \u0432\u043A\u043B\u044E\u0447\u0430\u044E\u0449\u0430\u044F \u0440\u0430\u0437\u043B\u0438\u0447\u043D\u044B\u0435 \u043F\u0440\u043E\u0446\u0435\u0434\u0443\u0440\u044B \u0434\u043B\u044F \u0434\u043E\u0441\u0442\u0438\u0436\u0435\u043D\u0438\u044F \u043D\u0430\u0438\u043B\u0443\u0447\u0448\u0435\u0433\u043E \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0430.",
        features: ["\u043F\u0440\u0435\u0441\u0441\u043E\u0442\u0435\u0440\u0430\u043F\u0438\u044F", "\u0432\u0438\u0431\u0440\u043E-\u043F\u0440\u0435\u0441\u0441\u043E-\u0440\u043E\u043B\u0438\u043A\u043E\u0432\u044B\u0439 \u043C\u0430\u0441\u0441\u0430\u0436", "\u043C\u0430\u0441\u0441\u0430\u0436 \u0430\u043D\u0442\u0438\u0446\u0435\u043B\u043B\u044E\u043B\u0438\u0442\u043D\u044B\u0439"]
      },
      {
        title: "\u041F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0430 \u043F\u043E\u0445\u0443\u0434\u0435\u043D\u0438\u044F: 10 \u0441\u0435\u0430\u043D\u0441\u043E\u0432",
        price: "35000\u20BD",
        description: "\u0418\u043D\u0442\u0435\u043D\u0441\u0438\u0432\u043D\u044B\u0439 \u043A\u0443\u0440\u0441 \u0434\u043B\u044F \u043F\u043E\u0445\u0443\u0434\u0435\u043D\u0438\u044F \u0438 \u0443\u043B\u0443\u0447\u0448\u0435\u043D\u0438\u044F \u043A\u043E\u043D\u0442\u0443\u0440\u043E\u0432 \u0442\u0435\u043B\u0430, \u0441\u043E\u0447\u0435\u0442\u0430\u044E\u0449\u0438\u0439 \u0430\u043F\u043F\u0430\u0440\u0430\u0442\u043D\u044B\u0435 \u0438 \u0440\u0443\u0447\u043D\u044B\u0435 \u043C\u0435\u0442\u043E\u0434\u0438\u043A\u0438.",
        features: ["\u043F\u0440\u0435\u0441\u0441\u043E\u0442\u0435\u0440\u0430\u043F\u0438\u044F", "\u0432\u0438\u0431\u0440\u043E-\u043F\u0440\u0435\u0441\u0441\u043E-\u0440\u043E\u043B\u0438\u043A\u043E\u0432\u044B\u0439 \u043C\u0430\u0441\u0441\u0430\u0436", "\u043C\u0430\u0441\u0441\u0430\u0436 \u0430\u043D\u0442\u0438\u0446\u0435\u043B\u043B\u044E\u043B\u0438\u0442\u043D\u044B\u0439"]
      }
    ];
    programs.forEach((program) => this.createProgram(program));
    const promotions = [
      {
        title: "\u0421\u043A\u0438\u0434\u043A\u0430 20% \u043D\u0430 \u043F\u0435\u0440\u0432\u043E\u0435 \u043F\u043E\u0441\u0435\u0449\u0435\u043D\u0438\u0435",
        description: "\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u0435 \u0441\u043A\u0438\u0434\u043A\u0443 20% \u043D\u0430 \u043B\u044E\u0431\u0443\u044E \u0443\u0441\u043B\u0443\u0433\u0443 \u043F\u0440\u0438 \u043F\u0435\u0440\u0432\u043E\u043C \u043F\u043E\u0441\u0435\u0449\u0435\u043D\u0438\u0438 \u043D\u0430\u0448\u0435\u0433\u043E \u0441\u0430\u043B\u043E\u043D\u0430. \u041F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0443\u0435\u0442 \u0434\u043B\u044F \u043D\u043E\u0432\u044B\u0445 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432.",
        image: imageUrls.beautyServices[0],
        badge: "\u0414\u043E 31.12.2023",
        buttonText: "\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0441\u043A\u0438\u0434\u043A\u0443",
        expiryDate: /* @__PURE__ */ new Date("2023-12-31")
      },
      {
        title: "\u0410\u0431\u043E\u043D\u0435\u043C\u0435\u043D\u0442 \u043D\u0430 \u043C\u0430\u0441\u0441\u0430\u0436 \u0441\u043F\u0438\u043D\u044B",
        description: "10 \u0441\u0435\u0430\u043D\u0441\u043E\u0432 \u043A\u043B\u0430\u0441\u0441\u0438\u0447\u0435\u0441\u043A\u043E\u0433\u043E \u043C\u0430\u0441\u0441\u0430\u0436\u0430 \u0441\u043F\u0438\u043D\u044B \u043F\u043E \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0439 \u0446\u0435\u043D\u0435. \u0421\u0440\u043E\u043A \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F \u0430\u0431\u043E\u043D\u0435\u043C\u0435\u043D\u0442\u0430 - 3 \u043C\u0435\u0441\u044F\u0446\u0430.",
        image: imageUrls.massageTherapy[0],
        badge: "\u0412\u044B\u0433\u043E\u0434\u0430 10%",
        price: "8200\u20BD",
        buttonText: "\u041F\u0440\u0438\u043E\u0431\u0440\u0435\u0441\u0442\u0438",
        expiryDate: null
      }
    ];
    promotions.forEach((promotion) => this.createPromotion(promotion));
  }
  // Методы пользователя (сохранены из базового шаблона)
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.currentUserId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  // Методы для работы с услугами
  async getAllServices() {
    return Array.from(this.services.values());
  }
  async getServiceById(id) {
    return this.services.get(id);
  }
  async getServicesByCategory(category) {
    return Array.from(this.services.values()).filter(
      (service) => service.category === category
    );
  }
  async getPopularServices() {
    return Array.from(this.services.values()).filter(
      (service) => service.isPopular
    );
  }
  async createService(insertService) {
    const id = this.currentServiceId++;
    const service = {
      ...insertService,
      id,
      isPopular: insertService.isPopular ?? false
      // Используем null coalescing для установки значения по умолчанию
    };
    this.services.set(id, service);
    return service;
  }
  // Методы для работы с программами
  async getAllPrograms() {
    return Array.from(this.programs.values());
  }
  async getProgramById(id) {
    return this.programs.get(id);
  }
  async createProgram(insertProgram) {
    const id = this.currentProgramId++;
    const program = { ...insertProgram, id };
    this.programs.set(id, program);
    return program;
  }
  // Методы для работы с акциями
  async getAllPromotions() {
    return Array.from(this.promotions.values());
  }
  async getPromotionById(id) {
    return this.promotions.get(id);
  }
  async createPromotion(insertPromotion) {
    const id = this.currentPromotionId++;
    const promotion = {
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
  async getServiceEffects(serviceId) {
    return this.serviceEffects.get(serviceId) || [];
  }
  async createServiceEffect(insertEffect) {
    const id = this.currentServiceEffectId++;
    const effect = { ...insertEffect, id };
    const existingEffects = this.serviceEffects.get(effect.serviceId) || [];
    existingEffects.push(effect);
    this.serviceEffects.set(effect.serviceId, existingEffects);
    return effect;
  }
};
var storage = new MemStorage();

// server/routes.ts
import helmet from "helmet";
import { z } from "zod";
import xss from "xss";
import rateLimit from "express-rate-limit";
async function registerRoutes(app2) {
  app2.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        // Разрешаем inline скрипты для работы клиентского приложения
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "blob:", "https://images.unsplash.com", "https://img.freepik.com", "https://*.unsplash.com", "https://*.freepik.com"],
        connectSrc: ["'self'", "https://api.example.com"]
        // Разрешаем подключение к API (при необходимости)
      }
    },
    xssFilter: true,
    noSniff: true,
    hidePoweredBy: true,
    frameguard: { action: "deny" },
    referrerPolicy: { policy: "same-origin" }
  }));
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1e3,
    // 15 минут
    max: 100,
    // 100 запросов за 15 минут
    standardHeaders: true,
    message: { message: "\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u043C\u043D\u043E\u0433\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u043E\u0432, \u043F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u043F\u043E\u0437\u0436\u0435" }
  });
  const sanitizeInput = (input) => {
    return xss(input);
  };
  const apiErrorHandler = (err, req, res, next) => {
    console.error(`API Error: ${err.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  };
  const validateIdParam = (req, res, next) => {
    const idSchema = z.number().int().positive();
    try {
      const id = parseInt(req.params.id);
      idSchema.parse(id);
      next();
    } catch (error) {
      res.status(400).json({ message: "Invalid ID parameter" });
    }
  };
  const validateCategoryParam = (req, res, next) => {
    const categorySchema = z.enum(["cosmetology", "massage", "bodyCorrection", "men"]);
    try {
      categorySchema.parse(req.params.category);
      next();
    } catch (error) {
      res.status(400).json({ message: "Invalid category parameter" });
    }
  };
  app2.use("/api", apiLimiter);
  app2.get("/api/services", async (req, res, next) => {
    try {
      const services = await storage.getAllServices();
      const safeServices = services.map((service) => ({
        ...service
        // Здесь можно добавить преобразование или удаление полей
      }));
      res.json(safeServices);
    } catch (error) {
      next(error);
    }
  });
  app2.get("/api/services/:id", validateIdParam, async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const service = await storage.getServiceById(id);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.json(service);
    } catch (error) {
      next(error);
    }
  });
  app2.get("/api/services/category/:category", validateCategoryParam, async (req, res, next) => {
    try {
      const sanitizedCategory = sanitizeInput(req.params.category);
      const services = await storage.getServicesByCategory(sanitizedCategory);
      res.json(services);
    } catch (error) {
      next(error);
    }
  });
  app2.get("/api/programs", async (req, res, next) => {
    try {
      const programs = await storage.getAllPrograms();
      res.json(programs);
    } catch (error) {
      next(error);
    }
  });
  app2.get("/api/programs/:id", validateIdParam, async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const program = await storage.getProgramById(id);
      if (!program) {
        return res.status(404).json({ message: "Program not found" });
      }
      res.json(program);
    } catch (error) {
      next(error);
    }
  });
  app2.get("/api/promotions", async (req, res, next) => {
    try {
      const promotions = await storage.getAllPromotions();
      res.json(promotions);
    } catch (error) {
      next(error);
    }
  });
  app2.post("/api/contact", async (req, res, next) => {
    try {
      const name = sanitizeInput(req.body.name || "");
      const email = sanitizeInput(req.body.email || "");
      const message = sanitizeInput(req.body.message || "");
      if (!name || !email || !message) {
        return res.status(400).json({ message: "All fields are required" });
      }
      res.status(200).json({ message: "Your message has been sent" });
    } catch (error) {
      next(error);
    }
  });
  app2.use("/api", apiErrorHandler);
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true
  },
  base: "./"
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
import { config } from "dotenv";
config();
process.env.SESSION_SECRET = process.env.SESSION_SECRET || "natalisecrets_session_secret_change_in_production";
process.env.JWT_SECRET = process.env.JWT_SECRET || "natalisecrets_jwt_secret_change_in_production";
var app = express2();
app.use(express2.json({ limit: "1mb" }));
app.use(express2.urlencoded({ extended: false, limit: "1mb" }));
app.use(express2.static(path3.join(import.meta.dirname, "../client/public")));
app.get("/manifest.json", (req, res) => {
  res.sendFile(path3.join(import.meta.dirname, "../client/public/manifest.json"));
});
app.get("/sw.js", (req, res) => {
  res.sendFile(path3.join(import.meta.dirname, "../client/public/sw.js"));
});
app.use((req, res, next) => {
  const start = Date.now();
  const path4 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path4.startsWith("/api")) {
      let logLine = `${req.method} ${path4} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
