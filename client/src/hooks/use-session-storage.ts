import { useState, useEffect } from "react";

/**
 * Кастомный хук для работы с sessionStorage с поддержкой типизации
 * @param key Ключ для хранения в sessionStorage
 * @param initialValue Начальное значение
 */
export function useSessionStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // Инициализация состояния с проверкой существующего значения в sessionStorage
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Ошибка при чтении из sessionStorage:", error);
      return initialValue;
    }
  });
  
  // Функция для обновления значения в state и sessionStorage
  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error("Ошибка при записи в sessionStorage:", error);
    }
  };
  
  // Синхронизация с другими вкладками или компонентами при изменении значения
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.error("Ошибка при синхронизации sessionStorage:", error);
        }
      }
    };
    
    window.addEventListener("storage", handleStorageChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key]);
  
  return [storedValue, setValue];
}