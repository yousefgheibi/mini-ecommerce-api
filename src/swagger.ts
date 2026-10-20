import jswaggerJsdoc from "swagger-jsdoc";
import { env } from "./config/env";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mini E-commerce API",
      version: "0.1.0",
      description: "API documentation for the Mini E-commerce application", 
    },
    servers: [{ url: `http://localhost:${env.server.port}` }],
    components: {
      securitySchema: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        }
      }
    }
  },
  apis: ["./src/controller/*.ts"],
};

export const swaggerSpec = jswaggerJsdoc(options);
