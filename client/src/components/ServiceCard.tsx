import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import LazyLoadImage from "./LazyLoadImage";

interface ServiceCardProps {
  id: number;
  name: string;
  price: string;
  duration?: string;
  image?: string;
  onClick: (id: number) => void;
  featured?: boolean;
}

const ServiceCard = ({
  id,
  name,
  price,
  duration,
  image,
  onClick,
  featured = false,
}: ServiceCardProps) => {

  if (featured) {
    return (
      <div 
        className="service-card bg-card rounded-lg shadow-lg hover:shadow-xl dark:shadow-white/10 flex-shrink-0 w-64 overflow-hidden transition-all duration-200 transform hover:-translate-y-1 cursor-pointer"
        onClick={() => onClick(id)}
      >
        {image && (
          <div className="relative w-full h-32 overflow-hidden">
            <LazyLoadImage src={image} alt={name} className="w-full h-32 object-cover" />
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-purple-600/40 to-transparent pointer-events-none"></div>
          </div>
        )}
        <div className="p-3">
          <div className="flex justify-between items-start">
            <h3 className="font-medium">{name}</h3>
            <p className="text-[#FF6B35] font-semibold drop-shadow-sm">{price}</p>
          </div>
          <Button 
            variant="link"
            className="text-xs text-primary p-0 mt-2 h-auto"
          >
            Подробнее →
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="service-card bg-card rounded-lg shadow-md hover:shadow-xl dark:shadow-white/10 overflow-hidden transition-all duration-200 flex flex-col h-full transform hover:-translate-y-1">
      {image && (
        <div className="relative w-full h-32 overflow-hidden">
          <LazyLoadImage src={image} alt={name} className="w-full h-32 object-cover" />
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-purple-600/40 to-transparent pointer-events-none"></div>
        </div>
      )}
      <div className="p-4 flex-grow">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">{name}</h3>
            {duration && <p className="text-sm text-muted-foreground mt-1">{duration}</p>}
          </div>
          <p className="text-[#FF6B35] font-semibold drop-shadow-sm">{price}</p>
        </div>
        <Button 
          variant="outline"
          className="w-full mt-4 border-primary text-primary hover:bg-primary hover:text-white shadow-sm hover:shadow-md transition-shadow"
          onClick={() => onClick(id)}
        >
          Подробнее
        </Button>
      </div>
    </div>
  );
};

export default ServiceCard;
