import { Button } from "@/components/ui/button";

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
  return (
    <div className="bg-card text-card-foreground rounded-lg shadow-md dark:shadow-white/5 overflow-hidden flex flex-col md:flex-row md:h-32 transition-colors duration-200">
      <img 
        src={image} 
        alt={title} 
        className="w-full md:w-1/3 h-32 object-cover"
      />
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-base">{title}</h3>
            {badge && (
              <span className="bg-[#FF6B35] text-white text-xs px-2 py-0.5 rounded-full ml-2 whitespace-nowrap">
                {badge}
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{description}</p>
        </div>
        
        <div className="mt-2 flex justify-between items-center">
          {price && <p className="font-medium text-[#FF6B35] text-sm">{price}</p>}
          <Button 
            className={`${price ? '' : 'ml-auto'} bg-primary hover:bg-primary/80 text-white text-xs px-3 py-1 h-8`}
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
