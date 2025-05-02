import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const imageUrls = {
  // Услуги красоты - косметология, макияж, уход за волосами
  beautyServices: [
    "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  ],
  // SPA-услуги - общие процедуры для релаксации
  spaServices: [
    "https://img.freepik.com/free-photo/close-up-woman-being-massaged_23-2148815335.jpg?",
    "https://img.freepik.com/free-photo/young-attractive-woman-having-massage-relaxing-spa-salon_176420-7572.jpg?",
    "https://img.freepik.com/free-photo/young-woman-bright-multicolored-sweater-blue-holds-gift-certificate-smiles-enthusiastically_343596-7683.jpg?t=st=1746219444~exp=1746223044~hmac=280038ffa393249e7836b52ec1d8509dd826dca9b7f75e32d0c5ba1223392d26&w=826",
    "https://img.freepik.com/free-photo/young-woman-with-beautiful-body-measure-tape_1150-14452.jpg?",
    "https://img.freepik.com/free-photo/closeup-pressotherapy-treatment-spa-center_637285-9469.jpg?",
    "https://img.freepik.com/free-photo/high-angle-man-getting-massage_23-2150649807.jpg?",
  ],
  // Интерьер салона
  salonInterior: [
    "https://img.freepik.com/free-photo/armchair-couch_1203-772.jpg?",
    "https://img.freepik.com/free-photo/front-view-womans-hand-with-flowers-valentines-day_23-2149164940.jpg?",
  ],
  // Массажные процедуры
  massageTherapy: [
    "https://img.freepik.com/free-photo/young-attractive-woman-having-massage-relaxing-spa-salon_176420-7572.jpg?",
    "https://img.freepik.com/free-photo/relaxing-spa-concept-with-woman_23-2147816920.jpg?",
    "https://img.freepik.com/free-photo/woman-getting-back-massage-from-female-masseur_23-2150461420.jpg?",
    "https://img.freepik.com/free-photo/close-up-greeting-card_1098-2833.jpg?",
    "https://img.freepik.com/free-photo/young-attractive-woman-having-massage-relaxing-spa-salon_176420-7572.jpg?",
    "https://img.freepik.com/free-photo/front-view-woman-working-spa_23-2150911790.jpg?",
    "https://img.freepik.com/free-photo/physiotherapist-performing-therapeutic-massage-male-client_23-2149143841.jpg?",
  ],
  // Уход за телом - скрабы, обертывания, коррекция фигуры
  bodyTreatments: [
    "https://img.freepik.com/premium-photo/side-view-beautiful-woman-is-receiving-massaging-procedure-spa-salon-she-is-lying-with-pleasure-beautician-is-holding-special-equipment-her-back_2221-9113.jpg?",
  ],
  // Уход за лицом - чистки, маски, пилинги
  facialTreatments: [
    "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    "https://img.freepik.com/free-photo/close-up-smiley-woman-with-face-treatment_23-2149182155.jpg?",
    "https://img.freepik.com/free-photo/view-woman-getting-facial-yoga-massage-stay-young_23-2150520769.jpg?",
    "https://img.freepik.com/free-photo/photo-lovely-european-woman-has-blue-spa-salt-granules-face-wears-waterproof-headgear-points-with-index-finger-upwards_273609-30751.jpg?",
    "https://img.freepik.com/free-photo/young-woman-getting-face-skin-treatment-spa_23-2148825383.jpg?",
  ],
  // Мужские процедуры
  menServices: [
    "https://img.freepik.com/free-photo/pleasure-face-massage_23-2147638155.jpg?",
    "https://img.freepik.com/free-photo/relaxed-man-having-thai-herbal-head-massage-wellness-center_637285-1715.jpg?",
  ],
  // Комплексные программы
  complexPrograms: [
    "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1591343395082-e120087004b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1596755094894-336dfe33c7c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  ],
  // Сертификаты и подарочные карты
  certificates: [
    "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1545658969-19d8739eecc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1607344585290-2074f292ead7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  ],
  // Anti-age процедуры
  antiAge: [
    "https://img.freepik.com/free-photo/front-view-hands-touching-woman-s-face_23-2149349930.jpg?",
    "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  ],
  // Массаж лица
  facialMassage: [
    "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  ],
};
