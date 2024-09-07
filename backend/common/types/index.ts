import { IUser } from "@user/types";
import { Request } from "express";

export interface ICustomRequest extends Request {
  user: IUser;
}

export interface IValidationError {
  field: string;
  message: string;
}

export interface IPagination {
  limit?: number;
  sortBy?: "createdAt" | "updatedAt";
  sortOrder?: "asc" | "desc";
  pageNumber?: number;
  doPopulate?: boolean;
}

export interface IRequestPagination extends Request {
  pagination: IPagination;
}
