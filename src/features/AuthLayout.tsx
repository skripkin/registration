import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '../api/hooks';

import Icon from '../components/Icon';
import LanguageSwitcher from './LanguageSwitcher';

const AuthLayout: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex relative max-md:flex-col max-md:h-screen">
      <div className="w-1/2 h-screen p-6 bg-blue-bright flex items-center justify-center max-md:w-full max-md:h-auto">
        <div className="absolute top-6 right-6">
          <LanguageSwitcher />
        </div>
        <div className="h-5/6 w-full">
          <Link to="/login">
            <Icon name="logo" className="w-14 mb-3 text-white max-md:w-8" />
          </Link>
          <h1 className="w-full text-white text-5xl font-bold max-md:text-2xl max-md:w-3/4 max-sm:w-full">
            {t('welcome')}
          </h1>
        </div>
      </div>

      <div className="w-1/2 h-screen flex items-center justify-center max-md:w-full max-md:items-start max-md:py-10">
        <Outlet />
      </div>

      <div className="max-md:hidden">
        <svg
          className="absolute top-[calc(100vh-161px)] left-16 w-24 h-24"
          viewBox="0 0 96 96"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M38.8276 65.8182C38.8276 71.4414 34.3813 76 28.8966 76C23.4118 76 18.9655 71.4414 18.9655 65.8182M38.8276 65.8182C38.8276 60.1949 34.3813 55.6364 28.8966 55.6364C23.4118 55.6364 18.9655 60.1949 18.9655 65.8182M38.8276 65.8182H61.1724M18.9655 65.8182H14V56M83.5172 65.8182C83.5172 71.4414 79.071 76 73.5862 76C68.1014 76 63.6552 71.4414 63.6552 65.8182M83.5172 65.8182C83.5172 60.1949 79.071 55.6364 73.5862 55.6364C68.1014 55.6364 63.6552 60.1949 63.6552 65.8182M83.5172 65.8182H86V45.4545L73.5862 32.7273H61.1724V65.8182M63.6552 65.8182H61.1724M61.1724 65.8182V20H18C15.7909 20 14 21.7909 14 24M8 32H32.8966M12 44H26"
            stroke="white"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <svg
          className="absolute top-[calc(100vh-148px)] right-16 w-18 h-18"
          width="72"
          height="72"
          viewBox="0 0 72 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M35.9999 64.7999C35.9999 64.7999 58.5391 44.7652 58.5391 29.7391C58.5391 17.2911 48.448 7.19995 35.9999 7.19995C23.5519 7.19995 13.4608 17.2911 13.4608 29.7391C13.4608 44.7652 35.9999 64.7999 35.9999 64.7999Z"
            stroke="#05C0E6"
            strokeWidth="6"
          />
          <path
            d="M43.2009 28.8004C43.2009 32.7769 39.9773 36.0004 36.0009 36.0004C32.0244 36.0004 28.8009 32.7769 28.8009 28.8004C28.8009 24.824 32.0244 21.6004 36.0009 21.6004C39.9773 21.6004 43.2009 24.824 43.2009 28.8004Z"
            stroke="#05C0E6"
            strokeWidth="6"
          />
        </svg>

        <svg
          className="absolute left-0 top-[calc(100vh-62px)] w-full h-max"
          viewBox="0 0 1280 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="640" height="4" fill="white" />
          <rect
            width="640"
            height="4"
            transform="translate(640)"
            fill="#05C0E6"
          />
        </svg>
      </div>

      <div className="w-full mb-10 min-md:hidden">
        <svg
          viewBox="0 0 768 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M70.8276 65.8182C70.8276 71.4414 66.3813 76 60.8966 76C55.4118 76 50.9655 71.4414 50.9655 65.8182M70.8276 65.8182C70.8276 60.1949 66.3813 55.6364 60.8966 55.6364C55.4118 55.6364 50.9655 60.1949 50.9655 65.8182M70.8276 65.8182H93.1724M50.9655 65.8182H46V56M115.517 65.8182C115.517 71.4414 111.071 76 105.586 76C100.101 76 95.6552 71.4414 95.6552 65.8182M115.517 65.8182C115.517 60.1949 111.071 55.6364 105.586 55.6364C100.101 55.6364 95.6552 60.1949 95.6552 65.8182M115.517 65.8182H118V45.4545L105.586 32.7273H93.1724V65.8182M95.6552 65.8182H93.1724M93.1724 65.8182V20H50C47.7909 20 46 21.7909 46 24M40 32H64.8966M44 44H58"
            stroke="#05C0E6"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M700 76.7997C700 76.7997 722.539 56.7649 722.539 41.7388C722.539 29.2908 712.448 19.1997 700 19.1997C687.552 19.1997 677.461 29.2908 677.461 41.7388C677.461 56.7649 700 76.7997 700 76.7997Z"
            stroke="#05C0E6"
            strokeWidth="6"
          />
          <path
            d="M707.201 40.8002C707.201 44.7766 703.978 48.0002 700.001 48.0002C696.025 48.0002 692.801 44.7766 692.801 40.8002C692.801 36.8237 696.025 33.6002 700.001 33.6002C703.978 33.6002 707.201 36.8237 707.201 40.8002Z"
            stroke="#05C0E6"
            strokeWidth="6"
          />
          <rect
            width="768"
            height="4"
            transform="translate(0 96)"
            fill="#05C0E6"
          />
        </svg>
      </div>
    </div>
  );
};

export default AuthLayout;
