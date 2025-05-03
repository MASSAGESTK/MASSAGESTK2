import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Redirect } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { SEO } from "@/components/SEO";
import { Loader2 } from "lucide-react";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<string>("login");
  
  // Данные форм
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Ошибки валидации
  const [registerError, setRegisterError] = useState<string | null>(null);
  
  // Получаем данные аутентификации
  const { user, isLoading, loginMutation, registerMutation } = useAuth();
  
  // Если пользователь авторизован, перенаправляем на главную
  if (user) {
    return <Redirect to="/" />;
  }
  
  // Обработчик входа
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({
      username: loginUsername,
      password: loginPassword,
    });
  };
  
  // Обработчик регистрации с валидацией
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Валидация
    if (registerPassword !== confirmPassword) {
      setRegisterError("Пароли не совпадают");
      return;
    }
    
    if (registerPassword.length < 6) {
      setRegisterError("Пароль должен содержать не менее 6 символов");
      return;
    }
    
    // Сбрасываем ошибку
    setRegisterError(null);
    
    // Регистрация
    registerMutation.mutate({
      username: registerUsername,
      password: registerPassword,
    });
  };
  
  return (
    <>
      <SEO 
        title="Вход в личный кабинет | Natali Secrets"
        description="Авторизация или регистрация в личном кабинете салона красоты Natali Secrets. Получите доступ к эксклюзивным акциям и персональным предложениям."
      />
      
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8">
          {/* Левая сторона - форма авторизации */}
          <div className="w-full lg:w-1/2">
            <div className="flex flex-col items-center space-y-2 text-center mb-8">
              <h1 className="text-3xl font-bold">Natali Secrets</h1>
              <p className="text-muted-foreground">Ваш личный кабинет красоты и здоровья</p>
            </div>
            
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Вход</TabsTrigger>
                <TabsTrigger value="register">Регистрация</TabsTrigger>
              </TabsList>
              
              {/* Форма входа */}
              <TabsContent value="login">
                <Card>
                  <form onSubmit={handleLogin}>
                    <CardHeader>
                      <CardTitle>Вход в личный кабинет</CardTitle>
                      <CardDescription>
                        Войдите в свой аккаунт для доступа к личному кабинету
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="login-username">Имя пользователя</Label>
                        <Input 
                          id="login-username" 
                          placeholder="Введите ваше имя пользователя" 
                          value={loginUsername}
                          onChange={(e) => setLoginUsername(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="login-password">Пароль</Label>
                        <Input 
                          id="login-password" 
                          type="password" 
                          placeholder="Введите ваш пароль" 
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          required
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={loginMutation.isPending}
                      >
                        {loginMutation.isPending ? (
                          <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Вход...</>
                        ) : (
                          "Войти"
                        )}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
              
              {/* Форма регистрации */}
              <TabsContent value="register">
                <Card>
                  <form onSubmit={handleRegister}>
                    <CardHeader>
                      <CardTitle>Создание аккаунта</CardTitle>
                      <CardDescription>
                        Создайте новый аккаунт для доступа к личному кабинету
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="register-username">Имя пользователя</Label>
                        <Input 
                          id="register-username" 
                          placeholder="Введите имя пользователя" 
                          value={registerUsername}
                          onChange={(e) => setRegisterUsername(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-password">Пароль</Label>
                        <Input 
                          id="register-password" 
                          type="password" 
                          placeholder="Создайте пароль" 
                          value={registerPassword}
                          onChange={(e) => setRegisterPassword(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Подтверждение пароля</Label>
                        <Input 
                          id="confirm-password" 
                          type="password" 
                          placeholder="Повторите пароль" 
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                      </div>
                      
                      {/* Сообщение об ошибке */}
                      {registerError && (
                        <div className="text-sm text-red-500">{registerError}</div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={registerMutation.isPending}
                      >
                        {registerMutation.isPending ? (
                          <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Регистрация...</>
                        ) : (
                          "Зарегистрироваться"
                        )}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Правая сторона - информация о преимуществах */}
          <div className="hidden lg:flex lg:w-1/2 bg-muted rounded-lg p-8 items-center justify-center">
            <div className="space-y-6 max-w-md">
              <h2 className="text-2xl font-bold">Преимущества личного кабинета</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Эксклюзивный доступ к акциям и специальным предложениям</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Удобное управление записями на услуги</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Персональные рекомендации по уходу и процедурам</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Накопительная система скидок для постоянных клиентов</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Возможность оставлять отзывы и получать бонусы</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}