import { Helmet } from "react-helmet";

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
  title = "Natali Secrets - Салон красоты и спа в Сыктывкаре",
  description = "Эксклюзивные программы по уходу за телом и лицом в уютном спа-салоне Натали Сикретс в Сыктывкаре. Профессиональные косметические процедуры, массаж, коррекция фигуры для всех возрастов от 14 до 80 лет.",
  image = "/icons/og-image.jpg",
  schemaType = "WebSite",
  article = false,
}: SEOProps) => {
  // Полный URL для изображения Open Graph
  const siteUrl = "https://natali-secrets.ru";
  const ogImage = `${siteUrl}${image}`;
  
  // Информация о местоположении для локального SEO
  const locationInfo = {
    city: "Сыктывкар",
    region: "Республика Коми",
    postalCode: "167000",
    address: "ул. Первомайская, 115" // Примерный адрес, замените на реальный
  };
  
  return (
    <Helmet>
      {/* Основные мета-теги */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="салон красоты Сыктывкар, спа Сыктывкар, косметология Сыктывкар, массаж Сыктывкар, коррекция фигуры Сыктывкар, Natali Secrets, красота и здоровье, уход за лицом и телом, эпиляция, антивозрастные процедуры" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="theme-color" content="#4A0D67" />
      <meta name="geo.region" content="RU-KO" />
      <meta name="geo.placename" content="Сыктывкар" />
      <meta name="geo.position" content="61.668793;50.836399" />
      <meta name="ICBM" content="61.668793, 50.836399" />
      
      {/* Канонический URL */}
      <link rel="canonical" href={siteUrl} />
      
      {/* Open Graph разметка */}
      <meta property="og:site_name" content="Natali Secrets" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:locale" content="ru_RU" />
      
      {/* Twitter разметка */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Базовая JSON-LD разметка Schema.org с локальным бизнесом */}
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "${schemaType === 'WebSite' ? 'WebSite' : schemaType}",
            "name": "Natali Secrets",
            "url": "${siteUrl}",
            "description": "${description}",
            "image": "${ogImage}"
          }
        `}
      </script>
      
      {/* Локальный бизнес для лучшего ранжирования в Сыктывкаре */}
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "BeautySalon",
            "name": "Natali Secrets",
            "url": "${siteUrl}",
            "image": "${ogImage}",
            "description": "${description}",
            "telephone": "+7 (8212) 12-34-56",
            "priceRange": "₽₽",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "${locationInfo.address}",
              "addressLocality": "${locationInfo.city}",
              "addressRegion": "${locationInfo.region}",
              "postalCode": "${locationInfo.postalCode}",
              "addressCountry": "RU"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "61.668793",
              "longitude": "50.836399"
            },
            "areaServed": [
              {
                "@type": "City",
                "name": "Сыктывкар"
              },
              {
                "@type": "AdministrativeArea",
                "name": "Эжвинский район"
              },
              {
                "@type": "AdministrativeArea",
                "name": "Сыктывдинский район"
              }
            ],
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "10:00",
                "closes": "20:00"
              },
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Saturday", "Sunday"],
                "opens": "11:00",
                "closes": "19:00"
              }
            ],
            "audience": {
              "@type": "PeopleAudience",
              "suggestedMinAge": "14",
              "suggestedMaxAge": "80"
            }
          }
        `}
      </script>
      
      {/* Preload критически важных ресурсов */}
      <link rel="preload" href="/fonts/main-font.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
    </Helmet>
  );
};

export default SEO;