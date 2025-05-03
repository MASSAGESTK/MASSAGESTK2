import { useCallback, useMemo } from "react";
import { serviceDetailsMap, allServices } from "@/data/services";
import { ServiceDetails } from "@/components/ServiceModal";

type ServiceCategory = "all" | "complex" | "cosmetology" | "massage" | "bodyCorrection" | "men";

/**
 * Кастомный хук для работы с данными услуг
 */
export function useServices() {
  /**
   * Получение услуг по категории
   */
  const getServicesByCategory = useCallback((category: ServiceCategory) => {
    if (category === "all") {
      return allServices;
    }
    
    return allServices.filter(service => service.category === category);
  }, []);
  
  /**
   * Получение детальной информации об услуге по ID
   */
  const getServiceDetails = useCallback((id: number): ServiceDetails | null => {
    return serviceDetailsMap[id] || null;
  }, []);
  
  /**
   * Поиск услуг по ключевому слову
   */
  const searchServices = useCallback((searchTerm: string) => {
    if (!searchTerm.trim()) return allServices;
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    
    return allServices.filter(service => 
      service.name.toLowerCase().includes(lowerSearchTerm) || 
      service.price.toLowerCase().includes(lowerSearchTerm)
    );
  }, []);
  
  /**
   * Получение популярных услуг
   */
  const getPopularServices = useMemo(() => {
    return allServices.filter(service => {
      const details = serviceDetailsMap[service.id];
      return details && details.effects && details.effects.length > 0;
    }).slice(0, 5);
  }, []);
  
  return {
    allServices,
    getServicesByCategory,
    getServiceDetails,
    searchServices,
    getPopularServices
  };
}