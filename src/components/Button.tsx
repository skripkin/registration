import React from 'react';
import clsx from 'clsx';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  children,
  disabled,
  className,
  ...props
}) => {
  return (
    <button
      disabled={disabled}
      className={clsx(
        'px-4 py-2 text-sm rounded-lg transition-colors',
        'border border-blue-bright text-blue-bright bg-transparent',
        'disabled:bg-blue-bright disabled:text-white disabled:border-blue-bright disabled:opacity-20 disabled:cursor-not-allowed!',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;