import { useContext, useMemo } from 'react';

import { PhantomsContext } from '../../contexts/phantoms/phantoms.context';
import { PhantomCard } from '../PhantomCard';
import { SpinnerLoader } from '../SpinnerLoader';

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

  if (phantomsContext.isLoading)
    return (
      <div className="flex h-96 items-center justify-center">
        <SpinnerLoader />
      </div>
    );

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
