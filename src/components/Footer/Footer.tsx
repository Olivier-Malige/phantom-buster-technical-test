import { PhantomLogo } from '../shared/PhantomLogo';

const Footer = () => {
  return (
    <footer className="footer bg-base-100">
      <div className="container mx-auto my-10 flex items-center p-2">
        <PhantomLogo />
        <h2 className="flex items-center gap-2 text-lg font-semibold text-neutral">
          PhantomBuster
          <span className="text-sm font-normal">technical test</span>
        </h2>
      </div>
    </footer>
  );
};

export { Footer };
