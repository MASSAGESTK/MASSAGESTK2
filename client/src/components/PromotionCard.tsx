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
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-lg">{title}</h3>
          {badge && (
            <span className="bg-[#FF6B35] text-white text-xs px-2 py-1 rounded-full">
              {badge}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-600 mt-2">{description}</p>
        
        {price ? (
          <div className="flex justify-between items-center mt-3">
            <p className="font-medium text-[#FF6B35]">{price}</p>
            <Button 
              className="bg-primary hover:bg-primary/80 text-white px-3 py-1.5"
              onClick={onButtonClick}
            >
              {buttonText}
            </Button>
          </div>
        ) : (
          <Button 
            className="mt-4 bg-primary hover:bg-primary/80 text-white"
            onClick={onButtonClick}
          >
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );
};

export default PromotionCard;
