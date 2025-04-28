import { useEffect } from 'react';
import { useLocation } from 'wouter';

/**
 * Компонент для автоматической прокрутки страницы вверх при смене маршрута
 */
export default function ScrollToTop() {
  const [location] = useLocation();

  // При изменении маршрута прокручиваем страницу вверх
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}