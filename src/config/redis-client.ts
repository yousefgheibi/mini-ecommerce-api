import { env } from "./env";
import { createClient } from "redis";

export const redisClient = createClient({
  url: env.server.redisUrl,
});

redisClient.on("error", (err) => console.log("REDIS => ERROR >", err));

export async function connectRedis(): Promise<void> {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log("REDIS => Redis is connected!");
  }
}
