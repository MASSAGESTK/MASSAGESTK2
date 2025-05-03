import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

// Функция для получения JWT-токена из localStorage
function getAuthToken(): string | null {
  return localStorage.getItem("authToken");
}

// Функция для добавления авторизационных заголовков
function getAuthHeaders(hasBody: boolean = false): Record<string, string> {
  const token = getAuthToken();
  const headers: Record<string, string> = {};
  
  // Если есть токен, добавляем заголовок авторизации
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  
  // Если передаем данные, добавляем Content-Type
  if (hasBody) {
    headers["Content-Type"] = "application/json";
  }
  
  return headers;
}

// API запрос с поддержкой авторизации
export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  // Получаем CSRF токен из куки если он есть
  const csrfToken = document.cookie
    .split("; ")
    .find(row => row.startsWith("XSRF-TOKEN="))
    ?.split("=")[1];
  
  // Формируем заголовки
  const headers = getAuthHeaders(!!data);
  
  // Добавляем CSRF токен если он есть
  if (csrfToken) {
    headers["X-XSRF-TOKEN"] = csrfToken;
  }
  
  // Выполняем запрос
  const res = await fetch(url, {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include", // Включаем куки для поддержки сессий
  });

  await throwIfResNotOk(res);
  return res;
}

// Поведение при 401 ошибках
type UnauthorizedBehavior = "returnNull" | "throw";

// Функция для выполнения запросов с поддержкой авторизации
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    // Получаем заголовки авторизации
    const headers = getAuthHeaders();
    
    // Выполняем запрос
    const res = await fetch(queryKey[0] as string, {
      headers,
      credentials: "include", // Включаем куки для поддержки сессий
    });

    // Обрабатываем неавторизованные запросы
    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
