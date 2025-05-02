import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const imageUrls = {
  // Услуги красоты - косметология, макияж, уход за волосами
  beautyServices: [
    "https://img.freepik.com/free-photo/top-view-smiling-bearded-man-showing-ten-percentage-torn-hole-yellow-paper_140725-106229.jpg?t=st=1746214985~exp=1746218585~hmac=0e80626436dd569c5191d36d42cdafc8c24dd5438b9e01343e2faa14ebeb7cbf&w=2000",
    "https://img.freepik.com/free-photo/close-up-shot-puzzled-woman-with-blue-scrub-face-covers-one-eye-with-hand-tries-hide-herself-has-stupefied-expression-wears-protective-bathcap-wants-look-younger-stands-shirtless_273609-30748.jpg?t=st=1746216333~exp=1746219933~hmac=a627f07e75356a2d5bb516cb3850a03a69a7ecee554e713a05d86982f94c1aac&w=2000",
    "https://img.freepik.com/free-photo/spa-still-life-with-beauty-products_23-2148200585.jpg?t=st=1746219277~exp=1746222877~hmac=ef7de0aa37ed78709932a42164acdf08c6b16544cdf07e988ae32a04d4cb1811&w=2000",
    "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  ],
  // SPA-услуги - общие процедуры для релаксации
  spaServices: [
    "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    "https://img.freepik.com/free-photo/young-attractive-woman-having-massage-relaxing-spa-salon_176420-7572.jpg?t=st=1746216810~exp=1746220410~hmac=7a4746dca9b4c406fea8ca32c388e4209c0bc0f10ed3601c411f7ec57d15e44e&w=2000",
    "https://img.freepik.com/free-photo/young-woman-bright-multicolored-sweater-blue-holds-gift-certificate-smiles-enthusiastically_343596-7683.jpg?t=st=1746219444~exp=1746223044~hmac=280038ffa393249e7836b52ec1d8509dd826dca9b7f75e32d0c5ba1223392d26&w=826",
    "https://img.freepik.com/free-photo/young-woman-with-beautiful-body-measure-tape_1150-14452.jpg?t=st=1746219765~exp=1746223365~hmac=1fe432dac821857b0226974d2238719c76508048eda89cc3bb35ca971cc6b555&w=2000",
  ],
  // Интерьер салона
  salonInterior: [
    "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    "https://img.freepik.com/free-photo/front-view-womans-hand-with-flowers-valentines-day_23-2149164940.jpg?t=st=1746217558~exp=1746221158~hmac=afc7bdf5346d12cf8546b44d046421e78faf5ec0017b6b47c212fa0f2b95d9e2&w=1800",
  ],
  // Массажные процедуры
  massageTherapy: [
    "https://img.freepik.com/free-photo/vertical-shot-faceless-healthy-woman-brown-underwear-holds-orange-body-has-clean-healthy-skin-without-cellulite-slender-legs-demonstrates-perfect-figure-after-liposuction-poses-indoor_273609-59278.jpg?t=st=1746216431~exp=1746220031~hmac=64518d9bace08ef4588e8bf717d39e0b4cd36dcfb123a20ce43d40630f8a6c81&w=826",
    "https://img.freepik.com/free-photo/relaxing-spa-concept-with-woman_23-2147816920.jpg?t=st=1746214110~exp=1746217710~hmac=0655f08e1cc6f63c57c91777d5bada095a87502d5af407d75c782c10fcf7291a&w=2000",
    "https://images.unsplash.com/photo-1545620783-e410c29033a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    "https://img.freepik.com/free-photo/close-up-greeting-card_1098-2833.jpg?t=st=1746214603~exp=1746218203~hmac=b20512233990d1adff6a508ed59d31f7e8df08089c44426633ab1e7c14ae8e21&w=1480",
    "https://img.freepik.com/free-photo/young-attractive-woman-having-massage-relaxing-spa-salon_176420-7572.jpg?t=st=1746214433~exp=1746218033~hmac=05710534d7baa845b682d29d096a1de672f0f584cbccbce9e807cdf7d6d3982d&w=2000",
  ],
  // Уход за телом - скрабы, обертывания, коррекция фигуры
  bodyTreatments: [
    "https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  ],
  // Уход за лицом - чистки, маски, пилинги
  facialTreatments: [
    "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1596704017254-9098c6492856?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1554057009-5cf0445a4650?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  ],
  // Мужские процедуры
  menServices: [
    "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    "https://img.freepik.com/free-photo/happy-father-s-day-composition-father-s-day-top-view_185193-110580.jpg?t=st=1746220183~exp=1746223783~hmac=d21aea0774ea86ecced9e469efd15aaa4643baa9ac6dcdbbf92b41484983a8df&w=2000",
    "https://images.unsplash.com/photo-1553521041-d168abd31de3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
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
    "https://images.unsplash.com/photo-1596704017254-9098c6492856?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
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
