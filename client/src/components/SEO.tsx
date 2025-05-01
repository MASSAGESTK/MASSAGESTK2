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
  title = "Natali Secrets - Салон красоты и спа в Москве",
  description = "Эксклюзивные программы по уходу за телом и лицом в уютном спа-салоне Натали Сикретс. Профессиональные косметические процедуры, массаж, коррекция фигуры.",
  image = "/icons/og-image.jpg",
  schemaType = "WebSite",
  article = false,
}: SEOProps) => {
  // Полный URL для изображения Open Graph
  const siteUrl = "https://natali-secrets.ru";
  const ogImage = `${siteUrl}${image}`;
  
  return (
    <Helmet>
      {/* Основные мета-теги */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="theme-color" content="#4A0D67" />
      
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
      
      {/* Базовая JSON-LD разметка Schema.org */}
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "${schemaType}",
            "name": "Natali Secrets",
            "url": "${siteUrl}",
            "description": "${description}",
            "image": "${ogImage}"
          }
        `}
      </script>
      
      {/* Preload критически важных ресурсов */}
      <link rel="preload" href="/fonts/main-font.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
    </Helmet>
  );
};

export default SEO;