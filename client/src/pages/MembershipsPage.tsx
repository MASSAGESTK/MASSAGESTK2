import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";
import ProgramCard from "@/components/ProgramCard";
import ProgramModal, { ProgramDetails } from "@/components/ProgramModal";
import { complexPrograms, programDetailsMap } from "@/data/programs";

const MembershipsPage = () => {
  // Используем наш хук для управления модальными окнами
  const { 
    isOpen: modalOpen, 
    open: openModal, 
    close: closeModal, 
    data: selectedMembership 
  } = useModal<ProgramDetails>();

  // Мемоизированная функция для обработки клика по абонементу
  const handleMembershipClick = useCallback((id: number) => {
    const programDetails = programDetailsMap[id];
    if (programDetails) {
      openModal(programDetails);
    }
  }, [openModal]);

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
          {complexPrograms.map((membership) => (
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
          
        </div>
      </div>

      {/* Модальное окно с подробной информацией об абонементе */}
      <ProgramModal
        isOpen={modalOpen}
        onClose={closeModal}
        program={selectedMembership || null}
      />
    </div>
  );
};

export default MembershipsPage;