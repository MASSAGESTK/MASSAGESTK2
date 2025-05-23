import { imageUrls } from "@/lib/utils";
import { ProgramDetails } from "@/components/ProgramModal";

// Комплексные программы из страницы услуг
export const complexServicesPrograms = [
  { 
    id: 1, 
    title: "Коррекция фигуры: 5 сеансов", 
    price: "17000₽", 
    features: [
      "прессотерапия",
      "вибро-прессо-роликовый массаж",
      "массаж антицеллюлитный"
    ]
  },
  { 
    id: 2, 
    title: "Программа похудения: 10 сеансов", 
    price: "35000₽", 
    features: [
      "прессотерапия",
      "вибро-прессо-роликовый массаж",
      "массаж антицеллюлитный"
    ]
  },
  { 
    id: 3, 
    title: "Программа для тела: 1 сеанс", 
    price: "4000₽", 
    features: [
      "массаж",
      "аппаратные процедуры",
      "вспомогательные процедуры",
      "майдеротерапия",
      "обёртывание"
    ]
  },
  { 
    id: 4, 
    title: "Программа для лица: 1 сеанс", 
    price: "4000₽", 
    features: [
      "массаж лица",
      "уходовые процедуры",
      "аппаратная процедура",
      "маска",
      "парафин рук"
    ]
  },
];

// Данные абонементов для карточек
export const complexPrograms = [
  {
    id: 101,
    title: "Базовый абонемент",
    price: "5000₽",
    features: [
      "5 любых процедур из категории 'Массаж'",
      "Скидка 10% на все дополнительные услуги",
      "Срок действия - 2 месяца",
      "Возможность переноса записи за 12 часов"
    ]
  },
  {
    id: 102,
    title: "Премиум абонемент",
    price: "9000₽",
    features: [
      "8 любых процедур из категории 'Массаж'",
      "1 комплексная SPA-программа в подарок",
      "Скидка 15% на все дополнительные услуги",
      "Срок действия - 3 месяца",
      "Возможность переноса записи за 6 часов"
    ]
  },
  {
    id: 103,
    title: "VIP-абонемент",
    price: "15000₽",
    features: [
      "10 любых процедур на выбор",
      "2 комплексные программы в подарок",
      "Скидка 20% на все дополнительные услуги",
      "Срок действия - 6 месяцев",
      "Приоритетная запись и обслуживание",
      "Бесплатная консультация косметолога"
    ]
  },
  {
    id: 104,
    title: "Абонемент 'Коррекция фигуры'",
    price: "12000₽",
    features: [
      "8 процедур антицеллюлитного массажа",
      "3 процедуры обертывания",
      "Скидка 15% на аппаратные процедуры",
      "Срок действия - 4 месяца",
      "Индивидуальные рекомендации по питанию"
    ]
  },
  {
    id: 105,
    title: "Мужской абонемент",
    price: "8000₽",
    features: [
      "5 процедур для мужчин на выбор",
      "3 спортивных массажа",
      "Скидка 15% на дополнительные услуги",
      "Срок действия - 3 месяца",
      "Приоритетная запись в вечернее время"
    ]
  },
  {
    id: 106,
    title: "Абонемент 'Здоровая спина'",
    price: "7500₽",
    features: [
      "10 массажей спины",
      "Скидка 10% на дополнительные услуги",
      "Срок действия - 4 месяца",
      "Консультация специалиста",
      "Индивидуальные рекомендации по упражнениям"
    ]
  }
];

// Полные данные о комплексных программах и абонементах с подробностями
export const programDetailsMap: Record<number, ProgramDetails> = {
  // Комплексные программы из страницы услуг
  1: {
    id: 1,
    title: "Коррекция фигуры: 5 сеансов",
    price: "17000₽",
    description: "Комплексная программа для моделирования силуэта и борьбы с целлюлитом. Сочетает в себе аппаратные и ручные методики для достижения максимального эффекта.",
    image: imageUrls.spaServices[0],
    sessions: "5 сеансов",
    duration: "90 минут",
    features: [
      "Прессотерапия (аппаратный лимфодренаж)",
      "Вибро-прессо-роликовый массаж",
      "Антицеллюлитный массаж проблемных зон",
      "Обертывание для усиления эффекта",
      "Наладить питьевой режим"
    ],
    additionalInfo: [
      "Рекомендуемая частота: 2 раза в неделю",
      "Видимый эффект после 2-3 сеансов",
      "Включает рекомендации по питанию"
    ]
  },
  2: {
    id: 2,
    title: "Программа похудения: 10 сеансов",
    price: "35000₽",
    description: "Интенсивная программа для значительной коррекции фигуры и снижения объемов. Данный курс обеспечивает стойкие результаты благодаря комплексному подходу и длительности воздействия.",
    image: imageUrls.spaServices[2],
    sessions: "10 сеансов",
    duration: "120 минут",
    features: [
      "Прессотерапия для лимфодренажа",
      "Вибро-прессо-роликовый массаж для разбивания жировых отложений",
      "Интенсивный антицеллюлитный массаж",
      "Обертывание с активными компонентами",
      "Аппаратные процедуры для моделирования силуэта",
      "Миостимуляция для тонуса мышц",
      "Лимфодренажный массаж"
    ],
    additionalInfo: [
      "Индивидуальное сопровождение специалиста",
      "Составление плана питания на весь курс",
      "Дополнительные рекомендации по поддержанию результата"
    ]
  },
  3: {
    id: 3,
    title: "Программа для тела: 1 сеанс",
    price: "4000₽",
    description: "Единоразовый комплекс процедур для тела, который поможет получить мгновенный эффект перед важным событием. Идеально подходит для тех, кто хочет выглядеть безупречно к определенной дате.",
    image: imageUrls.massageTherapy[0],
    duration: "120 минут",
    features: [
      "Релаксирующий или моделирующий массаж",
      "Аппаратные процедуры по выбору",
      "Вспомогательные процедуры для улучшения состояния кожи",
      "Майдеротерапия (массаж деревянными инструментами)",
      "Обёртывание (на выбор: антицеллюлитное, увлажняющее, детокс)"
    ],
    additionalInfo: [
      "Можно приобрести как разовую процедуру",
      "Доступны пакетные предложения со скидкой"
    ]
  },
  4: {
    id: 4,
    title: "Программа для лица: 1 сеанс",
    price: "4000₽",
    description: "Комплексный уход за лицом, который объединяет все необходимые этапы для достижения видимого результата после одной процедуры. Подарите себе мгновенное преображение.",
    image: imageUrls.antiAge[0],
    duration: "90 минут",
    features: [
      "Массаж лица по индивидуальной методике",
      "Уходовые процедуры с использованием премиальной косметики",
      "Аппаратная процедура по показаниям (микротоки, RF-лифтинг)",
      "Маска с активными компонентами",
      "Парафин рук в подарок"
    ],
    additionalInfo: [
      "Эффект сохраняется до 5-7 дней",
      "Идеально перед важными мероприятиями"
    ]
  },
  
  // Абонементы
  101: {
    id: 101,
    title: "Базовый абонемент",
    price: "5000₽",
    description: "Идеальное решение для регулярного ухода за собой. Этот абонемент подойдет тем, кто ценит комфорт и выгоду.",
    image: imageUrls.spaServices[0],
    duration: "2 месяца",
    features: [
      "5 любых процедур из категории 'Массаж'",
      "Скидка 10% на все дополнительные услуги",
      "Срок действия - 2 месяца",
      "Возможность переноса записи за 12 часов"
    ],
    sessions: "5 процедур",
    additionalInfo: [
      "Экономия до 20% по сравнению с разовыми процедурами",
      "Возможность приобретения в подарок"
    ]
  },
  102: {
    id: 102,
    title: "Премиум абонемент",
    price: "9000₽",
    description: "Расширенный набор процедур для тех, кто хочет получить максимум пользы и удовольствия от посещения нашего салона. Дополнительные привилегии и особый комфорт.",
    image: imageUrls.spaServices[1],
    duration: "3 месяца",
    features: [
      "8 любых процедур из категории 'Массаж'",
      "1 комплексная SPA-программа в подарок",
      "Скидка 15% на все дополнительные услуги",
      "Срок действия - 3 месяца",
      "Возможность переноса записи за 6 часов"
    ],
    sessions: "8 процедур + 1 SPA-программа",
    additionalInfo: [
      "Экономия до 25% по сравнению с разовыми процедурами",
      "Возможность использования членами семьи",
      "Приоритетная запись в удобное время"
    ]
  },
  103: {
    id: 103,
    title: "VIP-абонемент",
    price: "15000₽",
    description: "Эксклюзивное предложение для истинных ценителей комфорта и качества. Максимальный набор привилегий и индивидуальный подход к каждому вашему визиту.",
    image: imageUrls.spaServices[3],
    duration: "6 месяцев",
    features: [
      "10 любых процедур на выбор",
      "2 комплексные программы в подарок",
      "Скидка 20% на все дополнительные услуги",
      "Срок действия - 6 месяцев",
      "Приоритетная запись и обслуживание",
      "Бесплатная консультация косметолога"
    ],
    sessions: "10 процедур + 2 программы",
    additionalInfo: [
      "Экономия до 30% по сравнению с разовыми процедурами",
      "Персональный администратор",
      "Напитки и угощения во время процедур"
    ]
  },
  104: {
    id: 104,
    title: "Абонемент 'Коррекция фигуры'",
    price: "12000₽",
    description: "Специализированный комплекс процедур, направленных на коррекцию фигуры, уменьшение целлюлита и улучшение состояния кожи тела.",
    image: imageUrls.bodyTreatments[0],
    duration: "4 месяца",
    features: [
      "8 процедур антицеллюлитного массажа",
      "3 процедуры обертывания",
      "Скидка 15% на аппаратные процедуры",
      "Срок действия - 4 месяца",
      "Индивидуальные рекомендации по питанию"
    ],
    sessions: "11 процедур",
    additionalInfo: [
      "Видимый результат уже после 5-6 процедур",
      "Сопровождение и мотивация от специалистов",
      "Специальный курс, подобранный профессионалами"
    ]
  },
  105: {
    id: 105,
    title: "Мужской абонемент",
    price: "8000₽",
    description: "Разработан специально для мужчин, учитывая особенности мужской кожи и потребности. Комплекс процедур для релаксации и поддержания отличного внешнего вида.",
    image: imageUrls.menServices[2],
    duration: "3 месяца",
    features: [
      "5 процедур для мужчин на выбор",
      "3 спортивных массажа",
      "Скидка 15% на дополнительные услуги",
      "Срок действия - 3 месяца",
      "Приоритетная запись в вечернее время"
    ],
    sessions: "8 процедур",
    additionalInfo: [
      "Специальная атмосфера и подход",
      "Утреннее и вечернее время посещения",
      "Возможность приобретения в подарок"
    ]
  },
  106: {
    id: 106,
    title: "Абонемент 'Здоровая спина'",
    price: "7500₽",
    description: "Идеальное решение для тех, кто страдает от болей в спине, проблем с осанкой или проводит много времени за компьютером. Комплекс процедур, направленных на восстановление и поддержание здоровья спины.",
    image: imageUrls.massageTherapy[4],
    duration: "4 месяца",
    features: [
      "10 массажей спины",
      "Скидка 10% на дополнительные услуги",
      "Срок действия - 4 месяца",
      "Консультация специалиста",
      "Индивидуальные рекомендации по упражнениям"
    ],
    sessions: "10 процедур",
    additionalInfo: [
      "Снижение болевых ощущений уже после первых сеансов",
      "Комплексный подход к проблемам спины",
      "Возможность комбинирования с другими абонементами"
    ]
  }
};