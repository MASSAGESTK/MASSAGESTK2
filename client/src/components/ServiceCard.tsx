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
      <div className="service-card bg-white rounded-lg shadow-md flex-shrink-0 w-64 overflow-hidden">
        {image && (
          <img src={image} alt={name} className="w-full h-32 object-cover" />
        )}
        <div className="p-3">
          <h3 className="font-medium">{name}</h3>
          <p className="text-[#FF6B35] font-medium mt-1">{price}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="service-card bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">{name}</h3>
          {duration && <p className="text-sm text-gray-500 mt-1">{duration}</p>}
        </div>
        <p className="text-[#FF6B35] font-medium">{price}</p>
      </div>
      <Button 
        variant="outline"
        className="w-full mt-4 border-primary text-primary hover:bg-primary hover:text-white"
        onClick={() => onClick(id)}
      >
        Подробнее
      </Button>
    </div>
  );
};

export default ServiceCard;
