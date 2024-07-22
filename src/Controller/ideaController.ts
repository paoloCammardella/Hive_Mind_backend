import { Request, Response } from 'express'
import Idea from "../model/Idea";
import User from '../model/User';
import Comment from '../model/Comment';

export class IdeaController {
  static async getComments(req: Request) {
    try {
      const page = parseInt(req.query.page as string, 10) || 1;
      let comments = await Comment.find({ idea_id: req.query.idea_id }).skip(page).limit(5);
      return comments;
    } catch (err) {
      console.error(err);
    }
  }

  static async postNewIdea(req: Request, res: Response) {
    let user = await User.findOne({ username: req.body.user });
    if (user) {
      let idea = new Idea({
        title: req.body.title,
        text: req.body.text,
        user: req.body.user,
        downvote: 0,
        upvote: 0
      });
      return await idea.save();
    }
    throw new Error('No user found');
  }

  static async getIdeas() {
    try {
      return await Idea.find({}).sort([['date', -1]]);
    } catch (err) {
      console.error(err);
    }
  }

  static async getIdeasByUsername(username: string) {
    return await Idea.find({ user: username });
  }

  static async getControverisalIdeas(req: Request) {

    try {
      const page = parseInt(req.query.page as string) || 0;
      const skip = page * 10;

      const aggregate = [
        {
          $match: {
            $expr: {
              $eq: [
                {
                  $subtract: ['$upvote', '$downvote']
                }, 0
              ]
            }
          }
        },
        { $skip: skip },
        { $limit: 10 }
      ];

      const Ideas = await Idea.aggregate(aggregate);
      const totalIdeas = await Idea.countDocuments({
        $expr: {
          $eq: [
            {
              $subtract: ['$upvote', '$downvote']
            }, 0
          ]
        }
      });

      return {
        content: Ideas,
        totalPages: Math.ceil(totalIdeas / 10),
        currentPage: page,
        pageSize: 10,
        totalElements: totalIdeas
      }

    } catch (err) {
      console.error(err);
    }
  };

  static async getPopularIdeas(req: Request) {
//TODO aggiusta qui
    try {
      const page = parseInt(req.query.page as string) || 0;
      const skip = page * 10;

      const aggregate = [
        {
          $match: {
            $expr: {
              $gt: [
                {
                  $subtract: ['$upvote', '$downvote']
                }, 0
              ]
            }
          }
        },
        { $skip: skip },
        { $limit: 10 }
      ];

      const Ideas = await Idea.aggregate(aggregate);
      const totalIdeas = await Idea.countDocuments({
        $expr: {
          $gt: [
            {
              $subtract: ['$upvote', '$downvote']
            }, 0
          ]
        }
      });

      console.log(Ideas);

      return {
        content: Ideas,
        totalPages: Math.ceil(totalIdeas / 10),
        currentPage: page,
        pageSize: 10,
        totalElements: totalIdeas
      }

    } catch (err) {
      console.error(err);
    }
}

  static async getUnpopularIdeas(req: Request) {

    try {
      const page = parseInt(req.query.page as string) || 0;
      const skip = page * 10;

      const aggregate = [
        {
          $match: {
            $expr: {
              $lt: [
                {
                  $subtract: ['$upvote', '$downvote']
                }, 0
              ]
            }
          }
        },
        { $skip: skip },
        { $limit: 10 }
      ];

      const Ideas = await Idea.aggregate(aggregate);
      const totalIdeas = await Idea.countDocuments({
        $expr: {
          $lt: [
            {
              $subtract: ['$upvote', '$downvote']
            }, 0
          ]
        }
      });

      console.log(Ideas);

      return {
        content: Ideas,
        totalPages: Math.ceil(totalIdeas / 10),
        currentPage: page,
        pageSize: 10,
        totalElements: totalIdeas
      }

    } catch (err) {
      console.error(err);
    }
}

  static async canUserVoteIdea(username: string, idea_id: string) {
  const idea = await Idea.findById(idea_id);
  return idea && idea.user !== username;
}

  static async commentIdea(req: Request) {
  try {
    let ideaCommented = await Idea.findById(req.body.idea_id);
    if (ideaCommented) {
      let newComment = new Comment({
        username: req.body.username,
        idea_id: req.body.idea_id,
        text: req.body.text
      });
      return await newComment.save()
    }
  } catch (err) {
    console.error(err);
  }
}
}