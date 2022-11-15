import { useContext, useMemo } from 'react';

import { PhantomsContext } from '../../contexts/phantoms/phantoms.context';
import { FilterButton } from '../FilterButton/FilterButton';

const CategoriesFilter = () => {
  const phantomsContext = useContext(PhantomsContext);

  const handleClick = (category: string, isActive: boolean) => {
    phantomsContext?.dispatchSetCategoryFilter(isActive ? '' : category);
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
