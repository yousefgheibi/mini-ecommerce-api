import dotenv from "dotenv";

dotenv.config();

function required(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error("The envirnmental var ${name} is not defined!");
  }

  return value;
}

export const env = {
  postgres: {
    user: required("POSTGRES_USER"),
    password: required("POSTGRES_PASSWORD"),
    dbname: required("POSTGRES_DB"),
    port: Number(required("POSTGRES_PORT")),
  },
  redis: {
    port: Number(required("REDIS_PORT")),
  },
  server: {
    port: Number(required("API_PORT")),
    nodeEnv: required("NODE_ENV"),
    databaseUrl: `postgresql://${required("POSTGRES_USER")}:${required("POSTGRES_PASSWORD")}@postgres:${required("POSTGRES_PORT")}/${required("POSTGRES_DB")}?schema=public`,
    redisUrl: `redis://redis:${required("REDIS_PORT")}`,
    jwtSecret: required("JWT_SECRET"),
    jwtExpiresIn: required("JWT_EXPIRES_IN"),
  },
  app: {
    paymentMockDelayMs: Number(required("PAYMENT_MOCK_DELAY_MS")),
    paymentMockFailureRate: Number(required("PAYMENT_MOCK_FAILURE_RATE")),
  },
};
