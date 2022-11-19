import './styles/globals.css';

import { RouterProvider } from 'react-router-dom';

import { PhantomsProvider } from './contexts/phantoms/phantoms.context';
import { SettingsProvider } from './contexts/settings/settings.context';
import { router } from './router';

function App() {
  return (
    <SettingsProvider>
      <PhantomsProvider>
        <RouterProvider router={router} />
      </PhantomsProvider>
    </SettingsProvider>
  );
}

export default App;
