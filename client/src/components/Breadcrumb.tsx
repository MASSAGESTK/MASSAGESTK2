import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import { useLocation } from "wouter";
import { Helmet } from "react-helmet";
import { generateBreadcrumbSchema } from "@/utils/seoUtils";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
}

/**
 * Компонент хлебных крошек для навигации и SEO оптимизации
 */
export const Breadcrumb = ({
  items,
  separator = <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />,
  className = "",
}: BreadcrumbProps) => {
  const [location] = useLocation();

  // Если элементы не переданы, генерируем их из текущего URL
  const breadcrumbItems = items || generateBreadcrumbItems(location);
  
  // Добавляем главную страницу в начало, если её нет
  if (!breadcrumbItems.some(item => item.url === '/')) {
    breadcrumbItems.unshift({ name: 'Главная', url: '/' });
  }

  return (
    <>
      {/* Структурированные данные для поисковиков */}
      <Helmet>
        <script type="application/ld+json">
          {generateBreadcrumbSchema(breadcrumbItems)}
        </script>
      </Helmet>
      
      {/* Видимый элемент хлебных крошек */}
      <nav aria-label="Хлебные крошки" className={`flex flex-wrap items-center text-sm ${className}`}>
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          
          return (
            <span key={item.url} className="flex items-center">
              {isLast ? (
                <span className="font-medium text-foreground" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link href={item.url} className="text-muted-foreground hover:text-primary transition-colors duration-200">
                    {item.name}
                  </Link>
                  <span className="mx-1">{separator}</span>
                </>
              )}
            </span>
          );
        })}
      </nav>
    </>
  );
};

/**
 * Генерирует элементы хлебных крошек на основе URL
 */
function generateBreadcrumbItems(path: string): BreadcrumbItem[] {
  const pathSegments = path.split('/').filter(Boolean);
  
  // Карта соответствия URL-сегментов и названий страниц
  const pathNameMap: Record<string, string> = {
    'services': 'Услуги',
    'promotions': 'Акции',
    'memberships': 'Абонементы',
    'about': 'О нас',
    'settings': 'Настройки'
  };
  
  let currentPath = '';
  return pathSegments.map(segment => {
    currentPath += `/${segment}`;
    return {
      name: pathNameMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1),
      url: currentPath
    };
  });
}

export default Breadcrumb;