import { useState } from "react";
import { Button } from "@/components/ui/button";
import { imageUrls } from "@/lib/utils";
import ProgramCard from "@/components/ProgramCard";
import ProgramModal, { ProgramDetails } from "@/components/ProgramModal";

// Данные абонементов
const memberships = [
  {
    id: 101,
    title: "Базовый абонемент",
    price: "5000₽",
    features: [
      "5 любых процедур из категории 'Массаж'",
      "Скидка 10% на все дополнительные услуги",
      "Срок действия - 2 месяца",
      "Возможность переноса записи за 12 часов"
    ]
  },
  {
    id: 102,
    title: "Премиум абонемент",
    price: "9000₽",
    features: [
      "8 любых процедур из категории 'Массаж'",
      "1 комплексная SPA-программа в подарок",
      "Скидка 15% на все дополнительные услуги",
      "Срок действия - 3 месяца",
      "Возможность переноса записи за 6 часов"
    ]
  },
  {
    id: 103,
    title: "VIP-абонемент",
    price: "15000₽",
    features: [
      "10 любых процедур на выбор",
      "2 комплексные программы в подарок",
      "Скидка 20% на все дополнительные услуги",
      "Срок действия - 6 месяцев",
      "Приоритетная запись и обслуживание",
      "Бесплатная консультация косметолога"
    ]
  },
  {
    id: 104,
    title: "Абонемент 'Коррекция фигуры'",
    price: "12000₽",
    features: [
      "8 процедур антицеллюлитного массажа",
      "3 процедуры обертывания",
      "Скидка 15% на аппаратные процедуры",
      "Срок действия - 4 месяца",
      "Индивидуальные рекомендации по питанию"
    ]
  },
  {
    id: 105,
    title: "Мужской абонемент",
    price: "8000₽",
    features: [
      "5 процедур для мужчин на выбор",
      "3 спортивных массажа",
      "Скидка 15% на дополнительные услуги",
      "Срок действия - 3 месяца",
      "Приоритетная запись в вечернее время"
    ]
  },
  {
    id: 106,
    title: "Абонемент 'Здоровая спина'",
    price: "7500₽",
    features: [
      "10 массажей спины",
      "Скидка 10% на дополнительные услуги",
      "Срок действия - 4 месяца",
      "Консультация специалиста",
      "Индивидуальные рекомендации по упражнениям"
    ]
  }
];

// Полные данные об абонементах с подробностями
const membershipDetailsMap: Record<number, ProgramDetails> = {
  101: {
    id: 101,
    title: "Базовый абонемент",
    price: "5000₽",
    description: "Идеальное решение для регулярного ухода за собой. Этот абонемент подойдет тем, кто ценит комфорт и выгоду.",
    image: imageUrls.spaServices[0],
    duration: "2 месяца",
    features: [
      "5 любых процедур из категории 'Массаж'",
      "Скидка 10% на все дополнительные услуги",
      "Срок действия - 2 месяца",
      "Возможность переноса записи за 12 часов"
    ],
    sessions: "5 процедур",
    additionalInfo: [
      "Экономия до 20% по сравнению с разовыми процедурами",
      "Возможность приобретения в подарок"
    ]
  },
  102: {
    id: 102,
    title: "Премиум абонемент",
    price: "9000₽",
    description: "Расширенный набор процедур для тех, кто хочет получить максимум пользы и удовольствия от посещения нашего салона. Дополнительные привилегии и особый комфорт.",
    image: imageUrls.spaServices[1],
    duration: "3 месяца",
    features: [
      "8 любых процедур из категории 'Массаж'",
      "1 комплексная SPA-программа в подарок",
      "Скидка 15% на все дополнительные услуги",
      "Срок действия - 3 месяца",
      "Возможность переноса записи за 6 часов"
    ],
    sessions: "8 процедур + 1 SPA-программа",
    additionalInfo: [
      "Экономия до 25% по сравнению с разовыми процедурами",
      "Возможность использования членами семьи",
      "Приоритетная запись в удобное время"
    ]
  },
  103: {
    id: 103,
    title: "VIP-абонемент",
    price: "15000₽",
    description: "Эксклюзивное предложение для истинных ценителей комфорта и качества. Максимальный набор привилегий и индивидуальный подход к каждому вашему визиту.",
    image: imageUrls.spaServices[3],
    duration: "6 месяцев",
    features: [
      "10 любых процедур на выбор",
      "2 комплексные программы в подарок",
      "Скидка 20% на все дополнительные услуги",
      "Срок действия - 6 месяцев",
      "Приоритетная запись и обслуживание",
      "Бесплатная консультация косметолога"
    ],
    sessions: "10 процедур + 2 программы",
    additionalInfo: [
      "Экономия до 30% по сравнению с разовыми процедурами",
      "Персональный администратор",
      "Напитки и угощения во время процедур"
    ]
  },
  104: {
    id: 104,
    title: "Абонемент 'Коррекция фигуры'",
    price: "12000₽",
    description: "Специализированный комплекс процедур, направленных на коррекцию фигуры, уменьшение целлюлита и улучшение состояния кожи тела.",
    image: imageUrls.bodyTreatments[0],
    duration: "4 месяца",
    features: [
      "8 процедур антицеллюлитного массажа",
      "3 процедуры обертывания",
      "Скидка 15% на аппаратные процедуры",
      "Срок действия - 4 месяца",
      "Индивидуальные рекомендации по питанию"
    ],
    sessions: "11 процедур",
    additionalInfo: [
      "Видимый результат уже после 5-6 процедур",
      "Сопровождение и мотивация от специалистов",
      "Специальный курс, подобранный профессионалами"
    ]
  },
  105: {
    id: 105,
    title: "Мужской абонемент",
    price: "8000₽",
    description: "Разработан специально для мужчин, учитывая особенности мужской кожи и потребности. Комплекс процедур для релаксации и поддержания отличного внешнего вида.",
    image: imageUrls.menServices[2],
    duration: "3 месяца",
    features: [
      "5 процедур для мужчин на выбор",
      "3 спортивных массажа",
      "Скидка 15% на дополнительные услуги",
      "Срок действия - 3 месяца",
      "Приоритетная запись в вечернее время"
    ],
    sessions: "8 процедур",
    additionalInfo: [
      "Специальная атмосфера и подход",
      "Утреннее и вечернее время посещения",
      "Возможность приобретения в подарок"
    ]
  },
  106: {
    id: 106,
    title: "Абонемент 'Здоровая спина'",
    price: "7500₽",
    description: "Идеальное решение для тех, кто страдает от болей в спине, проблем с осанкой или проводит много времени за компьютером. Комплекс процедур, направленных на восстановление и поддержание здоровья спины.",
    image: imageUrls.massageTherapy[1],
    duration: "4 месяца",
    features: [
      "10 массажей спины",
      "Скидка 10% на дополнительные услуги",
      "Срок действия - 4 месяца",
      "Консультация специалиста",
      "Индивидуальные рекомендации по упражнениям"
    ],
    sessions: "10 процедур",
    additionalInfo: [
      "Снижение болевых ощущений уже после первых сеансов",
      "Комплексный подход к проблемам спины",
      "Возможность комбинирования с другими абонементами"
    ]
  }
};

const MembershipsPage = () => {
  const [selectedMembership, setSelectedMembership] = useState<ProgramDetails | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleMembershipClick = (id: number) => {
    setSelectedMembership(membershipDetailsMap[id]);
    setModalOpen(true);
  };

  return (
    <div className="p-4 md:p-8 pt-4">
      <div className="mb-1 pt-0">
        <h1 className="text-xl font-semibold text-primary">АБОНЕМЕНТЫ</h1>

        {/* Информационный блок о преимуществах абонементов */}
        <div className="bg-card text-card-foreground rounded-lg p-3 mb-6 shadow-md dark:shadow-white/10 transition-colors duration-200">
          <h2 className="text-base font-medium mb-2">Преимущества абонементов</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <li className="flex items-center">
              <span className="material-icons text-primary text-base mr-2">savings</span>
              Экономия до 30% от стоимости отдельных процедур
            </li>
            <li className="flex items-center">
              <span className="material-icons text-primary text-base mr-2">calendar_month</span>
              Гарантированное время для ваших процедур
            </li>
            <li className="flex items-center">
              <span className="material-icons text-primary text-base mr-2">verified</span>
              Дополнительные скидки и бонусы
            </li>
            <li className="flex items-center">
              <span className="material-icons text-primary text-base mr-2">card_giftcard</span>
              Возможность приобретения в подарок
            </li>
          </ul>
        </div>

        {/* Список абонементов */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {memberships.map((membership) => (
            <ProgramCard
              key={membership.id}
              id={membership.id}
              title={membership.title}
              price={membership.price}
              features={membership.features}
              onClick={handleMembershipClick}
            />
          ))}
        </div>

        {/* Дополнительная информация */}
        <div className="bg-card text-card-foreground rounded-lg p-4 shadow-md dark:shadow-white/10 transition-colors duration-200">
          <h2 className="text-base font-medium mb-2">Условия использования абонементов</h2>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• Абонемент необходимо активировать в течение 14 дней с момента покупки</li>
            <li>• Срок действия абонемента отсчитывается с момента активации</li>
            <li>• Процедуры необходимо использовать в течение срока действия абонемента</li>
            <li>• При покупке абонемента в подарок, активация происходит при первом визите</li>
            <li>• Для получения абонемента необходимо обратиться в администратору салона</li>
          </ul>
          <div className="mt-4">
            <Button
              className="bg-primary hover:bg-primary/90 text-white shadow-sm hover:shadow-md transition-all w-full sm:w-auto"
              onClick={() => {
                // Кодируем информацию для Telegram бота
                const source = btoa(encodeURIComponent("memberships_page"));
                const description = btoa(encodeURIComponent("Запрос информации об абонементах"));
                
                // Открываем Telegram бот с закодированной информацией
                window.open(`https://t.me/Natali_Secrets_bot?start=memberships_${source}_${description}`, "_blank");
              }}
            >
              Узнать подробнее
            </Button>
          </div>
        </div>
      </div>

      {/* Модальное окно с подробной информацией об абонементе */}
      <ProgramModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        program={selectedMembership}
      />
    </div>
  );
};

export default MembershipsPage;