import { Route, Switch, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState, useEffect } from "react";
import { ThemeProvider } from "next-themes";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/HomePage";
import ServicesPage from "@/pages/ServicesPage";
import PromotionsPage from "@/pages/PromotionsPage";
import SettingsPage from "@/pages/SettingsPage";
import AboutPage from "@/pages/AboutPage";
import MembershipsPage from "@/pages/MembershipsPage";
import BottomNavigation from "@/components/BottomNavigation";
import ScrollToTop from "@/components/ScrollToTop";
import SEO from "@/components/SEO";
import SplashScreen from "@/components/SplashScreen";

// Карта заголовков и описаний для разных маршрутов (для SEO)
const routeSeoData = {
  "/": {
    title: "Natali Secrets - Профессиональный салон красоты и спа услуг",
    description: "Салон красоты Natali Secrets предлагает широкий спектр услуг: косметология, массаж, спа-процедуры, коррекция фигуры и индивидуальные программы ухода.",
    schemaType: "WebSite"
  },
  "/services": {
    title: "Услуги салона красоты Natali Secrets - косметология, массаж, спа",
    description: "Полный список услуг салона красоты Natali Secrets: косметология, массаж, спа-процедуры, коррекция фигуры. Профессиональный подход и современные технологии.",
    schemaType: "Service"
  },
  "/promotions": {
    title: "Акции и специальные предложения - Natali Secrets",
    description: "Выгодные акции и специальные предложения салона красоты Natali Secrets. Скидки на услуги, подарочные сертификаты и комплексные программы.",
    schemaType: "SpecialOffer"
  },
  "/memberships": {
    title: "Абонементы на услуги салона красоты - Natali Secrets",
    description: "Абонементы на услуги салона красоты Natali Secrets. Выгодные комплексные программы для поддержания красоты и здоровья.",
    schemaType: "Product"
  },
  "/about": {
    title: "О нас - Natali Secrets салон красоты и спа",
    description: "О салоне красоты Natali Secrets. Наша история, ценности и команда профессионалов. Современное оборудование и высококачественные материалы.",
    schemaType: "AboutPage"
  }
};

function Router({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  return (
    <Switch>
      <Route path="/">
        {() => <HomePage setActiveTab={setActiveTab} />}
      </Route>
      <Route path="/services" component={ServicesPage} />
      <Route path="/promotions" component={PromotionsPage} />
      <Route path="/settings" component={SettingsPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/memberships" component={MembershipsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [location] = useLocation();
  const [showSplash, setShowSplash] = useState(true);
  
  // Получаем SEO данные для текущего маршрута или используем данные по умолчанию
  const seoData = routeSeoData[location as keyof typeof routeSeoData] || {
    title: "Natali Secrets - Профессиональный салон красоты",
    description: "Профессиональный салон красоты Natali Secrets предлагает услуги косметологии, массажа и спа-процедур.",
    schemaType: "WebPage"
  };

  return (
    <QueryClientProvider client={queryClient}>
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
          
          {/* Показываем заставку при загрузке приложения */}
          {showSplash && <SplashScreen onFinished={() => setShowSplash(false)} />}
          
          <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <main className="pt-0 pb-28"> {/* Убран большой отступ сверху, добавлен небольшой */}
              <div className="max-w-6xl mx-auto"> {/* Контейнер с максимальной шириной для больших экранов */}
                <Router setActiveTab={setActiveTab} />
              </div>
            </main>
            <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
