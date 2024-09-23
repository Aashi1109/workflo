import Button from "@/components/ui/button";
import { EDraggables, ETaskStatus, ITask } from "@/types";
import { FilterIcon, Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { useDrop } from "react-dnd";
import TaskCard from "../TaskCard";
import { canDropTaskInColumn } from "@/lib/helpers";

interface IProps {
  widthPercent: string;
  header: string;
  tasks: ITask[];
  columnIdentifier: ETaskStatus;
  setColumnData: Function;
}
const TaskColumn = ({
  widthPercent,
  header,
  tasks,
  columnIdentifier,
  setColumnData,
}: IProps) => {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: EDraggables.Task,
    canDrop: (item: { id: string; status: ETaskStatus }) =>
      canDropTaskInColumn(columnIdentifier, item.status),
    drop: (item: { id: string; status: ETaskStatus }) =>
      handleDrop(item.id, columnIdentifier),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  const handleDrop = (taskId: string, newStatus: ETaskStatus) => {
    setColumnData((prevData: [ETaskStatus: ITask[]]) => {
      const newColumnData = { ...prevData };

      // Find the task in the previous status column and remove it
      let draggedTask;
      for (const status in newColumnData) {
        const index = newColumnData[status].findIndex(
          (task) => task.id === taskId
        );
        if (index !== -1) {
          draggedTask = newColumnData[status].splice(index, 1)[0];
          break;
        }
      }

      // Update the task's status and push it to the new status column
      if (draggedTask) {
        draggedTask.status = newStatus;
        newColumnData[newStatus].push(draggedTask);
      }

      return newColumnData;
    });
  };

  return (
    <div
      className={`flex flex-1 flex-col w-[${widthPercent}%] bg-[--white] gap-[--Size-S]`}
      ref={drop}
    >
      <div className="flex-between text-[--gray-11]">
        <p className="text-xl">{header}</p>
        <FilterIcon className="base-icon" />
      </div>

      {isOver ? (
        <div
          className={cn("flex-1 flex-center border border-dashed bor-3", {
            "bg-red-50": !canDrop,
          })}
        >
          <p className="text-[var(--gray-9)]">
            {!canDrop ? "Cannot drop here" : `Move to ${header}`}
          </p>
        </div>
      ) : (
        <>
          {/* container for cards */}
          <div
            className={cn(
              "flex-1 overflow-y-auto overflow-x-hidden flex-col flex gap-[--Size-S]",
              {
                hidden: !tasks.length,
              }
            )}
          >
            {tasks.map((_task) => (
              <TaskCard key={_task.id} task={_task} />
            ))}
          </div>

          <Button
            variant="secondary"
            label="Add new"
            icon={<Plus className="base-icon" />}
            classes={"justify-between px-2"}
          />
        </>
      )}
    </div>
  );
};

export default TaskColumn;
