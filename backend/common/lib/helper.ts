import logger from "@common/logger";
import { IPagination } from "@common/types";
import config from "@config";
import { Response } from "express";
import { FlattenMaps, Model, Require_id } from "mongoose";

export const setCookieOnResponse = (
  res: Response,
  name: string,
  value: any,
  options?: { [key: string]: any }
) => {
  res.cookie(name, value, { ...(config.cookie as any), ...options });
};

/**
 * Queries a particular model based on different params passed to it
 * @template T - Type of the document in the model
 * @param {Model<T>} model - The mongoose model to use for query
 * @returns {Function} A function that takes filter criteria and returns a promise
 */
export const getByFilter =
  <T>(model: Model<T>): Function =>
  async (
    /**
     * @inner
     * @param {Object} filter - The filter object to query documents.
     * @param {Partial<Record<keyof T, any>>} filter - Optional dynamic fields to filter by.
     * @param {IPagination} paginationOptions - Options for pagination.
     * @param {string[]} populateFields - Array of fields to populate.
     * @param {string} [not] - Optional page number for pagination.
     * @returns {Promise<Require_id<FlattenMaps<T>>[]>} - A promise that resolves to an array of documents matching the query.
     */
    filter: Partial<Record<keyof T, any>>,
    paginationOptions: IPagination,
    populateFields: string[],
    not?: string
  ): Promise<Require_id<FlattenMaps<T>>[]> => {
    try {
      const { limit, pageNumber, sortBy, sortOrder, doPopulate } =
        paginationOptions;
      const skip = limit ? (pageNumber - 1) * limit : 0;

      let query = model.find(filter);

      if (not) {
        // @ts-ignore
        query = query.find({ _id: { $ne: not } });
      }

      if (sortBy && sortOrder) {
        query.sort({ [sortBy]: sortOrder });
      }

      if (limit) {
        query.limit(limit).skip(skip);
      }

      if (doPopulate && populateFields.length > 0) {
        populateFields.forEach((field) => {
          query.populate(field);
        });
      }

      return await query.lean().exec();
    } catch (error) {
      logger.error(`Error fetching ${model.modelName}:`, error);
      throw error;
    }
  };
