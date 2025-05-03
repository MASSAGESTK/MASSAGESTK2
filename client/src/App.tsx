import { Route, Switch, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState, useEffect, useMemo, lazy, Suspense } from "react";
import { ThemeProvider } from "next-themes";
import { routeSeoData } from "@/data/navigation";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";

// Базовые компоненты с обычным импортом для ключевых элементов интерфейса
import BottomNavigation from "@/components/BottomNavigation";
import ScrollToTop from "@/components/ScrollToTop";
import SEO from "@/components/SEO";
import ErrorBoundary from "@/components/ErrorBoundary";
import NotFound from "@/pages/not-found";

// Ленивая загрузка страниц с разделением кода
const HomePage = lazy(() => import("@/pages/HomePage"));
const ServicesPage = lazy(() => import("@/pages/ServicesPage"));
const PromotionsPage = lazy(() => import("@/pages/PromotionsPage"));
const SettingsPage = lazy(() => import("@/pages/SettingsPage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const MembershipsPage = lazy(() => import("@/pages/MembershipsPage"));
const AuthPage = lazy(() => import("@/pages/auth-page"));

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

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Switch>
        <Route path="/">
          {() => <HomePage setActiveTab={setActiveTab} />}
        </Route>
        <Route path="/services" component={ServicesPage} />
        <Route path="/promotions" component={PromotionsPage} />
        
        {/* Защищенные маршруты, требующие авторизации */}
        <ProtectedRoute path="/settings" component={SettingsPage} />
        <ProtectedRoute path="/memberships" component={MembershipsPage} />
        
        {/* Публичные маршруты */}
        <Route path="/about" component={AboutPage} />
        <Route path="/auth" component={AuthPage} />
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
      <AuthProvider>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
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
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
