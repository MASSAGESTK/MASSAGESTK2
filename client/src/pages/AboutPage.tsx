import { imageUrls } from "@/lib/utils";
import socialLinks from "@/lib/socialLinks";
import { SiVk, SiTelegram, SiInstagram } from "react-icons/si";

const AboutPage = () => {
  return (
    <div className="p-4 md:p-8">
      <h1 className="text-xl font-semibold mb-6">О нас</h1>
      
      <div className="bg-card text-card-foreground rounded-lg shadow-lg hover:shadow-xl dark:shadow-white/10 overflow-hidden mb-6 transition-all duration-200 transform hover:-translate-y-1">
        <img 
          src={imageUrls.salonInterior[0]} 
          alt="Интерьер салона Natali Secrets" 
          className="w-full h-56 object-cover shadow-sm"
        />
        <div className="p-4">
          <h2 className="font-medium text-lg mb-2">Natali Secrets</h2>
          <p className="text-sm text-muted-foreground">
            Салон красоты Natali Secrets – это место, где каждый клиент получает индивидуальный подход и высококачественные услуги. 
            Мы специализируемся на косметологии, массаже и коррекции фигуры, используя профессиональные продукты и современное оборудование.
          </p>
        </div>
      </div>
      
      <div className="bg-card text-card-foreground rounded-lg shadow-lg hover:shadow-xl dark:shadow-white/10 overflow-hidden mb-6 transition-all duration-200 transform hover:-translate-y-1">
        <div className="p-4">
          <h2 className="font-medium text-lg mb-3">Наши контакты</h2>
          <div className="space-y-3">
            <div className="flex">
              <span className="material-icons text-primary mr-3 drop-shadow-sm">location_on</span>
              <p className="text-sm">г. Сыктывкар, ул. Морозова, д. 3 каб.325</p>
            </div>
            <div className="flex">
              <span className="material-icons text-primary mr-3 drop-shadow-sm">phone</span>
              <p className="text-sm">+7 (950) 565-64-44</p>
            </div>
            <div className="flex">
              <span className="material-icons text-primary mr-3 drop-shadow-sm">email</span>
              <p className="text-sm">info@natalisecrets.ru</p>
            </div>
            <div className="flex">
              <span className="material-icons text-primary mr-3 drop-shadow-sm">schedule</span>
              <p className="text-sm">Пн-Вс: 10:00 - 18:00</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-card text-card-foreground rounded-lg shadow-lg hover:shadow-xl dark:shadow-white/10 overflow-hidden transition-all duration-200 transform hover:-translate-y-1">
        <div className="p-4">
          <h2 className="font-medium text-lg mb-2">Наше расположение</h2>
          <div className="h-56 bg-muted rounded-lg overflow-hidden flex items-center justify-center shadow-inner">
            <span className="material-icons text-muted-foreground text-4xl drop-shadow-sm">map</span>
          </div>
        </div>
      </div>
      
      <div className="bg-card text-card-foreground rounded-lg shadow-lg hover:shadow-xl dark:shadow-white/10 overflow-hidden mt-6 transition-all duration-200 transform hover:-translate-y-1">
        <div className="p-4">
          <h2 className="font-medium text-lg mb-2">Социальные сети</h2>
          <div className="flex space-x-6 mt-3">
            <a 
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary text-xl hover:text-primary/80 hover:drop-shadow-md transition-all"
              aria-label="Instagram"
            >
              <SiInstagram size={24} />
            </a>
            <a 
              href={socialLinks.vkontakte}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary text-xl hover:text-primary/80 hover:drop-shadow-md transition-all"
              aria-label="ВКонтакте"
            >
              <SiVk size={24} />
            </a>
            <a 
              href={"https://t.me/" + socialLinks.telegram.replace('@', '')}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary text-xl hover:text-primary/80 hover:drop-shadow-md transition-all"
              aria-label="Telegram"
            >
              <SiTelegram size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
