import { Router, Request, Response, NextFunction } from 'express';
import { IdeaController } from '../Controller/ideaController';
import { IdeaInterface } from 'model/Idea';

export const ideaRouter = Router();


/**
 * @swagger
 * /idea:
 *   get:
 *     summary: Get all existing ideas, ordered by the newest created.
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
  IdeaController.getIdeas().then((ideas: IdeaInterface[]) => {
    if (!ideas || ideas.length === 0) {
      return res.status(404).json({ error: 'No ideas found' });
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
  IdeaController.getControverisalIdeas(req).then((ideas) => {
    if (!ideas) {
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
  IdeaController.getPopularIdeas(req).then((ideas) => {
    if (!ideas) {
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
  IdeaController.getUnpopularIdeas(req).then((ideas) => {
    if (!ideas) {
      return res.status(404).json({ error: 'No unpopular ideas found.' });
    }
    res.status(200).json(ideas);
  })
    .catch((error) => {
      res.status(500).json({ error: 'Internal server error' });
    })
});

/**
 * @swagger
 * /idea/comment:
 *   get:
 *     summary: Get all comments related to an existing Idea.
 *     tags: 
 *       - Idea
 *     responses:
 *       '201':
 *         description: Comments successfully retrived.
 *       '500':
 *         description: Internal server error.
 */
ideaRouter.get('/comment', (req: Request, res: Response) => {
  IdeaController.getComments(req).then((comments) => {
    if (comments) {
      return res.status(201).json(comments);
    }
    return res.status(400).json({
      "message": `Bad request, no idea commented.`
    });
  }).catch((error) => {
    console.log(error);
    return res.status(500).json({
      "message": `Server error: ${error}.`
    });
  })
});

/**
 * @swagger
 * /idea/comment:
 *   post:
 *     summary: Comment an existing idea.
 *     tags: 
 *       - Idea
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - idea_id
 *               - text
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username of the user commenting.
 *               idea_id:
 *                 type: string
 *                 description: Id of the idea.
 *               text:
 *                 type: string
 *                 description: Text of the comment.
 *     responses:
 *       '201':
 *         description: Idea successfully commented.
 *       '500':
 *         description: Internal server error.
 */
ideaRouter.post('/comment', async (req: Request, res: Response) => {
  try {
    console.log('Request received at /comment:', req.body);
    let comment = await IdeaController.commentIdea(req, res);
    if (comment) {
      console.log('Comment text:', req.body.text);
      return res.status(201).send();
    } else {
      console.log('Error: Comment not created');
      return res.status(400).json({
        "message": `Bad request, no idea commented.`
      });
    }
  } catch (error) {
    console.log('Server error:', error);
    return res.status(500).json({
      "message": `Server error: ${error}.`
    });
  }
});

/**
 * @swagger
 * /idea:
 *   post:
 *     summary: Create new Idea.
 *     tags: 
 *       - Idea
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - title
 *               - text
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username of the user creating the idea.
 *               title:
 *                 type: string
 *                 description: Title of the idea.
 *               text:
 *                 type: string
 *                 description: Text or description of the idea.
 *     responses:
 *       '201':
 *         description: Idea successfully created.
 *       '500':
 *         description: Internal server error.
 */
ideaRouter.post('', (req: Request, res: Response) => {
  IdeaController.postNewIdea(req, res).then((idea: IdeaInterface) => {
    if (idea) {
      return res.status(201).json({ 'message': 'OK' });
    }
    return res.status(400).json({
      "message": `Bad request, no idea sent.`
    });
  }).catch((error) => {
    console.log(error);
    return res.status(500).json({
      "message": `Server error: ${error}.`
    });
  })
});
