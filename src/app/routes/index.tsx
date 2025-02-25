import { Route, Routes } from 'react-router-dom';

import { routes } from '../../shared/config/routes';
import MainLayout from '../layouts/MainLayout';
import {
  AboutPage,
  AccountPage,
  AuthorizationPage,
  CatalogPage,
  CatPage,
  HomePage,
  NotFoundPage,
  PersonPage,
  RegistrationPage,
} from '@/pages';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={routes.main.home.path} element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path={routes.main.profile.path} element={<PersonPage />} />
        <Route path={routes.main.catalog.path} element={<CatalogPage />} />
        <Route path={routes.main.cat.path} element={<CatPage />} />
        <Route path={routes.main.account.path} element={<AccountPage />} />
        <Route path={routes.main.about.path} element={<AboutPage />} />
        <Route path={routes.main.auth.path} element={<AuthorizationPage />} />
        <Route path={routes.main.reg.path} element={<RegistrationPage />} />
      </Route>
      <Route path={routes.other['not-found']} element={<NotFoundPage />} />
    </Routes>
  );
};
