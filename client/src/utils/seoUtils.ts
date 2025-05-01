/**
 * Утилиты для улучшения SEO и производительности
 */

// Типы для структурированных данных Schema.org
export interface ServiceSchemaData {
  name: string;
  description: string;
  price: string;
  image?: string;
  category?: string;
}

export interface BusinessSchemaData {
  name: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
    addressCountry: string;
  };
  telephone: string;
  openingHours?: string[];
  image?: string;
  priceRange?: string;
}

/**
 * Генерирует структурированные данные Schema.org для услуги
 */
export function generateServiceSchema(serviceData: ServiceSchemaData): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceData.name,
    description: serviceData.description,
    provider: {
      '@type': 'BeautySalon',
      name: 'Natali Secrets',
    },
    offers: {
      '@type': 'Offer',
      price: serviceData.price.replace(/[^0-9]/g, ''),
      priceCurrency: 'RUB',
    },
    image: serviceData.image || '/icons/og-image.jpg',
    serviceType: serviceData.category || 'Beauty Service',
  };

  return JSON.stringify(schema);
}

/**
 * Генерирует структурированные данные Schema.org для организации
 */
export function generateBusinessSchema(businessData: BusinessSchemaData): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    name: businessData.name,
    address: {
      '@type': 'PostalAddress',
      ...businessData.address,
    },
    telephone: businessData.telephone,
    openingHours: businessData.openingHours || ['Mo-Su 10:00-20:00'],
    image: businessData.image || '/icons/og-image.jpg',
    priceRange: businessData.priceRange || '₽₽',
  };

  return JSON.stringify(schema);
}

/**
 * Генерирует структурированные данные Schema.org для хлебных крошек
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]): string {
  const itemListElement = items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `https://natali-secrets.ru${item.url}`,
  }));

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  };

  return JSON.stringify(schema);
}

/**
 * Измеряет и логирует метрики Web Vitals для мониторинга производительности
 */
export function measureWebVitals(): void {
  if (typeof window !== 'undefined' && 'performance' in window) {
    // Первая отрисовка контента (FCP)
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.name === 'first-contentful-paint') {
          console.log(`FCP: ${entry.startTime.toFixed(2)}ms`);
        }
      });
    });
    
    try {
      observer.observe({ type: 'paint', buffered: true });
    } catch (e) {
      console.warn('Performance Observer not supported');
    }

    // Крупнейшая отрисовка контента (LCP)
    if ('PerformanceObserver' in window) {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log(`LCP: ${lastEntry.startTime.toFixed(2)}ms`);
      });
      
      try {
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
      } catch (e) {
        console.warn('LCP Performance Observer not supported');
      }
    }
    
    // Задержка ввода (FID) - измеряет интерактивность
    if ('PerformanceObserver' in window) {
      const fidObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          // Приведение типа к PerformanceEventTiming, который имеет processingStart
          if (entry.entryType === 'first-input') {
            const fidEntry = entry as unknown as {processingStart: number, startTime: number};
            const delay = fidEntry.processingStart - fidEntry.startTime;
            console.log(`FID: ${delay.toFixed(2)}ms`);
          }
        });
      });
      
      try {
        fidObserver.observe({ type: 'first-input', buffered: true });
      } catch (e) {
        console.warn('FID Performance Observer not supported');
      }
    }
  }
}

/**
 * Предварительно загружает критически важные ресурсы для улучшения производительности
 */
export function preloadCriticalResources(resources: string[]): void {
  if (typeof document !== 'undefined') {
    resources.forEach((resource) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource;
      
      // Определяем тип ресурса по расширению
      if (resource.endsWith('.js')) {
        link.as = 'script';
      } else if (resource.endsWith('.css')) {
        link.as = 'style';
      } else if (/\.(jpe?g|png|gif|svg|webp)$/i.test(resource)) {
        link.as = 'image';
      } else if (resource.includes('fonts.googleapis.com')) {
        link.as = 'font';
        link.crossOrigin = 'anonymous';
      }
      
      document.head.appendChild(link);
    });
  }
}

/**
 * Запускает проверку Service Worker на наличие обновлений и чистку кэша
 */
export function triggerServiceWorkerUpdate(): void {
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: 'CLEAN_CACHES',
      timestamp: Date.now()
    });
  }
}

// Экспорт утилит для SEO по умолчанию
export default {
  generateServiceSchema,
  generateBusinessSchema,
  generateBreadcrumbSchema,
  measureWebVitals,
  preloadCriticalResources,
  triggerServiceWorkerUpdate,
};