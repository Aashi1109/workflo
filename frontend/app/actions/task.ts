import config from "@/config";
import { createQueryParams } from "@/lib/helpers";
import { ETaskPriority, ETaskStatus, ITask } from "@/types";
import axios from "axios";

const baseUrl = config.apiUrl + "/tasks";

const createTask = async (task: ITask) => {
  const response = await axios.post(baseUrl, task);
  const result = response.data;
};

const deleteTask = async (taskId: string) => {
  const requestUrl = baseUrl + `/${taskId}`;
  const request = await axios.delete(requestUrl);
  return request.data;
};

const updateTask = async (taskId: string, updateData: Partial<ITask>) => {
  const requestUrl = baseUrl + `/${taskId}`;
  const request = await axios.patch(requestUrl, updateData);
  return request.data;
};

const getTaskByFilter = async (
  taskId?: string,
  status?: ETaskStatus,
  priority?: ETaskPriority
) => {
  const requestUrl =
    baseUrl + "/query" + createQueryParams({ taskId, status, priority });

  const request = await axios.get(requestUrl);
  return request.data;
};

export { deleteTask, updateTask, getTaskByFilter, createTask };
