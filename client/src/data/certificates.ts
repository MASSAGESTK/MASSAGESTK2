import { Certificate } from "@/components/CertificateModal";

// Данные о доступных сертификатах
export const certificates: Certificate[] = [
  {
    id: 1,
    title: "Сертификат на уходовые процедуры",
    description: "Подарочный сертификат на любую уходовую процедуру для лица",
    price: "3000₽",
    type: "service"
  },
  {
    id: 2,
    title: "Сертификат на SPA-массаж",
    description: "Подарочный сертификат на расслабляющий спа-массаж",
    price: "2500₽",
    type: "service"
  },
  {
    id: 3,
    title: "Сертификат на 5000₽",
    description: "Подарочный сертификат номиналом 5000₽ на любые услуги салона",
    price: "5000₽",
    type: "amount"
  },
  {
    id: 4,
    title: "Сертификат на 10000₽",
    description: "Подарочный сертификат номиналом 10000₽ на любые услуги салона",
    price: "10000₽",
    type: "amount"
  },
  {
    id: 5,
    title: "Сертификат на программу коррекции фигуры",
    description: "Подарочный сертификат на комплексную программу коррекции фигуры (5 сеансов)",
    price: "17000₽",
    type: "program"
  }
];