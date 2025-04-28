import { imageUrls } from "@/lib/utils";
import PromotionCard from "@/components/PromotionCard";

const promotions = [
  {
    id: 1,
    title: "Скидка 20% на первое посещение",
    description: "Получите скидку 20% на любую услугу при первом посещении нашего салона. Предложение действует для новых клиентов.",
    image: imageUrls.beautyServices[0],
    badge: "До 31.12.2023",
    buttonText: "Получить скидку",
  },
  {
    id: 2,
    title: "Абонемент на массаж спины",
    description: "10 сеансов классического массажа спины по специальной цене. Срок действия абонемента - 3 месяца.",
    image: imageUrls.massageTherapy[0],
    badge: "Выгода 10%",
    price: "8200₽",
    buttonText: "Приобрести",
  },
  {
    id: 3,
    title: "Подарочные сертификаты",
    description: "Порадуйте близких подарочным сертификатом на услуги нашего салона. Доступны сертификаты различного номинала.",
    image: imageUrls.massageTherapy[0],
    badge: "Всегда актуально",
    buttonText: "Выбрать сертификат",
  },
];

const PromotionsPage = () => {
  const handlePromotionClick = (id: number) => {
    console.log("Promotion clicked:", id);
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-xl font-semibold mb-6">Акции и предложения</h1>
      
      {/* Promotions List */}
      <div className="space-y-6">
        {promotions.map((promo) => (
          <PromotionCard
            key={promo.id}
            title={promo.title}
            description={promo.description}
            image={promo.image}
            badge={promo.badge}
            price={promo.price}
            buttonText={promo.buttonText}
            onButtonClick={() => handlePromotionClick(promo.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default PromotionsPage;
