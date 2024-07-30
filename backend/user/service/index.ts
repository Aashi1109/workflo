import { getByFilter } from "@common/lib/helper";
import { IPagination } from "@common/types";
import { getSafeUser } from "@user/lib/utils";
import User from "@user/model";
import { IUser, IUserFilterOptions } from "@user/types";

/**
 * Abstract service class to interact with User database.
 */
class UserService {
  /**
   * Get a user by email.
   * @param {string} email - The email of the user.
   * @param {boolean} [safe=true] - Whether to return the safe user object.
   * @returns {Promise<IUser | null>} The user object or null.
   */
  static async getUserByEmail(
    email: string,
    safe: boolean = true
  ): Promise<IUser | null> {
    const user = await User.findOne({ email: email }).lean();
    return user ? (safe ? getSafeUser(user) : user) : null;
  }

  /**
   * Get a user by ID.
   * @param {string} id - The ID of the user.
   * @param {boolean} [safe=true] - Whether to return the safe user object.
   * @returns {Promise<IUser | null>} The user object or null.
   */
  static async getUserById(
    id: string,
    safe: boolean = true
  ): Promise<IUser | null> {
    const user = await User.findById(id).lean();
    return user ? (safe ? getSafeUser(user) : user) : null;
  }

  /**
   * Create a new user.
   * @param {IUser} data - The user data.
   * @param {boolean} [safe=true] - Whether to return the safe user object.
   * @returns {Promise<IUser>} The created user object.
   */
  static async createUser(data: IUser, safe: boolean = true): Promise<IUser> {
    const user = new User(data);
    const savedUser = (await user.save()).toObject();
    return safe ? getSafeUser(savedUser) : savedUser;
  }

  /**
   * Delete a user by ID.
   * @param {string} id - The ID of the user.
   * @param {boolean} [safe=true] - Whether to return the safe user object.
   * @returns {Promise<IUser | null>} The deleted user object or null.
   */
  static async deleteUser(
    id: string,
    safe: boolean = true
  ): Promise<IUser | null> {
    const user = await User.findByIdAndDelete(id).lean();
    return user ? (safe ? getSafeUser(user) : user) : null;
  }

  /**
   * Update a user by ID.
   * @param {string} id - The ID of the user.
   * @param {Partial<IUser>} data - The updated user data.
   * @param {boolean} [safe=true] - Whether to return the safe user object.
   * @returns {Promise<IUser | null>} The updated user object or null.
   */
  static async updateUser(
    id: string,
    data: Partial<IUser>,
    safe: boolean = true
  ): Promise<IUser | null> {
    const user = await User.findByIdAndUpdate(id, data, { new: true }).lean();
    return user ? (safe ? getSafeUser(user) : user) : null;
  }

  /**
   * Filter tasks based on provided filter and pagination parameters.
   * @param filter Filter params to filter tasks
   * @param paginationOptions Pagination options for tasks
   * @param not The id of the task to exclude in results.
   * @returns List of tasks that match the filter provided.
   */
  static async getByFilter(
    filter: IUserFilterOptions,
    paginationOptions: IPagination,
    not?: string
  ) {
    const results = await getByFilter(User)(filter, paginationOptions, [], not);
    return results;
  }
}

export default UserService;
