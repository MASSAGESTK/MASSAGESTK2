import { useEffect, useCallback } from "react";
import { useLocation } from "wouter";

/**
 * Кастомный хук для безопасной навигации с сохранением состояния в sessionStorage
 */
export function useSafeNavigate() {
  const [, navigate] = useLocation();
  
  /**
   * Безопасная навигация с сохранением данных
   * @param path Путь для навигации
   * @param data Объект с данными для сохранения в sessionStorage
   */
  const navigateWithData = useCallback((path: string, data?: Record<string, any>) => {
    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        try {
          sessionStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
        } catch (error) {
          console.error(`Ошибка при сохранении данных в sessionStorage (ключ: ${key}):`, error);
        }
      });
    }
    
    navigate(path);
  }, [navigate]);
  
  /**
   * Очистка параметров сессии при монтировании компонента
   * @param keys Массив ключей для очистки из sessionStorage
   */
  const clearSessionParams = useCallback((keys: string[]) => {
    keys.forEach(key => {
      try {
        sessionStorage.removeItem(key);
      } catch (error) {
        console.error(`Ошибка при удалении данных из sessionStorage (ключ: ${key}):`, error);
      }
    });
  }, []);
  
  return { navigateWithData, clearSessionParams };
}