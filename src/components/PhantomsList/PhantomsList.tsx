import type { DragEndEvent } from '@dnd-kit/core';
import {
  closestCenter,
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useContext, useState } from 'react';

// import { useSearchParams } from 'react-router-dom';
import { PhantomsContext } from '../../contexts/phantoms/phantoms.context';
import { PhantomCard } from '../PhantomCard';
import { SortableItem } from '../SortableItem/SortableItem';
import { SpinnerLoader } from '../SpinnerLoader';

const PhantomsList = () => {
  const phantomsContext = useContext(PhantomsContext);
  // const [searchParams] = useSearchParams();

  if (!phantomsContext) {
    return null;
  }

  if (phantomsContext.isLoading)
    return (
      <div className="flex h-96 items-center justify-center">
        <SpinnerLoader />
      </div>
    );

  // const filteredPhantoms = useMemo(() => {
  //   const searchParamsCategory = searchParams.get('category');
  //   const searchParamsSearch = searchParams.get('search');

  //   let result = phantomsContext.phantoms;

  //   if (searchParamsCategory !== '' && searchParamsCategory !== null) {
  //     result = result.filter((phantom) =>
  //       phantom.manifest.tags.categories.includes(searchParamsCategory)
  //     );
  //   }

  //   if (searchParamsSearch !== '' && searchParamsSearch !== null) {
  //     result = result.filter((phantom) => {
  //       return phantom.name.toLowerCase().includes(searchParamsSearch);
  //     });
  //   }

  //   return result;
  // }, [searchParams, phantomsContext.phantoms]);

  const [items, setItems] = useState(phantomsContext.phantoms);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((prevItems) => {
        const oldIndex = prevItems.findIndex((item) => item.id === active.id);
        const newIndex = prevItems.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: 50,
        tolerance: 10,
      },
    }),
    useSensor(TouchSensor)
  );
  console.log(items);

  return (
    <div className="flex flex-col gap-4">
      <DndContext
        onDragEnd={handleDragEnd}
        collisionDetection={closestCenter}
        sensors={sensors}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items
            .sort((a, b) => Number(a.id) - Number(b.id))
            .map((phantom) => (
              <SortableItem key={phantom.id} id={Number(phantom.id)}>
                <PhantomCard
                  key={phantom.id}
                  id={phantom.id}
                  name={phantom.name}
                  nextLaunchIn={phantom.nextLaunchIn}
                  repeatedLaunchTimes={
                    phantom.repeatedLaunchTimes?.simplePreset
                  }
                  launchType={phantom.launchType}
                  onDelete={phantomsContext.dispatchDelete}
                  onDuplicate={phantomsContext.dispatchDuplicate}
                  onRename={phantomsContext.dispatchRename}
                />
              </SortableItem>
            ))}
          <DragOverlay>
            <PhantomCard
              id={'123'}
              name={'toto'}
              launchType={'manually'}
              onDelete={() => null}
              onDuplicate={() => null}
              onRename={() => null}
            />
          </DragOverlay>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export { PhantomsList };
