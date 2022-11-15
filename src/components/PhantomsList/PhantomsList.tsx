import { useContext, useMemo } from 'react';

import { PhantomsContext } from '../../contexts/phantoms/phantoms.context';
import { PhantomCard } from '../PhantomCard';

const PhantomsList = () => {
  const phantomsContext = useContext(PhantomsContext);

  if (!phantomsContext) {
    return null;
  }

  const filteredPhantoms = useMemo(() => {
    if (phantomsContext.filters.category !== '') {
      return phantomsContext.phantoms.filter((phantom) =>
        phantom.manifest.tags.categories.includes(
          phantomsContext.filters.category
        )
      );
    }
    return phantomsContext.phantoms;
  }, [phantomsContext.filters.category, phantomsContext.phantoms]);

  return (
    <div className="flex flex-col gap-4">
      {filteredPhantoms.map((phantom) => (
        <PhantomCard
          key={phantom.id}
          id={phantom.id}
          name={phantom.name}
          nextLaunchIn={phantom.nextLaunchIn}
          repeatedLaunchTimes={phantom.repeatedLaunchTimes?.simplePreset}
          launchType={phantom.launchType}
          onDelete={phantomsContext.dispatchDelete}
          onDuplicate={phantomsContext.dispatchDuplicate}
          onRename={phantomsContext.dispatchRename}
        />
      ))}
    </div>
  );
};

export { PhantomsList };
