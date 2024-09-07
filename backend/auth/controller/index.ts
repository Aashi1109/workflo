import { comparePassword, generateJWT, hashPassword } from "@auth/lib/helpers";
import {
  ClientError,
  NotFoundError,
  UnauthorizedError,
} from "@common/exceptions";
import { setCookieOnResponse } from "@common/lib/helper";
import UserService from "@user/service";
import { Request, Response } from "express";

export const signup = async (req: Request, res: Response) => {
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

  const generatedJWT = await generateJWT(createdUser);
  setCookieOnResponse(res, "jwt", generatedJWT);
  return res.status(201).json({ success: true, data: createdUser });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email && !password) {
    throw new ClientError("Email and password are required");
  }
  const existingUser = await UserService.getUserByEmail(email, false);
  if (!existingUser)
    throw new NotFoundError(`User with email ${email} not found`);
  const isPasswordValid = await comparePassword(
    password,
    existingUser.password
  );

  if (!isPasswordValid) throw new UnauthorizedError("Invalid credentials");

  const generatedJWT = await generateJWT(existingUser);
  setCookieOnResponse(res, "jwt", generatedJWT);
  return res.json({ success: true, data: existingUser });
};

export const logout = (req: Request, res: Response) => {
  setCookieOnResponse(res, "jwt", "", { expiresIn: 0 });
  return res.json({ success: true, message: "Logged out successfully" });
};
