import './styles/globals.css';

import { PhantomsProvider } from './contexts/phantoms/phantoms.context';
import { MainLayout } from './layouts';
import { DashboardPage } from './pages';

function App() {
  return (
    <PhantomsProvider>
      <MainLayout>
        <DashboardPage />
      </MainLayout>
    </PhantomsProvider>
  );
}

export default App;
