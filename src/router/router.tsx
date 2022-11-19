import { createBrowserRouter, Navigate } from 'react-router-dom';

import { DashboardPage, PhantomPage } from '../pages';
import { NotFounded } from '../pages/NotFounded';

enum RouterPaths {
  ROOT = '/',
  DASHBOARD = '/dashboard',
  PHANTOMS = '/phantoms',
}

const router = createBrowserRouter([
  {
    path: RouterPaths.ROOT,
    element: <Navigate replace to={RouterPaths.DASHBOARD} />,
    errorElement: <NotFounded />,
  },
  {
    path: `${RouterPaths.DASHBOARD}`,
    element: <DashboardPage />,
  },

  {
    path: `${RouterPaths.PHANTOMS}/:phantomId`,
    element: <PhantomPage />,
  },
]);

export { router, RouterPaths };
