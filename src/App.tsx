import './styles/globals.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { PhantomsProvider } from './contexts/phantoms/phantoms.context';
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
    <PhantomsProvider>
      <MainLayout>
        <RouterProvider router={router} />
      </MainLayout>
    </PhantomsProvider>
  );
}

export default App;
