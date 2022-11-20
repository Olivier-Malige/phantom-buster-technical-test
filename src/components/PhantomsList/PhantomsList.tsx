import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PhantomsContext } from '../../contexts/phantoms/phantoms.context';
import { PhantomCard } from '../PhantomCard';
import { SortableItem } from '../SortableItem/SortableItem';
import { SpinnerLoader } from '../SpinnerLoader';

const PhantomsList = () => {
  const phantomsContext = useContext(PhantomsContext);
  const [searchParams] = useSearchParams();

  const filteredPhantoms = useMemo(() => {
    const searchParamsCategory = searchParams.get('category');
    const searchParamsSearch = searchParams.get('search');

    let result = phantomsContext?.phantoms;
    if (result) {
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
    }

    return result;
  }, [searchParams, phantomsContext?.phantoms]);

  const [items, setItems] = useState(filteredPhantoms || []);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);

  useEffect(() => {
    if (filteredPhantoms) setItems(filteredPhantoms);
  }, [filteredPhantoms]);

  const handleDragStart = (event: DragStartEvent) => {
    if (items) {
      const newActiveItem = items.find(
        (elem) => Number(elem.id) === Number(event.active.id)
      );

      if (newActiveItem) {
        setActiveItemId(newActiveItem.id);
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id && items) {
      setItems((prevItems) => {
        if (prevItems) {
          const oldIndex = prevItems.findIndex(
            (item) => Number(item.id) === Number(active.id)
          );
          const newIndex = prevItems.findIndex(
            (item) => Number(item.id) === Number(over.id)
          );

          return arrayMove(items, oldIndex, newIndex);
        }
        return items;
      });
    }
  };

  const activeItem = useMemo(
    () => (items ? items.find((item) => item.id === activeItemId) : null),
    [activeItemId, items]
  );

  if (!phantomsContext || phantomsContext.isLoading)
    return (
      <div className="flex h-full max-w-3xl items-center justify-center">
        <SpinnerLoader />
      </div>
    );

  return (
    <div className="flex max-w-3xl flex-col gap-4">
      <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
        <SortableContext items={items}>
          {items.map((phantom) => (
            <SortableItem key={phantom.id} id={phantom.id}>
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
            </SortableItem>
          ))}
          <DragOverlay>
            {activeItem ? (
              <div className="cursor-grabbing">
                <PhantomCard
                  id={activeItem.id}
                  name={activeItem.name}
                  launchType={activeItem.launchType}
                  repeatedLaunchTimes={
                    activeItem.repeatedLaunchTimes?.simplePreset
                  }
                  onDelete={() => null}
                  onDuplicate={() => null}
                  onRename={() => null}
                />
              </div>
            ) : null}
          </DragOverlay>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export { PhantomsList };
