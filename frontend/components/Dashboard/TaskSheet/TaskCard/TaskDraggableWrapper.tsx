import { EDraggables } from "@/types";
import { FC } from "react";
import { useDrag } from "react-dnd";

const TaskDraggableWrapper: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: EDraggables.Task,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return <div ref={drag}>{children}</div>;
};

export default TaskDraggableWrapper;
