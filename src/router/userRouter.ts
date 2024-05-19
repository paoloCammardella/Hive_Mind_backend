import { Router, Request, Response, NextFunction } from 'express';
import { ideaController } from '../Controller/ideaController';
import { IdeaInterface } from 'model/Idea';

export const userRouter = Router();
/**
 * @swagger
 * paths:
 *   /user/ideas:
 *     get:
 *       tags:
 *         - user
 *       summary: Get user ideas
 *       description: Retrieves a list of ideas associated with a specific user identified by ID.
 *       parameters:
 *         - in: query
 *           name: username
 *           required: true
 *           schema:
 *             type: string
 *           description: The username of the user for whom to retrieve ideas.
 *       responses:
 *         '200':
 *           description: Successfully retrieved list of ideas.
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   - ideas
 *         '404':
 *           description: No ideas found for the specified user.
 *           content:
 *             text/plain:
 *               schema:
 *                 type: string
 *                 example: "No ideas found."
 *         '500':
 *           description: Internal server error.
 *           content:
 *             text/plain:
 *               schema:
 *                 type: string
 *                 example: "Internal server error: {error}."
*/
userRouter.get('/ideas', (req: Request, res: Response) => {
    const username: string = req.query.username as string;
    if(!username){
        return res.status(400).send("Bad Request");
    }

    ideaController.getIdeasByUsername(username).then((userIdeas: IdeaInterface[]) => {
        if (userIdeas.length > 0) {
            return res.status(200).send(`Ideas created by ${username}: ${userIdeas}`);
        }
        res.status(404).send("No ideas found.");
        console.log(username);
    }
    ).catch((error) => {
        res.status(500).send(`Internal server error: ${error}.`);
    });
});