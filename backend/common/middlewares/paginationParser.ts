import { IRequestPagination } from "@common/types";
import { NextFunction, Request, Response } from "express";

const paginationParser = (
  req: IRequestPagination,
  res: Response,
  next: NextFunction
) => {
  // extract pagination query parameters
  const { limit, sortBy, sortOrder, doPopulate, pageNumber } = req.params;
  const parsedLimit = limit ? +(limit ?? 10) : null;
  const parsedPageNumber = +(pageNumber ?? 1);
  const parsedSortBy =
    sortBy !== "createdAt" && sortBy !== "updatedAt" ? null : sortBy;

  const parsedSortOrder =
    sortOrder !== "asc" && sortOrder !== "desc" ? null : sortOrder;
  const parsedDoPopulate = !!doPopulate;

  // add parsed pagination parameters to request object
  req.pagination = {
    limit: parsedLimit,
    sortBy: parsedSortBy,
    sortOrder: parsedSortOrder,
    doPopulate: parsedDoPopulate,
    pageNumber: parsedPageNumber,
  };

  return next();
};

export default paginationParser;
