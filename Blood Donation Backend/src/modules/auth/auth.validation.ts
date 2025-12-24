import { z } from "zod";

const registerSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    mobileNumber: z.string().optional(),
    bloodGroup: z
        .enum([
            "A_POS",
            "A_NEG",
            "B_POS",
            "B_NEG",
            "O_POS",
            "O_NEG",
            "AB_POS",
            "AB_NEG",
        ])
        .optional(),
    zilla: z.string().optional(),
    district: z.string().optional(),
    zipCode: z.string().optional(),
});

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

const resetOtpSchema = z.object({
    email: z.string().email(),
});

const resetPasswordSchema = z.object({
    email: z.string().email(),
    otp: z.number(),
    newPassword: z.string().min(6),
});

export const authValidation = {
	registerSchema,
	loginSchema,
	resetOtpSchema,
	resetPasswordSchema,
};