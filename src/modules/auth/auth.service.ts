import jwt from "jsonwebtoken";
import { hashPassword, comparePassword } from "../../utils/hash.js";
import { generateOtp } from "../../utils/otp.js";
import prisma from "../../config/prisma.js";
import config from "../../config/index.js";

const register = async (payload: any) => {
    const hashed = await hashPassword(payload.password);
    payload.password = hashed;

    return prisma.user.create({
        data: {
            ...payload,
            password: hashed,
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
            lastSignInAt: true,
        },
    });
};

const login = async (payload: any) => {
    const user = await prisma.user.findUnique({
        where: { email: payload.email },
    });

    if (!user) throw new Error("Invalid credentials");

    const matched = await comparePassword(payload.password, user.password);
    if (!matched) throw new Error("Invalid credentials");

    const token = jwt.sign(
        { id: user.id, name: user.name, email: user.email, role: user.role },
        config.jwt_secret as string,
        {
            expiresIn: "30d",
        }
    );

    await prisma.user.update({
        where: { id: user.id },
        data: { lastSignInAt: new Date() },
    });

    return token;
};

const sendResetOtp = async (email: string) => {
    const otp = generateOtp();

    await prisma.user.update({
        where: { email },
        data: {
            resetOtp: otp,
            resetOtpExpires: new Date(Date.now() + 5 * 60 * 1000), // 5 min
        },
    });

    // 🔔 send via email / SMS here
    console.log("OTP:", otp);

    return true;
};

const resetPassword = async (payload: any) => {
    const user = await prisma.user.findUnique({
        where: { email: payload.email },
    });

    if (
        !user ||
        user.resetOtp !== payload.otp ||
        !user.resetOtpExpires ||
        user.resetOtpExpires < new Date()
    ) {
        throw new Error("Invalid or expired OTP");
    }

    await prisma.user.update({
        where: { email: payload.email },
        data: {
            password: await hashPassword(payload.newPassword),
            resetOtp: null,
            resetOtpExpires: null,
        },
    });

    return true;
};

export const authService = {
    register,
    login,
    sendResetOtp,
    resetPassword,
};
