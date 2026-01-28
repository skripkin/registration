import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import type { RootState } from '../api/store';
import { logout } from '../api/slices/auth.slice';

import Sidebar, { type ISidebarLinks } from './Sidebar';
import Icon from '../components/Icon';
import Header from './Header';

const Layout: React.FC = () => {
  const { t } = useTranslation();

  const navMenuLinks: ISidebarLinks[] = [
    {
      title: t('links.issues'),
      items: [
        {
          path: '/active',
          label: t('links.active'),
          icon: <Icon name="active-section" className="w-4.5" />,
        },
        {
          path: '/archive',
          label: t('links.archive'),
          icon: <Icon name="archive-section" className="w-4.5" />,
        },
      ],
    },
    {
      title: t('links.counterparties'),
      items: [
        {
          path: '/customers',
          label: t('links.customers'),
          icon: <Icon name="users-section" className="w-4.5" />,
        },
        {
          path: '/transporters',
          label: t('links.transporters'),
          icon: <Icon name="translate-section" className="w-4.5" />,
        },
      ],
    },
    {
      title: t('links.fleet'),
      items: [
        {
          path: '/cars',
          label: t('links.cars'),
          icon: <Icon name="car-section" className="w-4.5" />,
        },
      ],
    },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { profile } = useSelector((state: RootState) => state.user);

  const isMobile = window.innerWidth < 768;

  const handleLogout = () => {
    dispatch(logout());
    navigate('/', { replace: true });
  };

  return (
    <div className="h-screen overflow-hidden">
      <Header
        userName={profile?.firstName || 'User'}
        avatarUrl="https://picsum.photos/id/237/200/200"
        onToggleSidebar={() => setCollapsed((v) => !v)}
        onLogout={handleLogout}
      />

      <div className="flex h-[calc(100vh-56px)]">
        {!isMobile && (
          <Sidebar
            items={navMenuLinks}
            collapsed={collapsed}
            isMobile={false}
            onCloseMobile={() => {}}
          />
        )}

        {isMobile && mobileOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setMobileOpen(false)}
            />
            <Sidebar
              items={navMenuLinks}
              collapsed={false}
              isMobile
              onCloseMobile={() => setMobileOpen(false)}
            />
          </>
        )}
        <main className="flex-1 bg-white overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
