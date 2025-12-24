import { Router } from "express";
import { authController } from "./auth.controller.js";

const router = Router();

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/reset-otp", authController.sendOtp);
router.post("/reset-password", authController.resetPassword);

export const authRoutes = router;
