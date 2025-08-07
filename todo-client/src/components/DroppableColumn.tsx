import { useDroppable } from "@dnd-kit/core";
import { type ReactNode } from "react";

interface Props {
  id: string;
  children: ReactNode;
}

const DroppableColumn = ({ id, children }: Props) => {
  const { setNodeRef } = useDroppable({
    id, 
  });

  return (
    <div ref={setNodeRef} className="">
      {children}
    </div>
  );
};

export default DroppableColumn;
