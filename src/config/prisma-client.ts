import { env } from "./env";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: env.server.databaseUrl,
});

export const prisma = new PrismaClient({
  adapter,
});
