import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const config = {
    port: process.env.PORT || 5000,
    node_env: process.env.NODE_ENV,
    database_url: process.env.DATABASE_URL,
    jwt_secret: process.env.JWT_SECRET,
    nodemailer_email: process.env.NODEMAILER_EMAIL,
    nodemailer_email_password: process.env.NODEMAILER_EMAIL_PASS,
};

export default config;
