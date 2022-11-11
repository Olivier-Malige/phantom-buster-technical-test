import type { ReactNode } from 'react';

import { AppBar } from '../components/AppBar';
import { Footer } from '../components/Footer';

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div data-theme="light" className="bg-base-300">
      <AppBar />
      <div className="container m-auto min-h-screen p-2">{children}</div>
      <Footer />
    </div>
  );
};

export { MainLayout };