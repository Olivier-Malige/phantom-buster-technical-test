import { Link } from 'react-router-dom';

import { MainLayout } from '../layouts';

const NotFounded = () => (
  <MainLayout>
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="flex max-w-md flex-col gap-10">
          <h1 className="text-5xl font-bold">Page not found</h1>
          <Link className="text-xl font-bold text-primary" to={'/'}>
            Return to the dashboard
          </Link>
        </div>
      </div>
    </div>
  </MainLayout>
);

export { NotFounded };
