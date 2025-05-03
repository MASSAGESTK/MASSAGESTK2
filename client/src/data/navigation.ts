// Карта заголовков и описаний для разных маршрутов (для SEO)
export const routeSeoData = {
  "/": {
    title: "Natali Secrets - Профессиональный салон красоты и спа услуг",
    description: "Салон красоты Natali Secrets предлагает широкий спектр услуг: косметология, массаж, спа-процедуры, коррекция фигуры и индивидуальные программы ухода.",
    schemaType: "WebSite"
  },
  "/services": {
    title: "Услуги салона красоты Natali Secrets - косметология, массаж, спа",
    description: "Полный список услуг салона красоты Natali Secrets: косметология, массаж, спа-процедуры, коррекция фигуры. Профессиональный подход и современные технологии.",
    schemaType: "Service"
  },
  "/promotions": {
    title: "Акции и специальные предложения - Natali Secrets",
    description: "Выгодные акции и специальные предложения салона красоты Natali Secrets. Скидки на услуги, подарочные сертификаты и комплексные программы.",
    schemaType: "SpecialOffer"
  },
  "/memberships": {
    title: "Абонементы на услуги салона красоты - Natali Secrets",
    description: "Абонементы на услуги салона красоты Natali Secrets. Выгодные комплексные программы для поддержания красоты и здоровья.",
    schemaType: "Product"
  },
  "/about": {
    title: "О нас - Natali Secrets салон красоты и спа",
    description: "О салоне красоты Natali Secrets. Наша история, ценности и команда профессионалов. Современное оборудование и высококачественные материалы.",
    schemaType: "AboutPage"
  },
  "/auth": {
    title: "Вход в личный кабинет - Natali Secrets",
    description: "Авторизация в личном кабинете салона красоты Natali Secrets. Получите доступ к персональным предложениям, программам и эксклюзивным акциям.",
    schemaType: "WebPage"
  },
  "/settings": {
    title: "Личный кабинет - Natali Secrets",
    description: "Личный кабинет клиента салона красоты Natali Secrets. Управление профилем, история услуг и персональные рекомендации.",
    schemaType: "ProfilePage"
  }
};

// Структура меню для нижней навигации
export const navigationItems = [
  { id: "home", label: "Главная", path: "/", icon: "home" },
  { id: "services", label: "Услуги", path: "/services", icon: "spa" },
  { id: "promotions", label: "Акции", path: "/promotions", icon: "local_offer" },
  { id: "about", label: "О нас", path: "/about", icon: "info" },
  { id: "settings", label: "Настройки", path: "/settings", icon: "settings" }
];

// Комплексные услуги для главной страницы
export const complexServices = [
  { id: 1, title: "Уход за кожей", icon: "spa", category: "cosmetology" },
  { id: 2, title: "Мужской уход", icon: "face", category: "men" },
  {
    id: 3,
    title: "SPA-программы",
    icon: "self_improvement",
    category: "massage",
  },
  {
    id: 4,
    title: "Коррекция фигуры",
    icon: "auto_awesome",
    category: "bodyCorrection",
  },
  {
    id: 5,
    title: "Комплексные программы",
    icon: "dashboard",
    category: "complex",
  },
  {
    id: 6,
    title: "Абонементы",
    icon: "card_membership",
    category: "memberships",
  },
];