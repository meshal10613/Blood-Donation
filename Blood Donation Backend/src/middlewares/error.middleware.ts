import { NextFunction, Request, Response } from "express";

export const globalErrorHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.status(404).json({
        success: false,
        message: "Not Found!",
    });
};
