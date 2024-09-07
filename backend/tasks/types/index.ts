import { Types } from "mongoose";

export interface ITask {
  title: string;
  description?: string;
  status: ETaskStatus;
  priority?: ETaskPriority;
  deadline?: Date;
  assignee: Types.ObjectId;
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

export interface ITaskFilterOptions {
  assignee?: string;
  taskId?: string;
}
