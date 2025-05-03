import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Компонент для перехвата и обработки ошибок в дереве компонентов
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Обновляем состояние, чтобы показать запасной UI при следующем рендере
    return { 
      hasError: true, 
      error, 
      errorInfo: null 
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Можно логировать ошибку в сервис аналитики
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({ errorInfo });
  }

  // Метод для сброса состояния ошибки и повторной попытки рендеринга
  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Если есть кастомный fallback, используем его
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      // Стандартный UI для отображения ошибки
      return (
        <div className="flex flex-col items-center justify-center p-6 min-h-[300px] border rounded-lg bg-background shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Что-то пошло не так</h2>
          <p className="text-muted-foreground text-sm mb-4 text-center">
            Произошла ошибка при загрузке этого компонента.
          </p>
          <Button onClick={this.handleReset} variant="outline">
            Попробовать снова
          </Button>
          
          {/* В режиме разработки показываем детали ошибки */}
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <div className="mt-4 p-4 bg-muted/50 rounded text-xs overflow-auto max-w-full max-h-[200px]">
              <details>
                <summary className="cursor-pointer font-medium">Детали ошибки</summary>
                <pre className="mt-2">{this.state.error.toString()}</pre>
                {this.state.errorInfo && (
                  <pre className="mt-2">{this.state.errorInfo.componentStack}</pre>
                )}
              </details>
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;