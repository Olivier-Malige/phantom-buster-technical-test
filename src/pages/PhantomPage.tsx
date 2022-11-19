import { useContext } from 'react';
import { useParams } from 'react-router-dom';

import { PhantomCard } from '../components/PhantomCard';
import { PhantomsContext } from '../contexts/phantoms/phantoms.context';
import { MainLayout } from '../layouts';

const PhantomPage = () => {
  const { phantomId } = useParams();
  const phantomsContext = useContext(PhantomsContext);
  const currentPhantom = phantomsContext?.phantoms.find(
    (phantom) => phantom.id === phantomId
  );

  if (!phantomsContext || !currentPhantom) return null;

  return (
    <MainLayout>
      <div className="mt-10 flex">
        <div className="flex-1">
          <PhantomCard
            key={currentPhantom.id}
            id={currentPhantom.id}
            name={currentPhantom.name}
            nextLaunchIn={currentPhantom.nextLaunchIn}
            repeatedLaunchTimes={
              currentPhantom.repeatedLaunchTimes?.simplePreset
            }
            launchType={currentPhantom.launchType}
            onDelete={phantomsContext.dispatchDelete}
            onDuplicate={phantomsContext.dispatchDuplicate}
            onRename={phantomsContext.dispatchRename}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export { PhantomPage };
