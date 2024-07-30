import { ETaskPriority, ETaskStatus, ITask } from "@tasks/types";
import { model, Schema } from "mongoose";

const tasksSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String },
    deadline: { type: Date },
    status: {
      type: String,
      enum: Object.values(ETaskStatus),
      default: ETaskStatus.Todo,
    },
    assignee: { type: Schema.Types.ObjectId, ref: "User" },
    priority: {
      type: String,
      default: ETaskPriority.Medium,
      enum: Object.keys(ETaskPriority),
    },
  },
  { timestamps: true }
);

const Task = model<ITask>("Task", tasksSchema);

export default Task;
