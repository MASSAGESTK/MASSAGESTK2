import { Route, Switch } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState } from "react";
import { ThemeProvider } from "next-themes";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/HomePage";
import ServicesPage from "@/pages/ServicesPage";
import PromotionsPage from "@/pages/PromotionsPage";
import SettingsPage from "@/pages/SettingsPage";
import AboutPage from "@/pages/AboutPage";
import BottomNavigation from "@/components/BottomNavigation";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/services" component={ServicesPage} />
      <Route path="/promotions" component={PromotionsPage} />
      <Route path="/settings" component={SettingsPage} />
      <Route path="/about" component={AboutPage} />
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
          <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <main className="pt-4 pb-28"> {/* Убран большой отступ сверху, добавлен небольшой */}
              <Router />
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
