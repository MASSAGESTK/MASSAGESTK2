import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface SplashScreenProps {
  onFinished: () => void;
}

const SplashScreen = ({ onFinished }: SplashScreenProps) => {
  const [show, setShow] = useState(true);
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    // Запускаем анимацию через небольшую задержку
    const animationTimer = setTimeout(() => {
      setAnimate(true);
    }, 500);
    
    // Через 2.5 секунды скрываем заставку
    const hideTimer = setTimeout(() => {
      setShow(false);
      onFinished();
    }, 2500);
    
    // Очистка таймеров при размонтировании
    return () => {
      clearTimeout(animationTimer);
      clearTimeout(hideTimer);
    };
  }, [onFinished]);
  
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
      <div className={`transform transition-all duration-1000 ${animate ? 'scale-75 opacity-0' : 'scale-100 opacity-100'}`}>
        <Button 
          className="w-20 h-20 rounded-full shadow-xl overflow-hidden p-0 border-4 border-primary/20"
          onClick={() => {
            setAnimate(true);
            setTimeout(() => {
              setShow(false);
              onFinished();
            }, 500);
          }}
        >
          <div className="relative w-full h-full bg-[#444444] flex items-center justify-center">
            <svg width="70%" height="70%" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(70, 70) scale(0.9)">
                {/* Белая буква N */}
                <path d="M50 50 L50 320 L110 320 L110 170 L200 320 L260 320 L260 50 L200 50 L200 200 L110 50 Z" fill="white"/>
                {/* Розовая буква S */}
                <path d="M280 100 Q280 50 330 50 L430 50 Q480 50 480 100 L480 140 Q480 180 430 180 L330 180 Q310 180 310 200 L310 240 Q310 260 330 260 L430 260 Q450 260 450 240 L450 230 L380 230 L380 260 L430 260 Q480 260 480 310 L480 350 Q480 400 430 400 L330 400 Q280 400 280 350 L280 310 L330 310 L330 350 Q330 370 350 370 L410 370 Q430 370 430 350 L430 310 Q430 290 410 290 L330 290 Q280 290 280 240 L280 200 Q280 150 330 150 L410 150 Q430 150 430 130 L430 90 Q430 70 410 70 L350 70 Q330 70 330 90 L330 100 Z" fill="#F280FF"/>
              </g>
            </svg>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default SplashScreen;