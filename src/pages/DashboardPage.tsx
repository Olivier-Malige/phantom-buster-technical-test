import { useContext } from 'react';

import { CategoriesFilter } from '../components/CategoriesFilter';
import { PhantomsList } from '../components/PhantomsList';
import { SearchInput } from '../components/SearchInput';
import { PhantomsContext } from '../contexts/phantoms/phantoms.context';
import { MainLayout } from '../layouts';

const DashboardPage = () => {
  const phantomsContext = useContext(PhantomsContext);

  return (
    <MainLayout>
      <section className="my-10">
        <div className="flex justify-center lg:justify-start">
          <h1 className="select-none text-3xl font-bold">Dashboard</h1>
        </div>

        <div className="mt-9 flex flex-col lg:flex-row lg:gap-10">
          <div className="hidden min-w-[250px] select-none lg:block">
            <SearchInput />
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
    </MainLayout>
  );
};

export { DashboardPage };
