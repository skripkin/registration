import React from 'react';
import Icon from '../components/Icon';

const PlaceholderPage: React.FC<{ title?: string; message?: string }> = ({
  title = 'Страница в разработке',
  message = 'Эта страница пока недоступна. Мы уже работаем над её реализацией!',
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-5">
      <div className="rounded-full p-6 mb-4">
        <Icon name="info" />
      </div>
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 max-w-md">{message}</p>
    </div>
  );
};

export default PlaceholderPage;
