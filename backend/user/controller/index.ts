import { comparePassword, hashPassword } from "@auth/lib/helpers";
import {
  ClientError,
  NotFoundError,
  UnauthorizedError,
} from "@common/exceptions";
import { IRequestPagination } from "@common/types";
import UserService from "@user/service";
import { Request, Response } from "express";

const checkRaiseUserExistence = async (userId: string) => {
  const existingUser = await UserService.getUserById(userId);

  if (!existingUser) {
    throw new NotFoundError(`User with userId: ${userId} does not exist`);
  }
  return existingUser;
};

export const createUser = async (req: Request, res: Response) => {
  const { email, fullname, password } = req.body;

  // check if email already exists or not
  const existingUser = await UserService.getUserByEmail(email);
  if (existingUser)
    throw new ClientError(`User with email: '${email}' already exists`);

  // hash the password before creating the user
  const hashedPassword = await hashPassword(password);

  const createdUser = await UserService.createUser({
    email,
    password: hashedPassword,
    fullname,
  });

  return res.json({ success: true, data: createdUser });
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { fullname } = req.body;

  await checkRaiseUserExistence(id);

  const updatedUser = await UserService.updateUser(id, { fullname });
  return res.json({ success: true, data: updatedUser });
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  await checkRaiseUserExistence(id);

  const deletedUser = await UserService.deleteUser(id);
  return res.json({ success: true, data: deletedUser });
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const existingUser = await checkRaiseUserExistence(id);

  return res.json({ success: true, data: existingUser });
};

export const filterUsers = async (req: IRequestPagination, res: Response) => {
  const { id, email, not } = req.params;
  const filteredUsers = await UserService.getByFilter(
    { userId: id, email: email },
    req.pagination,
    not
  );

  return filteredUsers;
};

export const updateUserPassword = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { currentPassword, newPassword } = req.body;

  const existingUser = await checkRaiseUserExistence(id);

  const isPasswordValid = await comparePassword(
    currentPassword,
    existingUser.password
  );

  if (!isPasswordValid) throw new UnauthorizedError("Invalid credentials");

  const hashedPassword = await hashPassword(newPassword);

  const updatedUser = await UserService.updateUser(id, {
    password: hashedPassword,
  });

  return res.json({ success: true, data: updatedUser });
};
