import { Router, Request, Response, NextFunction } from 'express';
import { AuthenticationController } from '../Controller/authenticationController';

export const authenticationRouter = Router();

/**
 * @swagger
 * /auth:
 *   post:
 *     summary: Authenticate existing user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User authenticated succesfully.
 *       '401':
 *         description: Invalid credentials, try again
 */
authenticationRouter.post("/auth", async (req: Request, res: Response) => {
  let isAuthenticated = await AuthenticationController.checkCredentials(req, res);
  if(isAuthenticated){
    res.json(AuthenticationController.issueToken(req.body.username));
  } else {
    res.status(401).json( {error: "Invalid credentials. Try again."});
  }
});

/**
 * @openapi
 * /signup:
 *   post:
 *     summary: Create a new user.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User created succesfully.
 *       '500':
 *         description: Invalid credentials, cannot create user.
 */
authenticationRouter.post("/signup", async (req: Request, res: Response, next: NextFunction) => {
  AuthenticationController.saveUser(req, res).then((user) => {
    res.json(user);
  }).catch((err) => {
    res.status(500).send(err);
  });
});
