import type { UseFormRegisterReturn } from 'react-hook-form';
import Input from './Input';

type ProfileFieldProps = {
  label: string;
  value: string;
};

type EditableProfileFieldProps = {
  label: string;
  register: UseFormRegisterReturn;
  error?: string;
};

export const EditableProfileField: React.FC<EditableProfileFieldProps> = ({
  label,
  register,
  error,
}) => {
  return (
    <Input label={label} {...register} error={error} className="text-base" />
  );
};

export const ProfileField: React.FC<ProfileFieldProps> = ({ label, value }) => {
  return (
    <>
      <label className="text-sm text-gray-600">{label}</label>
      <span className="text-base text-gray-800">{value}</span>
    </>
  );
};
