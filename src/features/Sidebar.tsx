import { useState, useRef, useEffect, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

import Icon from '../components/Icon';

type TNavMenu = {
  path: string;
  label: string;
  icon: ReactNode;
};

export interface ISidebarLinks {
  title?: string;
  items: TNavMenu[];
}

interface ISidebarProps {
  items: ISidebarLinks[];
  collapsed: boolean;
  isMobile: boolean;
  onCloseMobile: () => void;
}

const Sidebar = ({
  items,
  collapsed,
  isMobile,
  onCloseMobile,
}: ISidebarProps) => {
  const { t } = useTranslation();
  const [isDirectoryOpen, setDirectoryOpen] = useState(false);
  const directoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        directoryRef.current &&
        !directoryRef.current.contains(e.target as Node)
      ) {
        setDirectoryOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <aside
      className={clsx(
        'bg-gray-50 text-white transition-all duration-300 flex flex-col',
        collapsed ? 'w-16' : 'w-64',
      )}
    >
      <nav className="mt-2 flex-1 flex flex-col overflow-auto">
        {items.map((section, idx) => (
          <div key={idx} className="flex flex-col">
            {section.title && !collapsed && (
              <div className="mt-4 first:mt-0">
                <div className="px-3 py-2 text-gray-dark text-base font-medium uppercase">
                  {section.title}
                </div>
                <div
                  className="border-t-2 border-dashed border-gray-300 my-2 mx-2"
                  aria-hidden="true"
                />
              </div>
            )}

            {section.items.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => isMobile && onCloseMobile()}
                className={({ isActive }) =>
                  clsx(
                    'flex items-center gap-3 px-3 py-2 text-sm',
                    isActive ? 'text-gray-dark' : 'text-gray',
                    !isActive && 'hover:text-gray-dark',
                    collapsed ? 'justify-center' : '',
                  )
                }
              >
                <span className="text-lg">{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <div className="flex flex-col relative mb-6">
        {!collapsed && (
          <div className="mt-4 first:mt-0">
            <div className="px-3 py-2 text-gray-dark text-base font-medium uppercase">
              {t('sidebar.directories')}
            </div>
            <div
              className="border-t-2 border-dashed border-gray-300 my-2 mx-2"
              aria-hidden="true"
            />
          </div>
        )}

        <div className="relative" ref={directoryRef}>
          <button
            onClick={() => setDirectoryOpen((prev) => !prev)}
            className={clsx(
              'flex items-center gap-3 px-3 py-2 text-sm w-full text-left',
              isDirectoryOpen ? 'text-gray-dark' : 'text-gray',
              !isDirectoryOpen && 'hover:text-gray-dark',
              collapsed ? 'justify-center' : '',
            )}
          >
            <span className="text-lg text-gray">
              <Icon name="directory-section" className="w-4.5" />
            </span>
            {!collapsed && <span>{t('sidebar.information')}</span>}
            {!collapsed && (
              <Icon name="arrow" className="ml-auto w-6 -rotate-90" />
            )}
          </button>

          {isDirectoryOpen && (
            <div className="absolute left-full bottom-0 ml-2 w-48 bg-white shadow-lg rounded border border-gray-200 z-50">
              <div className="py-2">
                <div className="px-3 py-1 hover:bg-gray-100 cursor-pointer text-gray">
                  {t('sidebar.element1')}
                </div>
                <div className="px-3 py-1 hover:bg-gray-100 cursor-pointer text-gray">
                  {t('sidebar.element2')}
                </div>
                <div className="px-3 py-1 hover:bg-gray-100 cursor-pointer text-gray">
                  {t('sidebar.element3')}
                </div>
              </div>
            </div>
          )}
        </div>

        <NavLink
          key="/managers"
          to="/managers"
          onClick={() => isMobile && onCloseMobile()}
          className={({ isActive }) =>
            clsx(
              'flex items-center gap-3 px-3 py-2 text-sm',
              isActive ? 'text-gray-dark' : 'text-gray',
              !isActive && 'hover:text-gray-dark',
              collapsed ? 'justify-center' : '',
            )
          }
        >
          <span className="text-lg text-gray">
            <Icon name="manage-section" className="w-4.5" />
          </span>
          {!collapsed && <span>{t('sidebar.managers')}</span>}
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;