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

// Компонент для генерации SVG-изображения скидки
const DiscountSvgImage = ({ title }: { title: string }) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 300 300"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      {/* Градиентный фон */}
      <defs>
        <linearGradient id="discountGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4A0D67" /> {/* Основной цвет темы */}
          <stop offset="100%" stopColor="#280537" /> {/* Темнее для глубины */}
        </linearGradient>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.3" />
        </filter>
      </defs>
      
      {/* Фон */}
      <rect width="100%" height="100%" fill="url(#discountGradient)" />
      
      {/* Декоративные элементы */}
      <circle cx="50" cy="50" r="30" fill="#FF6B35" opacity="0.6" />
      <circle cx="250" cy="250" r="20" fill="#FF6B35" opacity="0.4" />
      
      {/* Ценник/скидка */}
      <g transform="translate(150, 150)" filter="url(#shadow)">
        <circle cx="0" cy="0" r="80" fill="#FF6B35" />
        <text
          x="0"
          y="5"
          fontSize="65"
          fontWeight="bold"
          fontFamily="Arial, sans-serif"
          fill="white"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          -10%
        </text>
      </g>
      
      {/* Надписи */}
      <text
        x="150"
        y="60"
        fontSize="24"
        fontWeight="bold"
        fontFamily="Arial, sans-serif"
        fill="white"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        Скидка на первое посещение
      </text>
      
      <text
        x="150"
        y="250"
        fontSize="18"
        fontFamily="Arial, sans-serif"
        fill="white"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        Для новых клиентов
      </text>
    </svg>
  );
};

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
      {isDiscountPromo ? (
        <div className="w-full md:w-1/3 h-32 bg-primary">
          <DiscountSvgImage title={title} />
        </div>
      ) : (
        <div className="relative w-full md:w-1/3 h-32 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-32 object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-purple-600/40 to-transparent pointer-events-none"></div>
        </div>
      )}
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
