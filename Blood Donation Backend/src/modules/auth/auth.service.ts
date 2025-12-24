import jwt from "jsonwebtoken";
import { hashPassword, comparePassword } from "../../utils/hash.js";
import { generateOtp } from "../../utils/otp.js";
import prisma from "../../config/prisma.js";
import config from "../../config/index.js";
import nodemailer from "nodemailer";

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
    const user = await prisma.user.findUnique({
        where: { email },
    });
    if (!user) {
        return "No account found with this email";
    }

    const otp = generateOtp();

    await prisma.user.update({
        where: { email },
        data: {
            resetOtp: otp,
            resetOtpExpires: new Date(Date.now() + 5 * 60 * 1000), // 5 min
        },
    });

    // 🔔 send email via nodemailer
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: config.nodemailer_email,
            pass: config.nodemailer_email_password,
        },
    });

    const htmlContent = `
        <div style="font-family: Arial, sans-serif; line-height: 1.5; max-width: 600px; margin: auto; padding: 20px; border-radius: 8px; background-color: #790001; color: #D5B260;">
            <h2 style="text-align: center;">Your One-Time Password</h2>
            <p>Dear ${user.name},</p>
            <p>Here is your One-Time Password to securely log in to your Life Drop account:</p>
            <p style="font-size: 50px; font-weight: bold; text-align: center;">${otp}</p>
            <p>Note: This OTP is valid for 5 minutes.</p>
            <p>If you did not request this OTP, please disregard this email or contact our support team.</p>
            <p style="margin-top: 20px;">Team LifeDrop.</p>
        </div>
    `;

    await transporter.sendMail(
        {
            from: config.nodemailer_email,
            to: email,
            subject: "OTP for Blood Donation Login",
            html: htmlContent,
        },
        (err, info) => {
            if (err) {
                console.error(err);
                return "Failed to send OTP email";
            }
        }
    );

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
