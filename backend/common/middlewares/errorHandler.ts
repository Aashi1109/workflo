import { CustomError } from '@common/exceptions';
import { IResponseError } from '@common/exceptions/customError';
import logger from '@common/logger';
import { NextFunction, Request, Response } from 'express';

/**
 * Handles errors and sends appropriate HTTP responses.
 * @function errorHandler
 * @param {any} err - The error object.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next function.
 */
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(err);

  // Check if the error is an instance of CustomError
  if (!(err instanceof CustomError)) {
    // If not a CustomError, send a generic internal server error response
    return res.status(500).json({
      message: 'Internal server error. Try again later',
      success: false,
    });
  } else {
    const customError = err as CustomError;
    let response = { errors: { message: customError.message, name: customError.name } } as IResponseError;

    // Include additional information in the response if available
    if (customError.additionalInfo) {
      response.errors.additionalInfo = customError.additionalInfo;
    }

    // Send a JSON response with the appropriate status code and error message
    return res
      .status(customError.status)
      .type('json')
      .send(JSON.stringify({ ...response, success: false }));
  }
};

export default errorHandler;
