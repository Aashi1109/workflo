// taskController.ts

import { NotFoundError } from "@common/exceptions";
import { IRequestPagination } from "@common/types";
import TaskService from "@tasks/service";
import { Request, Response } from "express";

/**
 * Creates a new task for a specific user.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
export const createTask = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { status, description, priority, title, deadline } = req.body;
  const task = await TaskService.create({
    assignee: userId as any,
    status,
    description,
    priority,
    title,
    deadline,
  });
  res.status(201).json({ success: true, data: task });
};

/**
 * Retrieves a task by its ID for a specific user.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
export const getTaskById = async (req: Request, res: Response) => {
  const { taskId, userId } = req.params;
  const task = await TaskService.getById(taskId, userId);

  if (!task) {
    throw new NotFoundError(`Task with taskId ${taskId} not found`);
  }
  return res.json({ success: true, data: task });
};

/**
 * Updates a task by its ID for a specific user.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
export const updateTaskById = async (req: Request, res: Response) => {
  const { taskId, userId } = req.params;

  const { priority, deadline, status, description, title } = req.body;
  const existingTask = await TaskService.getById(taskId, userId);

  if (!existingTask)
    throw new NotFoundError(`Task with taskId ${taskId} not found`);

  const updatedTask = await TaskService.update(taskId, userId, {
    priority: priority || existingTask.priority,
    deadline: deadline || existingTask.deadline,
    description: description || existingTask.description,
    status: status || existingTask.status,
    title: title || existingTask.title,
  });

  return res.json({ data: updatedTask, success: true });
};

/**
 * Deletes a task by its ID for a specific user.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
export const deleteTaskById = async (req: Request, res: Response) => {
  const { taskId, userId } = req.params;
  const task = await TaskService.getById(taskId, userId);

  if (!task) {
    throw new NotFoundError(`Task with taskId ${taskId} not found`);
  }
  const deletedTask = await TaskService.delete(taskId, userId);
  return res.json({ data: deletedTask, success: true });
};

export const filterTasks = async (req: IRequestPagination, res: Response) => {
  const { assignee, taskId, not } = req.params;

  const tasks = await TaskService.getByFilter(
    { assignee, taskId },
    req.pagination,
    not
  );

  return tasks;
};
