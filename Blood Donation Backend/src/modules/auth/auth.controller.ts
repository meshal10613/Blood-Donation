import { Request, Response } from "express";
import { authService } from "./auth.service.js";
import { authValidation } from "./auth.validation.js";

const registerUser = async (req: Request, res: Response) => {
    try {
        const data = authValidation.registerSchema.parse(req.body);
        const user = await authService.register(data);
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
};

const loginUser = async (req: Request, res: Response) => {
    try {
        const data = authValidation.loginSchema.parse(req.body);
        const token = await authService.login(data);
        res.json({ success: true, token });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
};

const sendOtp = async (req: Request, res: Response) => {
    try {
        const { email } = authValidation.resetOtpSchema.parse(req.body);
        await authService.sendResetOtp(email);
        res.json({ success: true, message: "OTP sent" });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
};

const resetPassword = async (req: Request, res: Response) => {
    try {
        const data = authValidation.resetPasswordSchema.parse(req.body);
        await authService.resetPassword(data);
        res.json({ success: true, message: "Password reset successful" });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
};

export const authController = {
    registerUser,
    loginUser,
    sendOtp,
    resetPassword,
};
