import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import config from "@config";
import { ClientError, UnauthorizedError } from "@common/exceptions";
import { ICustomRequest } from "@common/types";
import logger from "@common/logger";
import { jnstringify } from "@common/lib/utils";

interface ICookieRequest extends ICustomRequest {
  cookie: {
    jwt: string;
  };
}

const checkJwt = (req: ICookieRequest, res: Response, next: NextFunction) => {
  const token = <string>req?.cookies?.jwt;

  if (!token) throw new ClientError("Missing authentication token");

  let jwtPayload;

  try {
    jwtPayload = <any>verify(token, config.jwt.secret, { complete: true });

    (req as ICustomRequest).user = jwtPayload;
  } catch (error) {
    throw new UnauthorizedError("Unauthorized access not allowed");
  }

  return next();
};

export default checkJwt;
