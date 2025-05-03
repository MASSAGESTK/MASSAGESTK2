import { useState, useEffect, useRef, ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface LazyLoadImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  placeholderColor?: string;
  observerOptions?: IntersectionObserverInit;
}

/**
 * Компонент для ленивой загрузки изображений
 * Загружает изображение только когда оно попадает в область видимости
 */
const LazyLoadImage = ({
  src,
  alt,
  className,
  placeholderColor = "#f3f4f6",
  observerOptions = { rootMargin: "200px 0px" },
  ...props
}: LazyLoadImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Используем IntersectionObserver для отслеживания видимости изображения
  useEffect(() => {
    if (!imgRef.current) return;
    
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    }, observerOptions);
    
    observer.observe(imgRef.current);
    
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [observerOptions]);
  
  // Обрабатываем загрузку изображения
  const handleLoad = () => {
    console.log('Image loaded:', src);
    setIsLoaded(true);
  };

  const handleError = () => {
    console.error('Image failed to load:', src);
  };

  // Для отладки
  console.log('LazyLoadImage:', { src, isInView, isLoaded });

  return (
    <div 
      ref={imgRef}
      className="relative overflow-hidden" 
      style={{ 
        backgroundColor: placeholderColor,
      }}
    >
      {isInView && (
        <img
          src={src}
          alt={alt || "Image"}
          className={cn(
            "transition-opacity duration-300 w-full h-full object-cover",
            className
          )}
          onLoad={handleLoad}
          onError={handleError}
          {...props}
        />
      )}
    </div>
  );
};

export default LazyLoadImage;