/**
 * Улучшенный Service Worker для салона красоты Natali Secrets
 * Поддерживает PWA, оффлайн-режим, предварительное кэширование и стратегии кэширования.
 * Версия: 2.0
 */

// Версия кэша, изменяйте при обновлении контента
const CACHE_NAME = 'natali-secrets-v2';

// Статические ресурсы для предварительного кэширования
const STATIC_CACHE = `${CACHE_NAME}-static`;
// Изображения и медиафайлы
const IMAGES_CACHE = `${CACHE_NAME}-images`;
// API и динамический контент
const API_CACHE = `${CACHE_NAME}-api`;

// Основные ресурсы для работы оффлайн
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/robots.txt',
  '/sitemap.xml',
  // Пути к основным JS и CSS будут добавляться динамически
];

// Ресурсы, которые можно кэшировать при использовании
const CACHEABLE_ASSET_REGEXPS = [
  /\.(js|css)$/,      // JS и CSS файлы
  /\.(png|jpg|jpeg|svg|webp|gif|ico)$/, // Изображения
  /^https:\/\/fonts\.(googleapis|gstatic)\.com/ // Google Fonts
];

// Максимальное время кэширования для разных типов контента (в миллисекундах)
const CACHE_EXPIRATION = {
  static: 30 * 24 * 60 * 60 * 1000, // 30 дней для статических ресурсов
  images: 7 * 24 * 60 * 60 * 1000,  // 7 дней для изображений
  api: 24 * 60 * 60 * 1000          // 1 день для API данных
};

// Установка Service Worker и предварительное кэширование важных ресурсов
self.addEventListener('install', event => {
  console.log('[Service Worker] Installing new service worker...');
  
  // Принудительная активация нового SW без ожидания закрытия вкладок
  self.skipWaiting();
  
  event.waitUntil(
    // Кэшируем основные статические ресурсы
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('[Service Worker] Precaching core assets');
        return cache.addAll(CORE_ASSETS);
      })
      .catch(error => {
        console.error('[Service Worker] Precaching failed:', error);
      })
  );
});

// Активация нового Service Worker и очистка старых кэшей
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activating new service worker...');
  
  // Захват клиентов без перезагрузки страницы
  event.waitUntil(clients.claim());
  
  // Удаление старых версий кэша
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // Проверяем, содержит ли имя кэша наш префикс, но не является текущей версией
          if (cacheName.startsWith('natali-secrets-') && 
              ![STATIC_CACHE, IMAGES_CACHE, API_CACHE].includes(cacheName)) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
          return null;
        }).filter(promise => promise !== null)
      );
    })
  );
});

// Обработка запросов с разными стратегиями кэширования
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  
  // Пропускаем не GET запросы
  if (request.method !== 'GET') return;
  
  // Разные стратегии для разных типов ресурсов
  
  // 1. Для навигации (HTML) - Network First с Fallback на Cache
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Клонируем ответ, так как он может быть использован только один раз
          const responseClone = response.clone();
          caches.open(STATIC_CACHE)
            .then(cache => {
              cache.put(request, responseClone);
            });
          return response;
        })
        .catch(() => {
          console.log('[Service Worker] Fetching offline page from cache');
          return caches.match(request)
            .then(cachedResponse => {
              // Если есть кэшированный ответ, возвращаем его
              if (cachedResponse) {
                return cachedResponse;
              }
              // Иначе показываем fallback страницу
              return caches.match('/');
            });
        })
    );
    return;
  }
  
  // 2. Для изображений - Cache First с Network Fallback
  if (request.destination === 'image' || /\.(png|jpg|jpeg|svg|webp|gif|ico)$/.test(url.pathname)) {
    event.respondWith(
      caches.match(request)
        .then(cachedResponse => {
          if (cachedResponse) {
            // Проверяем время кэширования
            const cachedTime = cachedResponse.headers.get('sw-cache-time');
            if (cachedTime && Date.now() - parseInt(cachedTime) < CACHE_EXPIRATION.images) {
              return cachedResponse;
            }
          }
          
          // Если нет в кэше или кэш устарел - идем в сеть
          return fetch(request)
            .then(networkResponse => {
              // Кэшируем новые данные
              const responseClone = networkResponse.clone();
              
              caches.open(IMAGES_CACHE)
                .then(cache => {
                  // Добавляем метку времени для контроля устаревания
                  const responseToCache = responseClone.clone();
                  const headers = new Headers(responseToCache.headers);
                  headers.append('sw-cache-time', Date.now().toString());
                  
                  const responseWithTime = new Response(responseToCache.body, {
                    status: responseToCache.status,
                    statusText: responseToCache.statusText,
                    headers: headers
                  });
                  
                  cache.put(request, responseWithTime);
                });
              
              return networkResponse;
            })
            .catch(() => {
              // Если сеть недоступна, возвращаем кэш (если есть)
              if (cachedResponse) {
                return cachedResponse;
              }
              
              // Или возвращаем плейсхолдер для изображения
              // Это можно улучшить, создав SVG плейсхолдер прямо здесь
              return new Response('Image not available', { status: 404 });
            });
        })
    );
    return;
  }
  
  // 3. Для остальных ресурсов - Stale-While-Revalidate (возвращаем кэш, но обновляем его в фоне)
  if (CACHEABLE_ASSET_REGEXPS.some(pattern => pattern.test(url.href))) {
    event.respondWith(
      caches.match(request)
        .then(cachedResponse => {
          // Создаем обещание для обновления кэша
          const fetchPromise = fetch(request)
            .then(networkResponse => {
              // Не кэшируем ошибки, только успешные ответы
              if (!networkResponse || networkResponse.status !== 200) {
                return networkResponse;
              }
              
              const responseClone = networkResponse.clone();
              const cacheKey = url.pathname.endsWith('.js') || url.pathname.endsWith('.css') 
                ? STATIC_CACHE : IMAGES_CACHE;
                
              caches.open(cacheKey)
                .then(cache => {
                  cache.put(request, responseClone);
                });
              
              return networkResponse;
            })
            .catch(error => {
              console.error('[Service Worker] Fetch failed:', error);
            });
          
          // Возвращаем кэшированный ответ, или ожидаем ответ от сети
          return cachedResponse || fetchPromise;
        })
    );
    return;
  }
  
  // 4. Для API запросов - Network First, затем кэш с ограниченным временем жизни
  if (url.pathname.startsWith('/api')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Кэшируем успешные API ответы
          if (response.ok) {
            const responseClone = response.clone();
            
            caches.open(API_CACHE)
              .then(cache => {
                const headers = new Headers(responseClone.headers);
                headers.append('sw-cache-time', Date.now().toString());
                
                const responseWithTime = new Response(responseClone.body, {
                  status: responseClone.status,
                  statusText: responseClone.statusText,
                  headers: headers
                });
                
                cache.put(request, responseWithTime);
              });
          }
          
          return response;
        })
        .catch(() => {
          // При отсутствии сети - пробуем получить из кэша
          return caches.match(request)
            .then(cachedResponse => {
              if (!cachedResponse) {
                return new Response(JSON.stringify({ 
                  error: 'Network error',
                  message: 'No internet connection' 
                }), {
                  status: 503,
                  headers: { 'Content-Type': 'application/json' }
                });
              }
              
              // Проверяем возраст кэшированных API данных
              const cachedTime = cachedResponse.headers.get('sw-cache-time');
              if (cachedTime && Date.now() - parseInt(cachedTime) > CACHE_EXPIRATION.api) {
                // Данные устарели, добавляем предупреждение
                const oldData = cachedResponse.clone();
                return oldData.json()
                  .then(data => {
                    data._cached = true;
                    data._cachedAt = new Date(parseInt(cachedTime)).toISOString();
                    
                    return new Response(JSON.stringify(data), {
                      status: 200,
                      headers: { 'Content-Type': 'application/json' }
                    });
                  })
                  .catch(() => cachedResponse); // Возвращаем оригинальный ответ при ошибке
              }
              
              // Возвращаем свежий кэшированный ответ
              return cachedResponse;
            });
        })
    );
    return;
  }
  
  // Для всех остальных запросов - стандартная стратегия сеть, затем кэш
  event.respondWith(
    fetch(request)
      .catch(() => {
        return caches.match(request);
      })
  );
});

// Периодическая проверка и очистка устаревших элементов кэша
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'CLEAN_CACHES') {
    console.log('[Service Worker] Starting cache cleanup...');
    
    // Объединяем все проверки в одну операцию
    Promise.all([
      cleanExpiredCache(IMAGES_CACHE, CACHE_EXPIRATION.images),
      cleanExpiredCache(API_CACHE, CACHE_EXPIRATION.api)
    ])
    .then(() => {
      console.log('[Service Worker] Cache cleanup complete');
      if (event.source) {
        event.source.postMessage({
          type: 'CACHE_CLEANED',
          timestamp: Date.now()
        });
      }
    })
    .catch(error => {
      console.error('[Service Worker] Cache cleanup failed:', error);
    });
  }
});

// Функция для очистки устаревших элементов кэша
function cleanExpiredCache(cacheName, maxAge) {
  return caches.open(cacheName)
    .then(cache => {
      return cache.keys()
        .then(requests => {
          const now = Date.now();
          
          return Promise.all(
            requests.map(request => {
              return cache.match(request)
                .then(response => {
                  if (!response) return;
                  
                  const cachedTime = response.headers.get('sw-cache-time');
                  if (cachedTime && (now - parseInt(cachedTime) > maxAge)) {
                    console.log(`[Service Worker] Removing expired from ${cacheName}:`, request.url);
                    return cache.delete(request);
                  }
                });
            })
          );
        });
    });
}

// Функция для запуска предварительного кэширования путей, используемых пользователем
function precacheUrls(urls) {
  caches.open(STATIC_CACHE)
    .then(cache => {
      return cache.addAll(urls.filter(url => !url.includes('chrome-extension')));
    })
    .catch(error => {
      console.error('[Service Worker] Dynamic precaching failed:', error);
    });
}

// При активации, отправляем сообщение о готовности
self.addEventListener('activate', event => {
  clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage({
        type: 'SW_ACTIVATED',
        timestamp: Date.now()
      });
    });
  });
});