import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import type { Role } from '../api/types/auth';
import { RegistrationStep } from '../api/types/registration';
import { setRole, setStep } from '../api/slices/storage.slice';

import Button from '../components/Button';
import EmployeeCard from '../components/EmployeeCard';
import type { IconName } from '../components/Icon';


const StepRole: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  
  const roles = [
    {
      id: 'CUSTOMER' as Role,
      iconName: 'suitcase' as IconName,
      title: t('registration.asCustomer'),
      description: t('registration.customerDescription'),
      imageSrc: './way.png',
      imageAlt: 'way',
    },
    {
      id: 'CARRIER' as Role,
      iconName: 'car-section' as IconName,
      title: t('registration.asCarrier'),
      description: t('registration.carrierDescription'),
      imageSrc: './schema.png',
      imageAlt: 'schema',
    },
  ];
  const handleNext = () => {
    if (!selectedRole) return;
    dispatch(setRole(selectedRole));
    dispatch(setStep(RegistrationStep.Profile));
  };

  return (
    <>
      <p className="w-full mb-4 text-base text-gray-text">
        {t('registration.selectRole')}
      </p>
      {roles.map((role) => (
        <label
          key={role.id}
          className={`
            mb-4 cursor-pointer border border-gray-light rounded-lg p-4 block
            ${selectedRole === role.id ? 'border-blue-bright! shadow-md outline-blue-bright' : ''}
          `}
        >
          <input
            type="radio"
            name="role"
            value={role.id}
            checked={selectedRole === role.id}
            onChange={() => setSelectedRole(role.id)}
            className="hidden"
          />
          <EmployeeCard
            iconName={role.iconName}
            title={role.title}
            description={role.description}
            imageSrc={role.imageSrc}
            imageAlt={role.imageAlt}
          />
        </label>
      ))}
      <Button
        className="w-full mt-6"
        onClick={handleNext}
        disabled={!selectedRole}
      >
        {t('registration.next')}
      </Button>
    </>
  );
};

export default StepRole;
