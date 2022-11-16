import './styles/globals.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { PhantomsProvider } from './contexts/phantoms/phantoms.context';
import { SettingsProvider } from './contexts/settings/settings.context';
import { MainLayout } from './layouts';
import { DashboardPage } from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardPage />,
  },
]);

function App() {
  return (
    <SettingsProvider>
      <PhantomsProvider>
        <MainLayout>
          <RouterProvider router={router} />
        </MainLayout>
      </PhantomsProvider>
    </SettingsProvider>
  );
}

export default App;
