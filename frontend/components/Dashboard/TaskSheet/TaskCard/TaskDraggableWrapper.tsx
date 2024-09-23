import { cn } from "@/lib/utils";
import { EDraggables, ETaskStatus } from "@/types";
import { FC } from "react";
import { useDrag } from "react-dnd";

const TaskDraggableWrapper: FC<{
  children: React.ReactNode;
  taskId: string;
  taskStatus: ETaskStatus;
}> = ({ children, taskId, taskStatus }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: EDraggables.Task,
    item: { id: taskId, status: taskStatus },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={cn(isDragging ? "opacity-50" : "opacity-100", "bor-3")}
    >
      {children}
    </div>
  );
};

export default TaskDraggableWrapper;
