import type { UseFormRegisterReturn, FieldValues } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import { EditableProfileField } from '../components/ProfileField';
import Button from '../components/Button';
import Icon from '../components/Icon';

interface EditProfilePanelProps<T extends FieldValues> {
  isOpen: boolean;
  fieldTitles: Record<keyof T, string>;
  register: Record<keyof T, UseFormRegisterReturn>;
  errors?: Partial<Record<keyof T, string>>;
  onClose: () => void;
  onSave: () => void;
}

const EditProfilePanel = <T extends FieldValues>({
  isOpen,
  fieldTitles,
  register,
  errors,
  onClose,
  onSave,
}: EditProfilePanelProps<T>) => {
  const { t } = useTranslation();
  return (
    <div
      className={clsx(
        'absolute inset-0 z-50 bg-black/30 backdrop-blur-sm transition-opacity duration-300',
        isOpen
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none',
      )}
      onClick={onClose}
    >
      <div
        className={clsx(
          'absolute top-0 right-0 h-full w-1/2 bg-white shadow-xl transform transition-transform duration-300',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between px-5 py-3 border-b border-gray-light items-center">
          <Button onClick={onSave}>{t('save')}</Button>
          <button onClick={onClose}>
            <Icon name="arrow" className="w-6 -rotate-90 text-gray" />
          </button>
        </div>

        <div className="grid grid-cols-[150px_1fr] gap-y-3 gap-x-4 items-center px-6 py-4">
          {(Object.keys(fieldTitles) as (keyof T)[]).map((field) => (
            <EditableProfileField
              key={field as string}
              label={fieldTitles[field]}
              register={register[field]}
              error={errors?.[field]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditProfilePanel;
