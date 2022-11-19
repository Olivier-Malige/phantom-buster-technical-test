import { Link, useLocation } from 'react-router-dom';

import { RouterPaths } from '../../router';
import { HamburgerSVG } from '../svg';
import { PhantomLogoSVG } from '../svg/PhantomLogoSVG';
import { ThemeSelector } from '../ThemeSelector';

const AppBar = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-base-100/80 backdrop-blur">
      <nav className="container navbar mx-auto">
        <div className="navbar-start">
          <Link to={RouterPaths.ROOT}>
            <PhantomLogoSVG />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <Link
            to={RouterPaths.DASHBOARD}
            className={
              location.pathname === RouterPaths.DASHBOARD
                ? 'font-bold  text-primary'
                : 'font-semibold'
            }
          >
            Dashboard
          </Link>
        </div>
        <div className="navbar-end">
          <div className="hidden select-none lg:block">
            <ThemeSelector />
          </div>

          <button className="btn-ghost btn-square btn flex lg:hidden">
            <HamburgerSVG />
          </button>
        </div>
      </nav>
    </header>
  );
};

export { AppBar };
