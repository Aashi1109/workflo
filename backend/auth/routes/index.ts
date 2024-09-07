import { login, logout, signup } from "@auth/controller";
import { asyncHandler, normalizeRequestBody } from "@common/middlewares";
import { validateUserCreate } from "@user/validation";
import { Router } from "express";

const router = Router();

router.post(
  "/signup",
  [normalizeRequestBody, validateUserCreate],
  asyncHandler(signup)
);
router.post("/login", normalizeRequestBody, asyncHandler(login));
router.get("/logout", asyncHandler(logout));

export default router;
