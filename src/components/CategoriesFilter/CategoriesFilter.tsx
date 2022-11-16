import { useContext, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PhantomsContext } from '../../contexts/phantoms/phantoms.context';
import { FilterButton } from '../FilterButton/FilterButton';

const CategoriesFilter = () => {
  const phantomsContext = useContext(PhantomsContext);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const searchCategoriesParams = searchParams.get('categories');

    phantomsContext?.dispatchSetCategoryFilter(searchCategoriesParams || '');
  }, [searchParams]);

  const handleClick = (category: string, isActive: boolean) => {
    setSearchParams(isActive ? '' : { categories: category });
  };

  const categoriesFilterButtons = useMemo(
    () =>
      phantomsContext?.categories.map((category) => (
        <FilterButton
          key={category}
          isActive={phantomsContext?.filters.category === category}
          name={category}
          onClick={handleClick}
        />
      )),
    [phantomsContext?.filters.category, phantomsContext?.categories]
  );

  return (
    <aside className="hidden lg:flex lg:flex-col ">
      <h3 className="mb-2 text-xs font-medium">Categories</h3>
      {categoriesFilterButtons}
    </aside>
  );
};

export { CategoriesFilter };
