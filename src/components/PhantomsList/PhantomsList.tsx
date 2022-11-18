import { useContext, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PhantomsContext } from '../../contexts/phantoms/phantoms.context';
import { PhantomCard } from '../PhantomCard';
import { SpinnerLoader } from '../SpinnerLoader';

const PhantomsList = () => {
  const phantomsContext = useContext(PhantomsContext);
  const [searchParams] = useSearchParams();

  if (!phantomsContext) {
    return null;
  }

  const filteredPhantoms = useMemo(() => {
    const searchParamsCategory = searchParams.get('category');
    const searchParamsSearch = searchParams.get('search');

    let result = phantomsContext.phantoms;

    if (searchParamsCategory !== '' && searchParamsCategory !== null) {
      result = result.filter((phantom) =>
        phantom.manifest.tags.categories.includes(searchParamsCategory)
      );
    }

    if (searchParamsSearch !== '' && searchParamsSearch !== null) {
      result = result.filter((phantom) => {
        return phantom.name.toLowerCase().includes(searchParamsSearch);
      });
    }

    return result;
  }, [searchParams, phantomsContext.phantoms]);

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
