export interface ITask {
  id: string;
  title: string;
  description?: string;
  status: ETaskStatus;
  priority: ETaskPriority;
  deadline?: Date;
  assignee: string;
}

export enum ETaskStatus {
  Todo = "Todo",
  InProgress = "InProgress",
  UnderReview = "UnderReview",
  Finished = "Finished",
}

export enum ETaskPriority {
  Low = "Low",
  Medium = "Medium",
  Urgent = "Urgent",
}

export enum EDraggables {
  Task = "Task",
}
