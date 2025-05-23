import { imageUrls } from "@/lib/utils";
import { ServiceDetails } from "@/components/ServiceModal";

// Категории услуг
export const categories = [
  { id: "all", label: "Все" },
  { id: "complex", label: "Комплексные" },
  { id: "cosmetology", label: "Косметология" },
  { id: "massage", label: "Массаж" },
  { id: "bodyCorrection", label: "Коррекция фигуры" },
  { id: "men", label: "Для мужчин" },
];

// Услуги косметологии
export const cosmetologyServices = [
  { id: 1, name: "Комбинированная чистка лица", duration: "60 минут", price: "2700₽", category: "cosmetology", image: imageUrls.facialTreatments[0] },
  { id: 2, name: "Пилинг омолаживающий", duration: "45 минут", price: "2500₽", category: "cosmetology", image: imageUrls.facialTreatments[1] },
  { id: 3, name: "Уходовая процедура для проблемной кожи", duration: "60 минут", price: "2800₽", category: "cosmetology", image: imageUrls.facialTreatments[3] },
  { id: 4, name: "Уходовая процедура для чувствительной кожи", duration: "50 минут", price: "2600₽", category: "cosmetology", image: imageUrls.facialTreatments[4] },
  { id: 5, name: "Anti-age (омолаживающая, уходовая процедура)", duration: "75 минут", price: "3000₽", category: "cosmetology", image: imageUrls.antiAge[0] },
];

// Услуги массажа
export const massageServices = [
  { id: 6, name: "Антицеллюлитный массаж", duration: "45 минут", price: "1200₽", category: "massage", image: imageUrls.massageTherapy[1] },
  { id: 7, name: "Спа массаж", duration: "60 минут", price: "2000₽", category: "massage", image: imageUrls.spaServices[1] },
  { id: 8, name: "Скульптурно-буккальный массаж", duration: "45 минут", price: "1800₽", category: "massage", image: imageUrls.facialTreatments[2] },
  { id: 9, name: "Классический массаж спины", duration: "30 минут", price: "900₽", category: "massage", image: imageUrls.massageTherapy[2] },
  { id: 17, name: "Лимфодренажный массаж", duration: "40 минут", price: "1000₽", category: "massage", image: imageUrls.spaServices[0] },
];

// Услуги коррекции фигуры
export const bodyCorrectionServices = [
  { id: 10, name: "Прессотерапия", duration: "40 минут", price: "1200₽", category: "bodyCorrection", image: imageUrls.spaServices[4] },
  { id: 11, name: "Вибро-прессо-роликовый массаж", duration: "30 минут", price: "1600₽", category: "bodyCorrection", image: imageUrls.bodyTreatments[0] },
];

// Услуги для мужчин
export const menServices = [
  { id: 12, name: "Комбинированная чистка лица", duration: "60 минут", price: "3000₽", category: "men", image: imageUrls.menServices[0] },
  { id: 13, name: "Уходовая процедура для лица", duration: "50 минут", price: "2800₽", category: "men", image: imageUrls.menServices[1] },
  { id: 14, name: "Спортивный массаж", duration: "45 минут", price: "1300₽", category: "men", image: imageUrls.massageTherapy[5] },
  { id: 15, name: "Анистресс-массаж", duration: "60 минут", price: "2000₽", category: "men", image: imageUrls.spaServices[5] },
  { id: 16, name: "Массаж спины, шеи, рук", duration: "40 минут", price: "1000₽", category: "men", image: imageUrls.massageTherapy[6] },
];

// Все услуги
export const allServices = [
  ...cosmetologyServices,
  ...massageServices,
  ...bodyCorrectionServices,
  ...menServices,
];

// Популярные услуги для главной страницы
export const popularServices = [
  {
    id: 1,
    name: "Комбинированная чистка лица",
    price: "2700₽",
    image: imageUrls.beautyServices[0],
  },
  {
    id: 6,
    name: "Антицеллюлитный массаж",
    price: "1200₽",
    image: imageUrls.massageTherapy[1],
  },
  {
    id: 17,
    name: "Лимфодренажный массаж",
    price: "1000₽",
    image: imageUrls.spaServices[0],
  },
  {
    id: 7,
    name: "Расслабляющий спа массаж",
    price: "2000₽",
    image: imageUrls.spaServices[1],
  },
];

// Полные данные о всех услугах с эффектами
export const serviceDetailsMap: Record<number, ServiceDetails> = {
  1: {
    id: 1,
    name: "Комбинированная чистка лица",
    price: "2700₽",
    description: "Комбинированная чистка лица - это процедура глубокого очищения кожи, которая сочетает в себе механическое удаление загрязнений и использование специальных средств для более эффективного результата.",
    image: imageUrls.facialTreatments[0],
    duration: "60 минут",
    effects: [
      "Глубокое очищение пор",
      "Удаление комедонов и загрязнений",
      "Выравнивание текстуры кожи",
      "Улучшение цвета лица",
      "Подготовка кожи к дальнейшим процедурам"
    ]
  },
  2: {
    id: 2,
    name: "Пилинг омолаживающий",
    price: "2500₽",
    description: "Омолаживающий пилинг помогает отшелушить верхний слой клеток кожи, стимулируя обновление и регенерацию тканей для более молодого и свежего вида.",
    image: imageUrls.facialTreatments[1],
    duration: "45 минут",
    effects: [
      "Омоложение кожи",
      "Уменьшение морщин",
      "Выравнивание тона кожи",
      "Стимуляция выработки коллагена",
      "Улучшение текстуры кожи"
    ]
  },
  3: {
    id: 3,
    name: "Уходовая процедура для проблемной кожи",
    price: "2800₽",
    description: "Комплексный уход за проблемной кожей с использованием специализированных средств для нормализации работы сальных желез и уменьшения воспалений.",
    image: imageUrls.facialTreatments[3],
    duration: "60 минут",
    effects: [
      "Уменьшение воспалений",
      "Нормализация работы сальных желез",
      "Сужение пор",
      "Увлажнение кожи без жирного блеска",
      "Устранение покраснений"
    ]
  },
  4: {
    id: 4,
    name: "Уходовая процедура для чувствительной кожи",
    price: "2600₽",
    description: "Деликатная процедура для чувствительной кожи с использованием успокаивающих и увлажняющих компонентов, не вызывающих раздражения.",
    image: imageUrls.facialTreatments[4],
    duration: "50 минут",
    effects: [
      "Снятие раздражения",
      "Укрепление защитного барьера кожи",
      "Интенсивное увлажнение",
      "Уменьшение покраснений",
      "Повышение устойчивости кожи к внешним факторам"
    ]
  },
  5: {
    id: 5,
    name: "Anti-age (омолаживающая, уходовая процедура)",
    price: "3000₽",
    description: "Интенсивная омолаживающая процедура, направленная на борьбу с признаками старения кожи с использованием высококонцентрированных активных компонентов.",
    image: imageUrls.antiAge[0],
    duration: "75 минут",
    effects: [
      "Разглаживание морщин",
      "Повышение упругости кожи",
      "Улучшение овала лица",
      "Интенсивное питание и увлажнение",
      "Активация процессов регенерации"
    ]
  },
  6: {
    id: 6,
    name: "Антицеллюлитный массаж",
    price: "1200₽",
    description: "Интенсивный массаж, направленный на разбивание жировых отложений и улучшение кровообращения в проблемных зонах.",
    image: imageUrls.massageTherapy[1],
    duration: "45 минут",
    effects: [
      "Уменьшение целлюлита",
      "Улучшение кровообращения",
      "Повышение упругости кожи",
      "Выведение лишней жидкости",
      "Улучшение обмена веществ в тканях"
    ]
  },
  7: {
    id: 7,
    name: "Спа массаж",
    price: "2000₽",
    description: "Расслабляющий массаж с использованием ароматических масел для полного расслабления тела и разума.",
    image: imageUrls.spaServices[1],
    duration: "60 минут",
    effects: [
      "Снятие стресса",
      "Глубокое расслабление",
      "Улучшение сна",
      "Снятие мышечного напряжения",
      "Повышение общего тонуса организма"
    ]
  },
  8: {
    id: 8,
    name: "Скульптурно-буккальный массаж",
    price: "1800₽",
    description: "Специальная техника массажа лица, включающая как внешнее воздействие на кожу и мышцы, так и работу изнутри ротовой полости.",
    image: imageUrls.facialTreatments[2],
    duration: "45 минут",
    effects: [
      "Моделирование овала лица",
      "Разглаживание морщин",
      "Улучшение тонуса мышц лица",
      "Активация лимфодренажа",
      "Улучшение цвета лица"
    ]
  },
  9: {
    id: 9,
    name: "Классический массаж спины",
    price: "900₽",
    description: "Традиционный массаж, направленный на расслабление мышц спины, снятие напряжения и улучшение общего самочувствия.",
    image: imageUrls.massageTherapy[2],
    duration: "30 минут",
    effects: [
      "Снятие мышечного напряжения",
      "Улучшение кровообращения",
      "Снятие болевых ощущений",
      "Улучшение осанки",
      "Общее расслабление"
    ]
  },
  10: {
    id: 10,
    name: "Прессотерапия",
    price: "1200₽",
    description: "Аппаратная методика, основанная на сжатии тканей при помощи специального костюма, создающего давление в различных зонах.",
    image: imageUrls.spaServices[4],
    duration: "40 минут",
    effects: [
      "Выведение лишней жидкости",
      "Уменьшение отеков",
      "Улучшение лимфотока",
      "Коррекция фигуры",
      "Уменьшение эффекта 'апельсиновой корки'"
    ]
  },
  11: {
    id: 11,
    name: "Вибро-прессо-роликовый массаж",
    price: "1600₽",
    description: "Процедура, сочетающая в себе роликовый массаж и прессотерапию, а также вибрационное воздействие для более эффективной коррекции фигуры.",
    image: imageUrls.bodyTreatments[0],
    duration: "30 минут",
    effects: [
      "Разрушение жировых клеток",
      "Улучшение кровообращения",
      "Стимуляция обмена веществ",
      "Моделирование силуэта",
      "Повышение упругости кожи"
    ]
  },
  12: {
    id: 12,
    name: "Комбинированная чистка лица",
    price: "3000₽",
    description: "Процедура глубокого очищения кожи, адаптированная специально для мужчин, учитывающая особенности мужской кожи.",
    image: imageUrls.menServices[0],
    duration: "60 минут",
    effects: [
      "Глубокое очищение пор",
      "Удаление комедонов и загрязнений",
      "Снятие раздражения после бритья",
      "Выравнивание текстуры кожи",
      "Сужение пор"
    ]
  },
  13: {
    id: 13,
    name: "Уходовая процедура для лица",
    price: "2800₽",
    description: "Комплексный уход за мужской кожей с учетом ее особенностей: большей толщины, повышенной жирности и склонности к раздражениям.",
    image: imageUrls.menServices[1],
    duration: "50 минут",
    effects: [
      "Глубокое увлажнение",
      "Снятие раздражения",
      "Уменьшение воспалений",
      "Матирование кожи",
      "Повышение упругости"
    ]
  },
  14: {
    id: 14,
    name: "Спортивный массаж",
    price: "1300₽",
    description: "Интенсивный массаж для восстановления после физических нагрузок, снятия мышечного напряжения и подготовки тела к тренировкам.",
    image: imageUrls.massageTherapy[5],
    duration: "45 минут",
    effects: [
      "Снятие мышечной усталости",
      "Ускорение восстановления",
      "Профилактика травм",
      "Улучшение кровообращения",
      "Повышение эластичности мышц"
    ]
  },
  15: {
    id: 15,
    name: "Анистресс-массаж",
    price: "2000₽",
    description: "Специальная техника массажа, направленная на глубокое расслабление и снятие стресса, улучшение общего самочувствия.",
    image: imageUrls.spaServices[5],
    duration: "60 минут",
    effects: [
      "Снятие психоэмоционального напряжения",
      "Улучшение качества сна",
      "Снижение уровня стресса",
      "Расслабление мышц",
      "Общее восстановление организма"
    ]
  },
  16: {
    id: 16,
    name: "Массаж спины, шеи, рук",
    price: "1000₽",
    description: "Комбинированный массаж, охватывающий основные зоны напряжения у мужчин: спину, шею и руки, особенно актуальный при сидячей работе.",
    image: imageUrls.massageTherapy[6],
    duration: "40 минут",
    effects: [
      "Снятие напряжения в зоне шеи и плеч",
      "Улучшение кровообращения",
      "Профилактика остеохондроза",
      "Снижение болевых ощущений",
      "Расслабление мышц спины"
    ]
  },
  17: {
    id: 17,
    name: "Лимфодренажный массаж",
    price: "1000₽",
    description: "Деликатная техника массажа, направленная на стимуляцию лимфатической системы и улучшение оттока лимфы, способствующая уменьшению отечности и детоксикации организма.",
    image: imageUrls.spaServices[0],
    duration: "40 минут",
    effects: [
      "Уменьшение отечности",
      "Стимуляция лимфотока",
      "Детоксикация организма",
      "Улучшение метаболизма",
      "Повышение тонуса кожи"
    ]
  }
};
