import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { ReactNode } from 'react';

const SortableItem = ({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div className="relative">
      <div
        {...listeners}
        className="absolute top-0 left-0 z-30 h-6 w-full cursor-grab rounded-t-xl p-2"
      />
      <div ref={setNodeRef} style={style} {...attributes}>
        <div className={isDragging ? 'opacity-40' : ''}>{children}</div>
      </div>
    </div>
  );
};

export { SortableItem };
