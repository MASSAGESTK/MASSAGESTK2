import { Route, Switch, useLocation, useRouter } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState, useEffect, useMemo, lazy, Suspense } from "react";
import { routeSeoData } from "@/data/navigation";

// Для поддержки базового пути GitHub Pages
const BASE_PATH = process.env.NODE_ENV === 'production' 
  ? (window.location.pathname.startsWith('/')
     ? window.location.pathname.split('/')[1] : '')
  : '';

// Базовые компоненты с обычным импортом для ключевых элементов интерфейса
import BottomNavigation from "@/components/BottomNavigation";
import ScrollToTop from "@/components/ScrollToTop";
import { SEO } from "@/components/SEO";
import ErrorBoundary from "@/components/ErrorBoundary";
import NotFound from "@/pages/not-found";

// Ленивая загрузка страниц с разделением кода
const HomePage = lazy(() => import("@/pages/HomePage"));
const ServicesPage = lazy(() => import("@/pages/ServicesPage"));
const PromotionsPage = lazy(() => import("@/pages/PromotionsPage"));
const SettingsPage = lazy(() => import("@/pages/SettingsPage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const MembershipsPage = lazy(() => import("@/pages/MembershipsPage"));

function Router({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  // Компонент для показа во время загрузки страниц
  const LoadingFallback = () => (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="rounded-full bg-gray-200 dark:bg-gray-700 h-12 w-12"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
      </div>
    </div>
  );

  // Настраиваем маршрутизатор для корректной работы на GitHub Pages
  useEffect(() => {
    // Вспомогательная функция для обработки редиректов с GitHub Pages
    const handleGitHubPagesRedirect = () => {
      const { search } = window.location;
      if (search && search.includes('?/')) {
        const path = search.split('?/')[1].split('?')[0];
        window.history.replaceState(null, '', '/' + (BASE_PATH ? BASE_PATH + '/' : '') + path);
      }
    };

    handleGitHubPagesRedirect();
  }, []);

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Switch>
        <Route path="/">
          {() => <HomePage setActiveTab={setActiveTab} />}
        </Route>
        <Route path="/services" component={ServicesPage} />
        <Route path="/promotions" component={PromotionsPage} />
        
        {/* Страницы настроек */}
        <Route path="/settings" component={SettingsPage} />
        <Route path="/memberships" component={MembershipsPage} />
        
        {/* Публичные маршруты */}
        <Route path="/about" component={AboutPage} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [location] = useLocation();
  
  // Получаем SEO данные для текущего маршрута или используем данные по умолчанию
  const seoData = routeSeoData[location as keyof typeof routeSeoData] || {
    title: "Natali Secrets - Профессиональный салон красоты",
    description: "Профессиональный салон красоты Natali Secrets предлагает услуги косметологии, массажа и спа-процедур.",
    schemaType: "WebPage"
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* SEO компонент для управления мета-тегами */}
        <SEO 
          title={seoData.title}
          description={seoData.description}
          schemaType={seoData.schemaType}
        />
        
        {/* Компонент для прокрутки страницы вверх при переходе между маршрутами */}
        <ScrollToTop />
        
        {/* Оборачиваем всё приложение в ErrorBoundary для обработки ошибок */}
        <ErrorBoundary>
          <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <main className="pt-0 pb-28"> {/* Убран большой отступ сверху, добавлен небольшой */}
              <div className="max-w-6xl mx-auto"> {/* Контейнер с максимальной шириной для больших экранов */}
                <Router setActiveTab={setActiveTab} />
              </div>
            </main>
            <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        </ErrorBoundary>
        
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
