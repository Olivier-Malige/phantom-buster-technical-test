import { useContext } from 'react';

import { CategoriesFilter } from '../components/CategoriesFilter';
import { PhantomsList } from '../components/PhantomsList';
import { PhantomsContext } from '../contexts/phantoms/phantoms.context';

const DashboardPage = () => {
  const phantomsContext = useContext(PhantomsContext);

  return (
    <section className="my-10">
      <div className="flex justify-center lg:justify-start">
        <h1 className="select-none text-3xl font-bold">Dashboard</h1>
      </div>

      <div className="mt-9 flex flex-col lg:flex-row lg:gap-10">
        <div className="min-w-[250px] select-none">
          <input
            type="text"
            placeholder="Search"
            className="input-bordered input input-md mb-8 w-full max-w-xs"
          />
          <CategoriesFilter />
          <div
            className="btn-accent btn-xs btn mt-4"
            onClick={() => phantomsContext?.reset()}
          >
            Reset phantoms
          </div>
        </div>
        <div className="flex-1">
          <PhantomsList />
        </div>
      </div>
    </section>
  );
};

export { DashboardPage };
