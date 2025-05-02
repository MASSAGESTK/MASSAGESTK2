import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
          <img src={image} alt={name} className="w-full h-32 object-cover" />
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
    <div className="service-card bg-card rounded-lg shadow-md hover:shadow-xl dark:shadow-white/10 p-4 transition-all duration-200 flex flex-col h-full transform hover:-translate-y-1">
      <div className="flex justify-between items-start flex-grow">
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
  );
};

export default ServiceCard;
