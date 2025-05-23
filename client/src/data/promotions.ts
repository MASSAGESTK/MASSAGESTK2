import { imageUrls } from "@/lib/utils";

// Данные о акциях и специальных предложениях
export const promotions = [
  {
    id: 1,
    title: "Скидка 10% на первое посещение",
    description: "Получите скидку 10% на любую услугу при первом посещении нашего салона. Предложение действует для новых клиентов.",
    image: imageUrls.certificates[0],
    badge: "Актуально",
    buttonText: "Выбрать",
  },
  {
    id: 2,
    title: "Абонемент на массаж спины",
    description: "10 сеансов классического массажа спины по специальной цене. Срок действия абонемента - 3 месяца.",
    image: imageUrls.massageTherapy[4],
    badge: "Выгода 10%",
    price: "8200₽",
    buttonText: "Приобрести",
  },
  {
    id: 3,
    title: "Подарочные сертификаты",
    description: "Порадуйте близких подарочным сертификатом на услуги нашего салона. Доступны сертификаты различного номинала.",
    image: imageUrls.massageTherapy[3],
    badge: "Актуально",
    buttonText: "Выбрать сертификат",
  },
];