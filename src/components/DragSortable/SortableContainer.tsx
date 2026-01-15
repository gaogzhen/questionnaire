import { FC, ReactNode } from "react";
import {
  DndContext,
  MouseSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

type PropsType = {
  children: ReactNode; // 使用 ReactNode 替代 JSX.Element，更灵活且类型安全
  items: Array<{ id: string; [key: string]: any }>;
  onDragEnd: (oldIndex: number, newIndex: number) => void;
};

const SortableContainer: FC<PropsType> = (props: PropsType) => {
  const { children, items, onDragEnd } = props;

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8, // 鼠标移动8px后才激活拖拽
      },
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over == null) {
      return;
    }
    if (active.id === over.id) {
      return;
    }
    const oldIndex = items.findIndex(
      (item: { id: string }) => item.id === active.id,
    );
    const newIndex = items.findIndex(
      (item: { id: string }) => item.id === over.id,
    );
    onDragEnd(oldIndex, newIndex);
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  );
};

export default SortableContainer;
