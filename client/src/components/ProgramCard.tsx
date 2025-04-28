import { Button } from "@/components/ui/button";

interface ProgramCardProps {
  id: number;
  title: string;
  price: string;
  features: string[];
  onClick: (id: number) => void;
}

const ProgramCard = ({ id, title, price, features, onClick }: ProgramCardProps) => {
  return (
    <div className="service-card bg-card text-card-foreground rounded-lg shadow-md dark:shadow-white/5 overflow-hidden transition-colors duration-200 h-full">
      <div className="p-4 flex flex-col h-full">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-lg">{title}</h3>
          <p className="text-[#FF6B35] font-medium">{price}</p>
        </div>
        <ul className="mt-2 text-sm text-muted-foreground ml-5 list-disc flex-grow">
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
        <Button 
          className="w-full mt-4 bg-primary hover:bg-primary/80 text-white"
          onClick={() => onClick(id)}
        >
          Подробнее
        </Button>
      </div>
    </div>
  );
};

export default ProgramCard;
