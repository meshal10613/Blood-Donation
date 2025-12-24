import { Router } from "express";
import { userController } from "./user.controller.js";

const router = Router();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.delete("/:id", userController.deleteUserById);

export const userRoutes = router;