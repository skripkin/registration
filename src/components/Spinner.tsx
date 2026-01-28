import React from 'react';
import clsx from 'clsx';

type SpinnerProps = {
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'white' | 'gray';
  className?: string;
};

const sizeClasses = {
  sm: 'w-4 h-4 border-2',
  md: 'w-6 h-6 border-4',
  lg: 'w-12 h-12 border-4',
};

const colorClasses = {
  blue: 'border-blue-500 border-t-transparent',
  white: 'border-white border-t-transparent',
  gray: 'border-gray-400 border-t-transparent',
};

const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  color = 'blue',
  className,
}) => {
  return (
    <div
      className={clsx(
        'animate-spin rounded-full border-solid border-current',
        sizeClasses[size],
        colorClasses[color],
        className,
      )}
    />
  );
};

export default Spinner;
