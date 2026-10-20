import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { registerUser, loginUser } from "../services/auth-services";


/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register a new user
 *     description: |
 *       Creates a new user account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 50
 *                 example: "Ali Rezaei"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "ali@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 example: "StrongPass123!"
 *           examples:
 *             valid:
 *               summary: Valid request
 *               value:
 *                 name: "Ali Rezaei"
 *                 email: "ali@example.com"
 *                 password: "StrongPass123!"
 *             missingField:
 *               summary: Missing password
 *               value:
 *                 name: "Ali Rezaei"
 *                 email: "ali@example.com"
 *             weakPassword:
 *               summary: Too short password
 *               value:
 *                 name: "Ali Rezaei"
 *                 email: "ali@example.com"
 *                 password: "123"
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             example:
 *               id: "65f1c2a9e4b0a1b2c3d4e5f6"
 *               name: "Ali Rezaei"
 *               email: "ali@example.com"
 *               createdAt: "2026-10-20T12:00:00.000Z"
 */
export const registerEndpoint = asyncHandler(async (req: Request, res: Response) => {
  const user = await registerUser(req.body);
  res.status(201).json(user);
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login a user
 *     description: |
 *       Authenticates a user and returns a JWT token.
 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "ali@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "StrongPass123!"
 *           examples:
 *             valid:
 *               summary: Valid credentials
 *               value:
 *                 email: "ali@example.com"
 *                 password: "StrongPass123!"
 *             wrongPassword:
 *               summary: Wrong password
 *               value:
 *                 email: "ali@example.com"
 *                 password: "wrongpass"
 *             missingFields:
 *               summary: Missing email
 *               value:
 *                 password: "StrongPass123!"
 *     responses:
 *       200:
 *         description: Authenticated successfully
 *         content:
 *           application/json:
 *             example:
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *               user:
 *                 id: "65f1c2a9e4b0a1b2c3d4e5f6"
 *                 name: "Ali Rezaei"
 *                 email: "ali@example.com"
 *                 createdAt: "2026-10-20T12:00:00.000Z"
 *       
 */
export const loginEndpoint = asyncHandler(async (req: Request, res: Response) => {
  const user = await loginUser(req.body);
  res.json(user);
});