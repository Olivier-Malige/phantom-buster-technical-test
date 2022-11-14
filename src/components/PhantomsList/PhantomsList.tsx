import { useContext } from 'react';

import { PhantomsContext } from '../../context/phantomsContext';
import { PhantomCard } from '../PhantomCard';

const PhantomsList = () => {
  const phantomsContext = useContext(PhantomsContext);

  if (!phantomsContext) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      {phantomsContext.phantoms.map((phantom) => (
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
