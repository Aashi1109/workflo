import ajv, { validateRequestBody } from "@common/validation";

import * as userCreateSchema from "./user.create.json";
import * as userPasswordUpdateSchema from "./user.password.json";
import * as userUpdateSchema from "./user.update.json";

export const USER_CREATE_SCHEMA = "user.create";
export const USER_UPDATE_SCHEMA = "user.update";
export const USER_PASSWORD_UPDATE_SCHEMA = "user.password.update";

// get ajv and register the schema too
ajv.addSchema(userCreateSchema, USER_CREATE_SCHEMA);
ajv.addSchema(userUpdateSchema, USER_UPDATE_SCHEMA);
ajv.addSchema(userPasswordUpdateSchema, USER_PASSWORD_UPDATE_SCHEMA);

export const validateUserCreate = validateRequestBody(USER_CREATE_SCHEMA);
export const validateUserUpdate = validateRequestBody(USER_UPDATE_SCHEMA);
export const validateUserPasswordUpdate = validateRequestBody(
  USER_PASSWORD_UPDATE_SCHEMA
);
