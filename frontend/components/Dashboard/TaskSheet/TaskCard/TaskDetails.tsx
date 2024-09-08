import Chip from "@/components/ui/Chip";
import { ITask } from "@/types";
import { Clock3Icon } from "lucide-react";
import { FC } from "react";

const TaskDetails: FC<{ task: ITask; chipVariant: string | any }> = ({
  task,
  chipVariant,
}) => {
  return (
    <div className="bor-3 p-[14px] bg-[--gray-12] border-[--gray-13] border flex flex-col gap-[13px]">
      <div className="flex flex-col gap-1">
        <p className="text-[--primary]">{task.title}</p>
        {task.description && (
          <p className="text-[--gray-1]">{task.description}</p>
        )}
      </div>

      <Chip
        label={task.priority.valueOf()}
        variant={chipVariant}
        classes="self-start"
      />

      {task.deadline && (
        <div className="flex-start gap-2 text-[--primary]">
          <Clock3Icon className="base-icon" />
          <p className="text-sm font-semibold">
            {task.deadline?.toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskDetails;
