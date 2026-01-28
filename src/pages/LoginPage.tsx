import React, { useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useLoginMutation } from '../api/endpoints/auth.api';

import Button from '../components/Button';
import Input from '../components/Input';
import { useMessage } from '../features/AlertProvider';

type LoginFormData = {
  email: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const message = useMessage();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const [login, { isLoading, isSuccess }] = useLoginMutation();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormData> = async (request) => {
    const { error } = await login(request);
    if (error) {
      message.error(t('login.error'));
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/profile', { replace: true });
    }
  }, [isSuccess, navigate]);

  return (
    <form className="w-3/4 max-w-md" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-2xl font-bold mb-6">{t('login.title')}</h2>

      <div className="flex flex-col gap-1 mb-2">
        <Input
          label={t('login.email')}
          type="email"
          placeholder={t('login.email')}
          {...register('email', {
            required: t('login.emailRequired'),
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: t('login.emailInvalid'),
            },
          })}
          error={errors.email?.message}
        />
      </div>

      <div className="flex flex-col gap-1">
        <Input
          label={t('login.password')}
          type="password"
          placeholder={t('login.password')}
          {...register('password', { required: t('login.passwordRequired') })}
          error={errors.password?.message}
        />
      </div>

      <Button
        type="submit"
        disabled={isLoading || !isValid}
        className="mt-6 w-full"
      >
        {isLoading ? t('login.loading') : t('login.submit')}
      </Button>

      <p className="mt-4 text-sm text-gray text-center">
        {t('login.noAccount')}{' '}
        <Link to="/register" className="text-blue-bright hover:underline">
          {t('login.register')}
        </Link>
      </p>
    </form>
  );
};

export default LoginPage;
