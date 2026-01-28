import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import type { RootState } from '../api/store';
import { resetRegistration } from '../api/slices/storage.slice';
import { useRegisterMutation } from '../api/endpoints/auth.api';

import Button from '../components/Button';
import Input from '../components/Input';
import { useMessage } from './AlertProvider';

interface ProfileFormData {
  firstName: string;
  lastName: string;
  patronymic?: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const StepProfile: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const message = useMessage();
  const dispatch = useDispatch();
  const [registerUser, { isLoading }] = useRegisterMutation();
  const profile = useSelector((state: RootState) => state.registration.data);

  const {
    control,
    handleSubmit,
    formState: { isValid },
    getValues,
  } = useForm<ProfileFormData>({
    mode: 'onChange',
    defaultValues: {
      firstName: profile.firstName,
      lastName: profile.lastName,
      patronymic: profile.patronymic,
      email: profile.email,
      password: profile.password,
      confirmPassword: profile.password,
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    if (data.password !== data.confirmPassword) {
      message.error(t('registration.passwordsDoNotMatch'));
      return;
    }

    const { error } = await registerUser({
      firstName: data.firstName,
      lastName: data.lastName,
      patronymic: data.patronymic,
      email: data.email,
      password: data.password,
      isPhoneVerified: profile.isPhoneVerified,
      phone: profile.phone,
    });

    if (error) {
      const errorMessage =
        typeof error === 'string' ? error : t('registration.registrationFailed');
      message.error(errorMessage);
    } else {
      dispatch(resetRegistration());
      navigate('/profile');
    }
  };

  return (
    <form
      className="mt-4 flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="firstName"
        control={control}
        rules={{ required: t('registration.firstNameRequired') }}
        render={({ field, fieldState }) => (
          <Input
            placeholder={t('registration.firstName')}
            value={field.value}
            onChange={field.onChange}
            error={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="lastName"
        control={control}
        rules={{ required: t('registration.lastNameRequired') }}
        render={({ field, fieldState }) => (
          <Input
            placeholder={t('registration.lastName')}
            value={field.value}
            onChange={field.onChange}
            error={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="patronymic"
        control={control}
        render={({ field }) => (
          <Input
            placeholder={t('registration.patronymic')}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        rules={{
          required: t('registration.emailRequired'),
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: t('registration.emailInvalid'),
          },
        }}
        render={({ field, fieldState }) => (
          <Input
            placeholder={t('registration.email')}
            type="email"
            value={field.value}
            onChange={field.onChange}
            error={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        rules={{ required: t('registration.passwordRequired') }}
        render={({ field, fieldState }) => (
          <Input
            placeholder={t('registration.password')}
            type="password"
            value={field.value}
            onChange={field.onChange}
            error={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="confirmPassword"
        control={control}
        rules={{
          required: t('registration.passwordRequired'),
          validate: (value) =>
            value === getValues('password') || t('registration.passwordsDoNotMatch'),
        }}
        render={({ field, fieldState }) => (
          <Input
            placeholder={t('registration.password')}
            type="password"
            value={field.value}
            onChange={field.onChange}
            error={fieldState.error?.message}
          />
        )}
      />

      <Button className="w-full" type="submit" disabled={!isValid}>
        {isLoading ? t('registration.checking') : t('registration.register')}
      </Button>
    </form>
  );
};

export default StepProfile;
