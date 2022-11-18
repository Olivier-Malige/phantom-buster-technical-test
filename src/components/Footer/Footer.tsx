import { PhantomLogo } from '../../icons/PhantomLogo';

const Footer = () => {
  return (
    <footer className="footer bg-base-100">
      <div className="container mx-auto my-10 flex gap-2 p-2">
        <div className="animate-pulse">
          <PhantomLogo />
        </div>

        <h2 className="flex flex-col  text-lg font-semibold">
          PhantomBuster
          <div>
            <span className="text-sm font-normal">technical test </span>
            <span className="text-sm font-bold text-secondary">
              By Olivier Malige
            </span>
          </div>
        </h2>
      </div>
    </footer>
  );
};

export { Footer };
