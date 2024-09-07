import { asyncHandler, normalizeRequestBody } from "@common/middlewares";
import {
  createUser,
  deleteUser,
  filterUsers,
  getUserById,
  updateUser,
  updateUserPassword,
} from "@user/controller";
import {
  validateUserCreate,
  validateUserPasswordUpdate,
  validateUserUpdate,
} from "@user/validation";
import { Router } from "express";

const router = Router();

router.get("/query", asyncHandler(filterUsers));
router.post(
  "/",
  [normalizeRequestBody, validateUserCreate],
  asyncHandler(createUser)
);

router.patch(
  "/password",
  [normalizeRequestBody, validateUserPasswordUpdate],
  asyncHandler(updateUserPassword)
);

router
  .route("/:id")
  .get(asyncHandler(getUserById))
  .patch([normalizeRequestBody, validateUserUpdate], asyncHandler(updateUser))
  .delete(asyncHandler(deleteUser));

export default router;
