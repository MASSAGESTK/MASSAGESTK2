import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export interface ServiceDetails {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
  duration: string;
  effects: string[];
}

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceDetails | null;
}

const ServiceModal = ({ isOpen, onClose, service }: ServiceModalProps) => {
  if (!service) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white rounded-lg max-w-lg w-full overflow-hidden max-h-[90vh] flex flex-col sm:max-w-lg">
        <DialogHeader className="border-b p-4 flex justify-between items-center">
          <DialogTitle className="text-lg font-medium">{service.name}</DialogTitle>
        </DialogHeader>
        
        <div className="overflow-y-auto flex-grow p-4">
          <img 
            src={service.image} 
            alt={service.name} 
            className="w-full h-56 object-cover rounded-lg mb-4"
          />
          <p className="text-[#FF6B35] font-medium text-xl mb-2">{service.price}</p>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-1">Описание</h3>
              <p className="text-sm text-gray-600">{service.description}</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Эффект</h3>
              <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                {service.effects.map((effect, index) => (
                  <li key={index}>{effect}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-1">Продолжительность</h3>
              <p className="text-sm text-gray-600">{service.duration}</p>
            </div>
          </div>
        </div>
        
        <DialogFooter className="p-4 border-t">
          <Button className="w-full bg-primary hover:bg-primary/80 text-white">
            Записаться
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceModal;
