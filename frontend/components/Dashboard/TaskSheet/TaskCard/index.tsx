import { ETaskPriority, ITask } from "@/types";
import TaskDetails from "./TaskDetails";
import TaskDraggableWrapper from "./TaskDraggableWrapper";

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
    <TaskDraggableWrapper taskId={task.id} taskStatus={task.status}>
      <TaskDetails task={task} chipVariant={chipVariant} />
    </TaskDraggableWrapper>
  );
};

export default TaskCard;
