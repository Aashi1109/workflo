import Chip from "@/components/ui/Chip";
import { ETaskPriority, ITask } from "@/types";
import { Clock3Icon } from "lucide-react";

interface IProps {
  task: ITask;
}

const getTaskChipVariant = (priority: ETaskPriority) => {
  switch (priority) {
    case ETaskPriority.Low:
      return "success";
    case ETaskPriority.Medium:
      return "warning";
    case ETaskPriority.Urgent:
      return "danger";
  }
};
const TaskCard = ({ task }: IProps) => {
  const chipVariant = getTaskChipVariant(task.priority);
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

export default TaskCard;
