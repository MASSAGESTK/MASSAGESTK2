import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { Redirect, Route } from "wouter";

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

  // Показываем индикатор загрузки пока проверяем авторизацию
  if (isLoading) {
    return (
      <Route path={path}>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-border" />
        </div>
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
  return <Route path={path} component={Component} />;
}