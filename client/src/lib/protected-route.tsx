import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { Redirect, Route } from "wouter";
import { FC, ComponentType, Suspense, LazyExoticComponent } from "react";

/**
 * Компонент защищенного маршрута
 * Перенаправляет на страницу авторизации если пользователь не аутентифицирован
 * 
 * @param path Путь маршрута
 * @param component Компонент для отображения
 */
export function ProtectedRoute({
  path,
  component: Component,
}: {
  path: string;
  component: () => JSX.Element;
}) {
  const { user, isLoading } = useAuth();

  // Компонент для показа во время загрузки 
  const LoadingView = () => (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="h-8 w-8 animate-spin text-border" />
    </div>
  );

  // Показываем индикатор загрузки пока проверяем авторизацию
  if (isLoading) {
    return (
      <Route path={path}>
        <LoadingView />
      </Route>
    );
  }

  // Перенаправляем на страницу авторизации если пользователь не аутентифицирован
  if (!user) {
    return (
      <Route path={path}>
        <Redirect to="/auth" />
      </Route>
    );
  }

  // Если пользователь аутентифицирован, показываем запрошенный компонент
  return (
    <Route path={path}>
      <Suspense fallback={<LoadingView />}>
        <Component />
      </Suspense>
    </Route>
  );
}