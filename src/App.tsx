import './styles/globals.css';

import { MainLayout } from './layouts';
import { DashboardPage } from './pages';

function App() {
  return (
    <MainLayout>
      <DashboardPage />
    </MainLayout>
  );
}

export default App;
