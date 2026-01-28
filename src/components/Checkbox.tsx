import React from 'react';

interface ICheckboxProps {
  checked?: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  error?: string;
  disabled?: boolean;
};

const Checkbox: React.FC<ICheckboxProps> = ({
  checked = false,
  onChange,
  label,
  error,
  disabled,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="flex items-center gap-2 text-sm cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          className="w-4 h-4"
        />
        {label}
      </label>

      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default Checkbox;