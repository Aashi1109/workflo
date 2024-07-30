import * as taskCreateSchema from "./task.create.json";
import * as taskUpdateSchema from "./task.update.json";
import ajv, { validateRequestBody } from "@common/validation";

export const TASK_CREATE_SCHEMA = "task.create";
export const TASK_UPDATE_SCHEMA = "task.update";

ajv.addSchema(taskCreateSchema, TASK_CREATE_SCHEMA);
ajv.addSchema(taskUpdateSchema, TASK_UPDATE_SCHEMA);

export const validateTaskCreate = validateRequestBody(TASK_CREATE_SCHEMA);
export const validateTaskUpdate = validateRequestBody(TASK_UPDATE_SCHEMA);
