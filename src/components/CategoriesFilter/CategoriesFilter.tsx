import { useContext, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PhantomsContext } from '../../contexts/phantoms/phantoms.context';
import { FilterButton } from '../FilterButton/FilterButton';

const KEY = 'category';

const CategoriesFilter = () => {
  const phantomsContext = useContext(PhantomsContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = (category: string, isActive: boolean) => {
    setSearchParams((prev) => {
      if (isActive) {
        prev.delete(KEY);
      } else {
        prev.set(KEY, category);
      }
      return prev;
    });
  };
  const categorySearchParams = searchParams.get(KEY);

  const categoriesFilterButtons = useMemo(
    () =>
      phantomsContext?.categories.map((category) => (
        <FilterButton
          key={category}
          isActive={categorySearchParams === category}
          name={category}
          onClick={handleClick}
        />
      )),
    [searchParams, phantomsContext?.categories]
  );

  return (
    <aside>
      <h3 className="mb-2 text-xs font-medium">Categories</h3>
      {categoriesFilterButtons}
    </aside>
  );
};

export { CategoriesFilter };
