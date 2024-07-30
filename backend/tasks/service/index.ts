import { getByFilter } from "@common/lib/helper";
import { IPagination } from "@common/types";
import Task from "@tasks/model";
import { ITask, ITaskFilterOptions } from "@tasks/types";

/**
 * Service class for managing tasks.
 */
class TaskService {
  /**
   * Creates a new task.
   * @param {Partial<ITask>} data - The task data.
   * @returns {Promise<ITask>} The created task.
   */
  static async create(data: ITask): Promise<ITask> {
    const task = new Task(data);
    return (await task.save()).toObject();
  }

  /**
   * Retrieves a task by its ID.
   * @param {string} id - The task ID.
   * @returns {Promise<ITask | null>} The task, or null if not found.
   */
  static async getById(id: string): Promise<ITask | null> {
    return await Task.findById(id);
  }

  /**
   * Updates a task by its ID.
   * @param {string} id - The task ID.
   * @param {Partial<ITask>} data - The updated task data.
   * @returns {Promise<ITask | null>} The updated task, or null if not found.
   */
  static async update(id: string, data: Partial<ITask>): Promise<ITask | null> {
    return await Task.findByIdAndUpdate(id, data, { new: true });
  }

  /**
   * Deletes a task by its ID.
   * @param {string} id - The task ID.
   * @returns {Promise<ITask | null>} The deleted task, or null if not found.
   */
  static async delete(id: string): Promise<ITask | null> {
    return await Task.findByIdAndDelete(id);
  }

  /**
   * Filter tasks based on provided filter and pagination parameters.
   * @param filter Filter params to filter tasks
   * @param paginationOptions Pagination options for tasks
   * @param not The id of the task to exclude in results.
   * @returns List of tasks that match the filter provided.
   */
  static async getByFilter(
    filter: ITaskFilterOptions,
    paginationOptions: IPagination,
    not?: string
  ) {
    const results = await getByFilter(Task)(
      filter,
      paginationOptions,
      ["assignee"],
      not
    );
    return results;
  }
}

export default TaskService;
