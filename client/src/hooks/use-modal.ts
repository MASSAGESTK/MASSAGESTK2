import { useState, useCallback } from "react";

/**
 * Кастомный хук для управления модальными окнами
 * @param initialState Начальное состояние данных модального окна
 */
export function useModal<T>(initialState?: T) {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<T | undefined>(initialState);
  
  // Открытие модального окна с опциональными данными
  const open = useCallback((newData?: T) => {
    if (newData) setData(newData);
    setIsOpen(true);
  }, []);
  
  // Закрытие модального окна
  const close = useCallback(() => {
    setIsOpen(false);
  }, []);
  
  return { isOpen, data, open, close };
}