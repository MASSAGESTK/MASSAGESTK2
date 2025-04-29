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

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <TooltipProvider>
          {/* Компонент для прокрутки страницы вверх при переходе между маршрутами */}
          <ScrollToTop />
          <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <main className="pt-0 pb-28"> {/* Убран большой отступ сверху, добавлен небольшой */}
              <Router setActiveTab={setActiveTab} />
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
