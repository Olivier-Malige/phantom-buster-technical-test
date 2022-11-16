import type { ReactNode } from 'react';
import { useContext } from 'react';

import { AppBar } from '../components/AppBar';
import { Footer } from '../components/Footer';
import { SettingsContext } from '../contexts/settings/settings.context';

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  const settingsContext = useContext(SettingsContext);
  return (
    <div data-theme={settingsContext?.selectedTheme} className="bg-base-300">
      <AppBar />
      <div className="container m-auto min-h-screen p-2">{children}</div>
      <Footer />
    </div>
  );
};

export { MainLayout };
