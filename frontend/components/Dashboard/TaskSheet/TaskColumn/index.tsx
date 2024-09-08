import Button from "@/components/ui/button";
import { EDraggables, ETaskStatus, ITask } from "@/types";
import { FilterIcon, Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { useDrop } from "react-dnd";
import TaskCard from "../TaskCard";

interface IProps {
  widthPercent: string;
  header: string;
  tasks: ITask[];
  columnIdentifier: ETaskStatus;
}
const TaskColumn = ({
  widthPercent,
  header,
  tasks,
  columnIdentifier,
}: IProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: EDraggables.Task,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));
  return (
    <div
      className={`flex flex-1 flex-col w-[${widthPercent}%] bg-[--white] gap-[--Size-S]`}
      ref={drop}
    >
      <div className="flex-between text-[--gray-11]">
        <p className="text-xl">{header}</p>
        <FilterIcon className="base-icon" />
      </div>

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
    </div>
  );
};

export default TaskColumn;
