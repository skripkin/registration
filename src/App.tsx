import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from './api/hooks';

import Layout from './features/Layout';
import AuthLayout from './features/AuthLayout';

import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import PlaceholderPage from './pages/PlaceholderPage';

export const App = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
        </Route>

        <Route element={<Layout />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/active" element={<PlaceholderPage />} />
          <Route path="/archive" element={<PlaceholderPage />} />
          <Route path="/customers" element={<PlaceholderPage />} />
          <Route path="/transporters" element={<PlaceholderPage />} />
          <Route path="/cars" element={<PlaceholderPage />} />
          <Route path="/managers" element={<PlaceholderPage />} />
        </Route>

        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? '/profile' : '/'} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
