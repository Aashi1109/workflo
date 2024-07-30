import {
  asyncHandler,
  normalizeRequestBody,
  paginationParser,
} from "@common/middlewares";
import {
  createTask,
  deleteTaskById,
  filterTasks,
  getTaskById,
  updateTaskById,
} from "@tasks/controller";
import { validateTaskCreate, validateTaskUpdate } from "@tasks/validation";
import { Router } from "express";

const router = Router();

router
  .route("/")
  .post([normalizeRequestBody, validateTaskCreate], asyncHandler(createTask));

router.get(
  "/query",
  [normalizeRequestBody, paginationParser],
  asyncHandler(filterTasks)
);

router
  .route("/:id")
  .get(asyncHandler(getTaskById))
  .patch(
    [normalizeRequestBody, validateTaskUpdate],
    asyncHandler(updateTaskById)
  )
  .delete(asyncHandler(deleteTaskById));

export default router;
