import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import type { RootState } from '../api/store';
import { setPhone, setStep } from '../api/slices/storage.slice';
import { RegistrationStep } from '../api/types/registration';

import { PhoneInput } from '../components/PhoneInput';
import Checkbox from '../components/Checkbox';
import Button from '../components/Button';

type FormValues = {
  phone: string;
  agreement: boolean;
};

const PHONE_REGEXP = /^\+[1-9]\d{10,14}$/;

const StepPhone: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const register = useSelector((state: RootState) => state.registration.data);

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: { phone: register.phone, agreement: false },
  });

  const onSubmit = ({ phone }: FormValues) => {
    dispatch(setPhone(phone));
    if (register.isPhoneVerified) {
      dispatch(setStep(RegistrationStep.Role));
      return;
    }
    dispatch(setStep(RegistrationStep.VerifyPhone));
  };

  return (
    <>
      <p className="w-full mb-8 text-base text-gray-text">
        {t('registration.phoneSendedInfo')}
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8 w-full"
      >
        <Controller
          name="phone"
          control={control}
          rules={{
            required: true,
            pattern: PHONE_REGEXP,
          }}
          render={({ field }) => (
            <PhoneInput
              country="kz"
              value={field.value}
              onChange={(val) =>
                field.onChange(val.startsWith('+') ? val : '+' + val)
              }
            />
          )}
        />

        <Controller
          name="agreement"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Checkbox
              label={t('registration.agreeWithTerms')}
              checked={field.value}
              onChange={field.onChange}
            />
          )}
        />

        <Button className="w-full" type="submit" disabled={!isValid}>
          {t('registration.next')}
        </Button>
      </form>
    </>
  );
};

export default StepPhone;
