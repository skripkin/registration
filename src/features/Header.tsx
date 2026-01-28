import { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import Icon from '../components/Icon';
import LanguageSwitcher from './LanguageSwitcher';

interface IHeaderProps {
  userName?: string;
  avatarUrl?: string;
  onToggleSidebar: () => void;
  onLogout: () => void;
}

const Header = ({
  userName = 'User',
  avatarUrl,
  onToggleSidebar,
  onLogout,
}: IHeaderProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="flex items-center justify-between h-14 px-4 bg-gray-50 border-b border-gray-light shadow-sm">
      <button
        onClick={onToggleSidebar}
        className="text-gray-700 text-2xl p-2 hover:bg-gray-100 rounded-md transition"
        aria-label="Toggle sidebar"
      >
        <Icon name="sidebar-toggle" className="min-w-6 text-gray-dark" />
      </button>

      <div className="relative" ref={dropdownRef}>
        <LanguageSwitcher />
        <button
          className="flex items-center gap-2"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <div className="min-w-10 h-10 rounded-full overflow-hidden flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-indigo-500">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={userName}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-600 font-medium">
                {userName.charAt(0)}
              </span>
            )}
          </div>
          <Icon
            name="arrow"
            className={clsx(
              'min-w-6 text-gray-500 transition-transform duration-300',
              isOpen && 'rotate-180',
            )}
          />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
            <NavLink
              key="/profile"
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2 text-sm"
            >
              <span className="text-lg text-gray">
                <Icon name="manage-section" className="w-4.5" />
              </span>
              <span>{t('header.profile')}</span>
            </NavLink>
            <button
              onClick={onLogout}
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition rounded-b-md"
            >
              {t('header.logout')}
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
