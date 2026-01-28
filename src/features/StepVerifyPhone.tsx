import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { useVerifyPhoneMutation } from '../api/endpoints/auth.api';
import { setStep, verifyPhone } from '../api/slices/storage.slice';
import { RegistrationStep } from '../api/types/registration';
import type { RootState } from '../api/store';

import { useMessage } from './AlertProvider';

import Button from '../components/Button';

const StepVerifyPhone: React.FC = () => {
  const dispatch = useDispatch();
  const message = useMessage();
  const { t } = useTranslation();
  const { phone } = useSelector((state: RootState) => state.registration.data);
  const [verifyPhoneRequest, { isLoading }] = useVerifyPhoneMutation();

  const [code, setCode] = useState('');
  const [timer, setTimer] = useState(60);
  const inputRef = useRef<HTMLInputElement>(null);

  const canResend = timer <= 0;
  const isCodeValid = code.length === 6;

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setCode(value);
  };

  const handleResend = () => {
    setCode('');
    setTimer(60);
    inputRef.current?.focus();
  };

  const handleBack = () => {
    dispatch(setStep(RegistrationStep.Phone));
  };

  const handleNext = async () => {
    if (!isCodeValid) return;
    if (phone) {
      const { data, error } = await verifyPhoneRequest({ phone, code });

      if (error) {
        const errorMessage =
          typeof error === 'string' ? error : t('registration.checkCodeError');
        message.error(errorMessage);
      }

      if (data?.success) {
        dispatch(verifyPhone(true));
        dispatch(setStep(RegistrationStep.Role));
      } else {
        message.error(t('registration.codeInvalid'));
      }
    }
  };

  const digits = Array.from({ length: 6 }, (_, i) => code[i] ?? '');

  return (
    <>
      <button
        className="mt-2 text-gray-500 hover:text-gray-700 self-start"
        onClick={handleBack}
      >
        ← {t('registration.backToPhone')}
      </button>

      <h2 className="my-6 text-center text-xl font-semibold">
        {t('registration.verifyCode')}
      </h2>
      <p className="mb-2 text-gray-text text-sm">
        {t('registration.checkCodeForNumber')}: {phone}
      </p>

      <div
        className="flex justify-between gap-2 cursor-text relative"
        onClick={() => inputRef.current?.focus()}
      >
        {digits.map((d, i) => (
          <div
            key={i}
            className="w-10 h-12 border-2 rounded-lg border-gray-light text-xl flex items-center justify-center"
          >
            {d}
          </div>
        ))}

        <input
          ref={inputRef}
          value={code}
          onChange={handleChange}
          inputMode="numeric"
          className="absolute opacity-0 pointer-events-none"
          autoFocus
        />
      </div>

      <div className="mt-4 text-center text-gray-500">
        {canResend ? (
          <button
            onClick={handleResend}
            className="text-blue-bright font-medium hover:underline"
          >
            {t('registration.resendCode')}
          </button>
        ) : (
          <span>
            {t('registration.resendCodeAfter')} {timer}s
          </span>
        )}
      </div>

      <Button
        className="mt-6 w-full"
        disabled={!isCodeValid}
        onClick={handleNext}
      >
        {isLoading ? t('registration.checking') : t('registration.next')}
      </Button>
    </>
  );
};

export default StepVerifyPhone;
