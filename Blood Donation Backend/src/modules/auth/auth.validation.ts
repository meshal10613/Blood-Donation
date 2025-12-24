import { z } from "zod";
import { BloodGroupEnum } from "../../constants/enums.js";

const registerSchema = z.object({
    name: z
        .string({ message: "Name must be a string" })
        .min(2, { message: "Name must be at least 2 characters long" })
        .max(50, { message: "Name cannot exceed 50 characters" }),
    email: z
        .string({ message: "Email must be a string" })
        .email({ message: "Email must be a valid email address" })
        .max(100, { message: "Email cannot exceed 100 characters" }),
    password: z
        .string({ message: "Password must be a string" })
        .min(6, { message: "Password must be at least 6 characters long" }),
});

const loginSchema = z.object({
    email: z
        .string({ message: "Email must be a string" })
        .email({ message: "Email must be a valid email address" })
        .max(100, { message: "Email cannot exceed 100 characters" }),
    password: z
        .string({ message: "Password must be a string" })
        .min(6, { message: "Password must be at least 6 characters long" }),
});

const resetOtpSchema = z.object({
    email: z
        .string({ message: "Email must be a string" })
        .email({ message: "Email must be a valid email address" })
        .max(100, { message: "Email cannot exceed 100 characters" }),
});

export const resetPasswordSchema = z.object({
    email: z
        .string({ message: "Email must be a string" })
        .email({ message: "Email must be a valid email address" })
        .max(100, { message: "Email cannot exceed 100 characters" }),
    otp: z
        .string({ message: "OTP must be a string" })
        .length(6, { message: "OTP must be exactly 6 digits" }),
    newPassword: z
        .string({ message: "Password must be a string" })
        .min(6, { message: "Password must be at least 6 characters long" }),
});

export const authValidation = {
    registerSchema,
    loginSchema,
    resetOtpSchema,
    resetPasswordSchema,
};
