import logger from '@common/logger';
import { IValidationError } from '@common/types';
import { ErrorObject } from 'ajv';

/**
 * Stringifies the given data object
 * @param data The data to stringfy
 * @returns Stringified data
 */
export const jnstringify = (data: any): string => JSON.stringify(data);

/**
 * Parses the given string into a JSON object
 * @param data JSON string to parse
 * @returns Parsed JSON object
 */
export const jnparse = (data: any): string => JSON.parse(data);

export const extractErrors = (errors: ErrorObject[]): IValidationError[] => {
  return errors.map((error) => {
    let field = error.instancePath.slice(1); // Remove leading slash
    if (!field) {
      field = error.params.missingProperty || 'unknown';
    }

    let message = error.message || 'Invalid value';

    logger.debug(error.keyword);

    if (error.keyword === 'enum' && error.params.allowedValues) {
      message += `. Allowed values are: ${error.params.allowedValues.join(', ')}`;
    }

    return {
      field,
      message,
    };
  });
};
