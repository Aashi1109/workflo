import { ClientError } from "@common/exceptions";
import { extractErrors, jnstringify } from "@common/lib/utils";
import logger from "@common/logger";

import Ajv from "ajv";
import ajvErrors from "ajv-errors";
import ajvKeywords from "ajv-keywords";
import { NextFunction, Request, Response } from "express";

const ajv = new Ajv({ allErrors: true, $data: true });

ajvKeywords(ajv);
ajvErrors(ajv);

// ajv.addSchema(userCreateSchema, USER_CREATE_SCHEMA);
// ajv.addSchema(userUpdateSchema, USER_UPDATE_SCHEMA);
// ajv.addSchema(userPasswordUpdateSchema, USER_PASSWORD_UPDATE_SCHEMA);

// ajv.addSchema(taskCreateSchema, TASK_CREATE_SCHEMA);
// ajv.addSchema(taskUpdateSchema, TASK_UPDATE_SCHEMA);

/**
 * Validates request body with the provide AJV schema
 * @param schemaName The name of the schema to validate req against.
 * @returns A validator function.
 */
export const validateRequestBody =
  (schemaName: string) =>
  (
    /**
     * Validates user's input data.
     * @function validateUser
     * @param {Request} req - The Express request object.
     * @param {Response} res - The Express response object.
     * @param {NextFunction} next - The next function
     * @return {NextFunction} The Next function for calling the next callback in the sequence
     */
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const validationSchema = ajv.getSchema(schemaName);
    const isValid = validationSchema(req.body);

    logger.debug(`${schemaName} schema validation result: ${isValid}`);

    if (!isValid) {
      // to make readable error messages
      // Approach 1. custom function to extract errors messages
      const validationErrors = extractErrors(validationSchema.errors);

      // Approach 2. using better-ajv-errors package
      // const userValidationErrors = betterAjvErrors({
      //   schema: user_schema,
      //   data: req.body,
      //   errors: validationSchema.errors,
      // });

      logger.debug(jnstringify(validationErrors));
      throw new ClientError(
        `${schemaName} field validation failed`,
        validationErrors
      );
    }
    return next();
  };

// export const validateUserCreate = validateRequestBody(USER_CREATE_SCHEMA);

// export const validateUserUpdate = validateRequestBody(USER_UPDATE_SCHEMA);
// export const validateUserPasswordUpdate = validateRequestBody(
//   USER_PASSWORD_UPDATE_SCHEMA
// );

// export const validateTaskCreate = validateRequestBody(TASK_CREATE_SCHEMA);
// export const validateTaskUpdate = validateRequestBody(TASK_UPDATE_SCHEMA);

export default ajv;
