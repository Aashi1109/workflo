/**
 * Recursively normalize the input by trimming whitespace from strings,
 * and processing nested objects and arrays.
 * @param input The input to be normalized.
 * @returns The normalized input.
 */
function normalizeBody(input: any): any {
  if (typeof input === "string") {
    return input.trim();
  } else if (Array.isArray(input)) {
    return input.map(normalizeBody);
  } else if (typeof input === "object" && input !== null) {
    const normalizedObject: { [key: string]: any } = {};
    for (const key in input) {
      if (input.hasOwnProperty(key)) {
        normalizedObject[key] = normalizeBody(input[key]);
      }
    }
    return normalizedObject;
  } else {
    return input;
  }
}

/**
 * Middleware to normalize req.body by removing unnecessary spaces from fields.
 * @param req The request object.
 * @param res The response object.
 * @param next The next middleware function.
 */
function normalizeRequestBody(req: any, res: any, next: any) {
  req.body = normalizeBody(req.body);
  return next();
}

export default normalizeRequestBody;
