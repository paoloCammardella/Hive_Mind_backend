import { Router, Request, Response } from 'express';
import { IdeaController } from '../Controller/ideaController';
import { IdeaInterface } from '../model/Idea';
import { LikeController } from '../Controller/likeController';
import { AuthenticationController } from '../Controller/authenticationController';
import { ensureUsersDoesntVoteOwnIdeas } from '../middleware/voteMiddleware';

export const userRouter = Router();
/**
 * @swagger
 * paths:
 *   /user/ideas:
 *     get:
 *       tags:
 *         - User
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
    if (!username) {
        return res.status(400).send("Bad Request");
    }

    IdeaController.getIdeasByUsername(username).then((userIdeas: IdeaInterface[]) => {
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

/**
 * @swagger
 * paths:
 *   /user/like/idea:
 *     post:
 *       tags:
 *         - User
 *       summary: Like an idea
 *       description: Endpoint to like an idea.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ideaId:
 *                   type: string
 *                   description: The ID of the idea to be liked.
 *                   example: '12345'
 *                 userId:
 *                   type: string
 *                   description: The ID of the user liking the idea.
 *                   example: '67890'
 *                 upvote:
 *                   type: boolean
 *                   example: true
 *                 downvote:
 *                   type: boolean
 *                   example: false
 *       responses:
 *         '200':
 *           description: Successful operation
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   idea:
 *                     type: object
 *                     description: The updated user object with the liked idea.
 *                     properties:
 *                       user_id:
 *                         type: string
 *                         description: The ID of the user.
 *                         example: '67890'
 *                       idea_id:
 *                         type: string
 *                         description: The ID of the idea.
 *                         example: '67890'
 *                       upvote:
 *                         type: boolean
 *                         example: true
 *                       downvote:
 *                         type: boolean
 *                         example: false
 *         '500':
 *           description: Internal server error
 *           content:
 *             text/plain:
 *               schema:
 *                 type: string
 *                 example: Internal server error:.
 *       security:
 *         - bearerAuth: []
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
userRouter.post('/like/idea', ensureUsersDoesntVoteOwnIdeas, (req: Request, res: Response) => {
    console.log(req.body);
    LikeController.likeIdea(req).then(idea => {
        if (idea) {
            res.status(200).send();
        } else {
            res.status(404).send('Idea not found');
        }
        console.log(idea);
    }).catch(err => {
        console.error(`Error: ${err}`);
        res.status(500).send(`Internal server error: ${err}`);
    });
});


/**
 * @swagger
 * paths:
 *   /user:
 *     get:
 *       tags:
 *         - User
 *       summary: Get users
 *       description: Retrieves a list of users
 *       parameters:
 *         
 *       responses:
 *         '200':
 *           description: Successfully retrieved list of users.
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   - users
 *         '500':
 *           description: Internal server error.
 *           content:
 *             text/plain:
 *               schema:
 *                 type: string
 *                 example: "Internal server error: {error}."
*/
userRouter.get('/user', (req: Request, res: Response) => {

    AuthenticationController.getUser().then(user => {
        res.status(200).json(user);
    }).catch((error) => {
        res.status(500).send(`Internal server error: ${error}.`);
    });
});

/**
 * @swagger
 * paths:
 *   /user/vote:
 *     get:
 *       tags:
 *         - User
 *       summary: Get user's votes
 *       description: Retrieves a list of user's voted ideas
 *       parameters:
 *         
 *       responses:
 *         '200':
 *           description: Successfully retrieved list of user's votes.
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   - users
 *         '500':
 *           description: Internal server error.
 *           content:
 *             text/plain:
 *               schema:
 *                 type: string
 *                 example: "Internal server error: {error}."
*/
userRouter.get('/vote', (req: Request, res: Response) => {

    LikeController.getUserVote(req).then(votes => {
        res.status(200).json(votes);
    }).catch((error) => {
        res.status(500).send(`Internal server error: ${error}.`);
    });
});
