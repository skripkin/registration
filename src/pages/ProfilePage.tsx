import React from 'react';
import { useSelector } from 'react-redux';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import type { RootState } from '../api/store';
import type { User } from '../api/types/auth';
import {
  useGetProfileQuery,
  useUpdateUserMutation,
} from '../api/endpoints/user.api';

import EditProfilePanel from '../features/EditProfilePanel';

import { ProfileField } from '../components/ProfileField';
import Spinner from '../components/Spinner';

type ProfileFormData = Pick<
  User,
  'firstName' | 'lastName' | 'patronymic' | 'phone' | 'email' | 'iin'
>;

const ProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = React.useState(false);

  const { profile: user, loading } = useSelector(
    (state: RootState) => state.user,
  );

  useGetProfileQuery(undefined);

  const fieldTitles = {
    lastName: t('registration.lastName'),
    firstName: t('registration.firstName'),
    patronymic: t('registration.patronymic'),
    phone: t('registration.phone'),
    email: t('registration.email'),
    iin: t('registration.iin'),
  } as const;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>({
    mode: 'onBlur',
  });

  const [updateUser] = useUpdateUserMutation();

  const onSubmit: SubmitHandler<ProfileFormData> = (data) => {
    updateUser({ ...data, id: user!.id, role: user!.role });
    reset(data);
    setIsEditing(false);
  };

  React.useEffect(() => {
    if (user) {
      reset({
        lastName: user.lastName ?? '',
        firstName: user.firstName ?? '',
        patronymic: user.patronymic ?? '',
        phone: user.phone ?? '',
        email: user.email ?? '',
        iin: user.iin ?? '',
      });
    }
  }, [user, reset]);

  const phoneValidation = {
    required: t('registration.phoneRequired'),
    pattern: {
      value: /^\+?\d{7,15}$/,
      message: t('registration.phoneInvalid'),
    },
  };

  const iinValidation = {
    required: t('registration.iinRequired'),
    pattern: {
      value: /^\+?\d{12,12}$/,
      message: t('registration.iinInvalid'),
    },
  };

  const emailValidation = {
    required: t('registration.emailRequired'),
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: t('registration.emailInvalid'),
    },
  };

  if (loading || !user) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spinner size="lg" color="blue" />
      </div>
    );
  }

  return (
    <div className="h-full p-5 relative overflow-hidden">
      <h2 className="text-lg font-semibold mb-6">{t('profile.view')}</h2>

      <div className="grid grid-cols-[150px_1fr] gap-y-4 gap-x-4 items-center">
        {(Object.keys(fieldTitles) as (keyof typeof fieldTitles)[]).map(
          (field) => (
            <ProfileField
              key={field}
              label={fieldTitles[field]}
              value={user[field] || ''}
            />
          ),
        )}
      </div>

      <button
        onClick={() => setIsEditing(true)}
        className="mt-6 py-2 px-4 border border-blue-bright rounded-lg text-blue-bright text-xs hover:bg-blue-bright hover:text-white transition"
      >
        {t('profile.edit')}
      </button>

      <EditProfilePanel<ProfileFormData>
        isOpen={isEditing}
        fieldTitles={fieldTitles}
        register={{
          lastName: register('lastName'),
          firstName: register('firstName'),
          patronymic: register('patronymic'),
          phone: register('phone', phoneValidation),
          email: register('email', emailValidation),
          iin: register('iin', iinValidation),
        }}
        errors={{
          lastName: errors.lastName?.message,
          firstName: errors.firstName?.message,
          patronymic: errors.patronymic?.message,
          phone: errors.phone?.message,
          email: errors.email?.message,
          iin: errors.iin?.message,
        }}
        onClose={() => setIsEditing(false)}
        onSave={handleSubmit(onSubmit)}
      />
    </div>
  );
};

export default ProfilePage;
