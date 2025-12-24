import express, { Request, Response } from "express";
import cors from "cors";
import { globalErrorHandler } from "./middlewares/error.middleware.js";
import { authRoutes } from "./modules/auth/auth.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
	res.send("Blood Donation Backend is running....");
});

app.use("/api/v1/auth", authRoutes);

app.use(globalErrorHandler);

export default app;
