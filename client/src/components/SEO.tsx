import { Helmet } from 'react-helmet';
import { useLocation } from 'wouter';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  schemaType?: string;
  article?: boolean;
}

/**
 * Компонент для динамического управления SEO-метаданными и структурированными данными
 */
export const SEO = ({
  title = 'Natali Secrets - Профессиональный салон красоты и спа услуг',
  description = 'Профессиональные услуги для вашей красоты: косметология, массаж, спа-процедуры, коррекция фигуры и индивидуальные программы ухода.',
  image = '/icons/og-image.jpg',
  schemaType = 'WebSite',
  article = false,
}: SEOProps) => {
  const [location] = useLocation();
  const url = `https://natali-secrets.ru${location}`;
  const canonical = url.split('?')[0]; // Удаляем GET-параметры для канонического URL

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': schemaType,
    name: title,
    description,
    url,
    image,
  };

  // Специальный объект Schema.org для бизнеса
  const businessSchema = {
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    name: 'Natali Secrets',
    image: '/icons/og-image.jpg',
    '@id': 'https://natali-secrets.ru',
    url: 'https://natali-secrets.ru',
    telephone: '+7 (999) 123-45-67',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'ул. Примерная, д. 123',
      addressLocality: 'Москва',
      postalCode: '123456',
      addressCountry: 'RU',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 55.7558,
      longitude: 37.6173,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '10:00',
        closes: '21:00',
      },
    ],
    priceRange: '₽₽',
    servesCuisine: 'Beauty Services',
    description: 'Салон красоты и спа в Москве. Профессиональные косметологические услуги, массаж, уходовые процедуры, коррекция фигуры и комплексные программы омоложения для женщин и мужчин.',
  };

  return (
    <Helmet>
      {/* Основные мета-теги */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Структурированные данные Schema.org */}
      <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      
      {/* Бизнес-данные Schema.org - только на главной странице */}
      {location === '/' && (
        <script type="application/ld+json">{JSON.stringify(businessSchema)}</script>
      )}

      {/* Данные Schema.org для услуг - только на странице услуг */}
      {location === '/services' && (
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                item: {
                  '@type': 'Service',
                  name: 'Комбинированная чистка лица',
                  description: 'Комбинированная чистка лица - это процедура глубокого очищения кожи, которая сочетает в себе механическое удаление загрязнений и использование специальных средств для более эффективного результата.',
                  provider: {
                    '@type': 'BeautySalon',
                    name: 'Natali Secrets',
                    '@id': 'https://natali-secrets.ru',
                  },
                  offers: {
                    '@type': 'Offer',
                    price: '2700',
                    priceCurrency: 'RUB',
                  },
                  url: 'https://natali-secrets.ru/services',
                },
              },
              {
                '@type': 'ListItem',
                position: 2,
                item: {
                  '@type': 'Service',
                  name: 'Антицеллюлитный массаж',
                  description: 'Интенсивный массаж, направленный на разбивание жировых отложений и улучшение кровообращения в проблемных зонах.',
                  provider: {
                    '@type': 'BeautySalon',
                    name: 'Natali Secrets',
                    '@id': 'https://natali-secrets.ru',
                  },
                  offers: {
                    '@type': 'Offer',
                    price: '1200',
                    priceCurrency: 'RUB',
                  },
                  url: 'https://natali-secrets.ru/services',
                },
              },
              {
                '@type': 'ListItem',
                position: 3,
                item: {
                  '@type': 'Service',
                  name: 'Спа массаж',
                  description: 'Расслабляющий массаж с использованием ароматических масел для полного расслабления тела и разума.',
                  provider: {
                    '@type': 'BeautySalon',
                    name: 'Natali Secrets',
                    '@id': 'https://natali-secrets.ru',
                  },
                  offers: {
                    '@type': 'Offer',
                    price: '2000',
                    priceCurrency: 'RUB',
                  },
                  url: 'https://natali-secrets.ru/services',
                },
              },
            ],
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;