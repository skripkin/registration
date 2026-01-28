import React from 'react';
import Icon, { type IconName } from './Icon';

interface EmployeeCardProps {
  iconName: IconName;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({
  iconName,
  title,
  description,
  imageSrc,
  imageAlt = '',
}) => {
  return (
    <div className="max-h-40 flex bg-white rounded-lg p-3 shadow-xs gap-4">
      <div className="w-2/3 flex flex-col justify-center gap-2">
        <div className="w-max bg-blue-light p-2 rounded-xl">
          <Icon name={iconName} className="w-7 h-7 text-blue-bright" />
        </div>
        <h2 className="text-xl text-gray-dark font-semibold">{title}</h2>
        <p className="text-sm  text-gray-text">{description}</p>
      </div>

      <div className="w-1/3">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="block w-full h-full object-contain rounded-lg"
        />
      </div>
    </div>
  );
};

export default EmployeeCard;
