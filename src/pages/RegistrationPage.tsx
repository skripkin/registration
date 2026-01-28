import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';

import type { RootState } from '../api/store';
import { RegistrationStep } from '../api/types/registration';

import StepPhone from '../features/StepPhone';
import StepVerifyPhone from '../features/StepVerifyPhone';
import StepRole from '../features/StepRole';
import StepProfile from '../features/StepProfile';

const stepVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.4 } },
};

const RegistrationPage: React.FC = () => {
  const { t } = useTranslation();
  const step = useSelector((state: RootState) => state.registration.step);

  const renderStep = () => {
    switch (step) {
      case RegistrationStep.Phone:
        return <StepPhone key="phone" />;
      case RegistrationStep.VerifyPhone:
        return <StepVerifyPhone key="verify" />;
      case RegistrationStep.Role:
        return <StepRole key="role" />;
      case RegistrationStep.Profile:
        return <StepProfile key="profile" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-5/6 h-5/6 relative">
      <h1 className="w-full mb-2 text-4xl text-gray-dark font-semibold">
        {t('registration.title')}
      </h1>

      <div className="mt-6 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RegistrationPage;
