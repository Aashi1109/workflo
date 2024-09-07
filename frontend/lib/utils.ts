import { ETaskPriority } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTaskPriorityChipColor = (priority: ETaskPriority) => {
  switch (priority) {
    case ETaskPriority.Low:
      return "--success";
    case ETaskPriority.Medium:
      return "--orange";
    case ETaskPriority.Urgent:
      return "--danger";
    default:
      return "--success";
  }
};
