import { id } from "zod/locales";
import prisma from "../../config/prisma.js";

const getAllUsers = async () => {
    const result = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            photoURL: true,
            role: true,
            mobileNumber: true,
            imo: true,
            whatsapp: true,
            gender: true,
            bloodGroup: true,
            lastBloodDonateDate: true,
            address: true,
            district: true,
            division: true,
            zipCode: true,
            createdAt: true,
            lastSignInAt: true,
        },
    });
    return result;
};

const getUserById = async (id: string) => {
    const result = await prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            name: true,
            email: true,
            photoURL: true,
            role: true,
            mobileNumber: true,
            imo: true,
            whatsapp: true,
            gender: true,
            bloodGroup: true,
            lastBloodDonateDate: true,
            address: true,
            district: true,
            division: true,
            zipCode: true,
            createdAt: true,
            lastSignInAt: true,
        },
    });
    return result;
};

const deleteUserById = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: { id },
    });

    if (!user) {
        throw new Error("User not found");
    }

    await prisma.user.delete({
        where: { id },
    });

    return "User deleted successfully!";
};

const updateUserById = async (id: string, data: any) => {
    const user = await prisma.user.findUnique({
        where: { id },
    });

    if (!user) {
        throw new Error("User not found");
    }

    const result = await prisma.user.update({
        where: { id },
        data: data,
    });

    return `user updated successfully!`;
};

export const userService = {
    getAllUsers,
    getUserById,
    deleteUserById,
    updateUserById,
};
