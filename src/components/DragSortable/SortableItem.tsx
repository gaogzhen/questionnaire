import { FC, ReactNode } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type PropsType = {
  id: string;
  children: ReactNode;
};

const SortableItem: FC<PropsType> = (props: PropsType) => {
  const { id, children } = props;
  const { attributes, listeners, setNodeRef, transition, transform } =
    useSortable({ id });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

export default SortableItem;
