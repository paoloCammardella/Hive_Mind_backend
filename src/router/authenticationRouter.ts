import { Router, Request, Response, NextFunction } from 'express';
import { AuthenticationController } from '../Controller/authenticationController';
import { UserInterface } from '../model/User';

export const authenticationRouter = Router();

// authenticationRouter.post("/auth", async (req, res) => {
//   let isAuthenticated = await AuthenticationController.checkCredentials(req, res);
//   if(isAuthenticated){
//     res.json(AuthenticationController.issueToken(req.body.usr));
//   } else {
//     res.status(401);
//     res.json( {error: "Invalid credentials. Try again."});
//   }
// });

/**
 * @swagger
 * /auth:
 *   post:
 *     summary: Autentica un utente
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
 *         description: Utente autenticato con successo
 *       '401':
 *         description: Credenziali non valide
 */
authenticationRouter.post("/auth", async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Implementazione della logica di autenticazione qui
  } catch (err) {
    next({ status: 500, message: "Errore durante l'autenticazione dell'utente" });
  }
});

/**
 * @swagger
 * /signup:
 *   post:
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               logo:
 *                 type: string
 *     summary: Crea una tshirt
 *     responses:
 *       200:
 *         description: Descrizione tshirt
 *       418:
 *         description: Nessun logo mandato
 */
/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Crea un nuovo utente
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
 *         description: Utente creato con successo
 *       '500':
 *         description: Credenziali non valide, qualcosa è andato storto, impossibile salvare l'utente
 */
authenticationRouter.post("/signup", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData:UserInterface = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    };
    const user = await AuthenticationController.saveUser(userData, res);
    res.json(user);
  } catch (err) {
    next({ status: 500, message: "Could not save user" });
  }
  res.send("Could not save user, make sure to fill every field");
});
