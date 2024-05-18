import { Router, Request, Response, NextFunction } from 'express';
import { ideaController } from '../Controller/ideaController';
import { IdeaInterface } from 'model/Idea';

export const ideaRouter = Router();

//TODO check authentication.

/**
 * @swagger
 * /idea:
 *   get:
 *     summary: Get all existing ideas, ordered by the newst created.
 *     tags: [Idea]
 *     responses:
 *       '200':
 *         description: All ideas retrived.
 *       '401':
 *         description: User unauthorized, authenticate first.
 *       '500':
 *         description: Internal server
 */
ideaRouter.get('', (req: Request, res: Response) => {
  ideaController.getIdeas().then((ideas: IdeaInterface[]) => {
    if (!ideas || ideas.length === 0) {
      return res.status(401).json({ error: 'No ideas found' });
    }
    res.status(200).json(ideas);
  })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});

/**
 * @swagger
 * /idea/controversial:
 *   get:
 *     summary: Get all existing controverisal ideas.
 *     tags: [Idea]
 *     responses:
 *       '200':
 *         description: All controverisal ideas retrived.
 *       '401':
 *         description: User unauthorized, authenticate first.
 *       '404':
 *         description: No controversial ideas found.
 *       '500':
 *         description: Internal server.
 */
ideaRouter.get('/controversial', (req: Request, res: Response) => {
  ideaController.getControverisalIdeas().then((ideas: IdeaInterface[]) => {
    if (!ideas || ideas.length === 0) {
      return res.status(404).json({ error: 'No controversial ideas found.' });
    }
    res.status(200).json(ideas);
  })
  .catch((error) => {
    res.status(500).json({ error: 'Internal server error' });
  })
})


/**
 * @swagger
 * /idea/popular:
 *   get:
 *     summary: Get all existing popular ideas.
 *     tags: [Idea]
 *     responses:
 *       '200':
 *         description: All popular ideas retrived.
 *       '401':
 *         description: User unauthorized, authenticate first.
 *       '404':
 *         description: No popular ideas found.
 *       '500':
 *         description: Internal server.
 */
ideaRouter.get('/popular', (req: Request, res: Response) => {
  ideaController.getPopularIdeas().then((ideas: IdeaInterface[]) => {
    if (!ideas || ideas.length === 0) {
      return res.status(404).json({ error: 'No popular ideas found.' });
    }
    res.status(200).json(ideas);
  })
  .catch((error) => {
    res.status(500).json({ error: 'Internal server error' });
  })
});

/**
 * @swagger
 * /idea/unpopular:
 *   get:
 *     summary: Get all existing unpopular ideas.
 *     tags: [Idea]
 *     responses:
 *       '200':
 *         description: All unpopular ideas retrived.
 *       '401':
 *         description: User unauthorized, authenticate first.
 *       '404':
 *         description: No unpopular ideas found.
 *       '500':
 *         description: Internal server.
 */
ideaRouter.get('/unpopular', (req: Request, res: Response) => {
  ideaController.getUnpopularIdeas().then((ideas: IdeaInterface[]) => {
    if (!ideas || ideas.length === 0) {
      return res.status(404).json({ error: 'No unpopular ideas found.' });
    }
    res.status(200).json(ideas);
  })
  .catch((error) => {
    res.status(500).json({ error: 'Internal server error' });
  })
});