import { Request, Response } from "express";
import { userService } from "./user.service.js";
import { userValidation } from "./user.validation.js";

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await userService.getAllUsers();
        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
};

const getUserById = async (req: Request, res: Response) => {
	try {
		const { id } = userValidation.userIdSchema.parse(req.params);
		const result = await userService.getUserById(id as string);
		res.status(200).json({
			success: true,
			message: "User fetched successfully",
			data: result,
		});
	} catch (error: any) {
		res.status(500).json({
			success: false,
			message: error.message,
			error: error,
		})
	}
};

const deleteUserById = async (req: Request, res: Response) => {
    try {
		const { id } = userValidation.userIdSchema.parse(req.params);
		const result = await userService.deleteUserById(id as string);
		res.status(200).json({
			success: true,
			message: result,
		})
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
};

export const userController = {
    getAllUsers,
	getUserById,
    deleteUserById,
};
