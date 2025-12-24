import { PrismaPg } from "@prisma/adapter-pg";
import config from "./index.js";
import { PrismaClient } from "../generated/prisma/client.js";

const connectionString = config.database_url;

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

const adapter = new PrismaPg({ connectionString });

const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        adapter,
        log: ["error", "warn"],
    });

if (config.node_env !== "production") {
    globalForPrisma.prisma = prisma;
}

export default prisma;
