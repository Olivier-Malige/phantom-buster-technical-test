import { PhantomLogo } from '../../icons/PhantomLogo';
import { ThemeSelector } from '../ThemeSelector';

const AppBar = () => {
  return (
    <header className="sticky top-0 z-50 bg-base-100/80 backdrop-blur">
      <nav className="container navbar mx-auto">
        <div className="navbar-start">
          <a href="#">
            <PhantomLogo />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <a href="#" className="font-bold text-primary">
            Dashboard
          </a>
        </div>
        <div className="navbar-end">
          <div className="hidden select-none lg:block">
            <ThemeSelector />
          </div>

          <button className="btn-ghost btn-square btn flex lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-5 w-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
};

export { AppBar };
