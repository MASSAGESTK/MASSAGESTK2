import { Button } from "@/components/ui/button";
import { imageUrls } from "@/lib/utils";

interface PromotionCardProps {
  title: string;
  description: string;
  image: string;
  expiry?: string;
  price?: string;
  buttonText: string;
  onButtonClick: () => void;
  badge?: string;
}

const PromotionCard = ({
  title,
  description,
  image,
  expiry,
  price,
  buttonText,
  onButtonClick,
  badge,
}: PromotionCardProps) => {
  // Проверка, является ли это карточкой со скидкой 10%
  const isDiscountPromo = title.includes("Скидка 10%");
  
  return (
    <div className="bg-card text-card-foreground rounded-lg shadow-md hover:shadow-xl dark:shadow-white/10 overflow-hidden flex flex-col md:flex-row md:h-32 transition-all duration-200 transform hover:-translate-y-1">
      <div className="relative w-full md:w-1/3 h-32 overflow-hidden">
        <img 
          src={isDiscountPromo ? imageUrls.certificates[0] : image} 
          alt={title} 
          className="w-full h-32 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-purple-600/40 to-transparent pointer-events-none"></div>
      </div>
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-base">{title}</h3>
            {badge && (
              <span className="bg-[#FF6B35] text-white text-xs px-2 py-0.5 rounded-full ml-2 whitespace-nowrap shadow-sm">
                {badge}
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{description}</p>
        </div>
        
        <div className="mt-2 flex justify-between items-center">
          {price && <p className="font-semibold text-[#FF6B35] text-sm drop-shadow-sm">{price}</p>}
          <Button 
            className={`${price ? '' : 'ml-auto'} bg-primary hover:bg-primary/90 text-white text-xs px-3 py-1 h-8 shadow-sm hover:shadow-md transition-all`}
            onClick={onButtonClick}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PromotionCard;
