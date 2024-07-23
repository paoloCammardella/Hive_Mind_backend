import { Request, Response } from 'express'
import Idea from "../model/Idea";
import User from '../model/User';
import Comment from '../model/Comment';
import mongoose from 'mongoose';

export class IdeaController {


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

  static async getComments(req: Request) {
    try {
      const commentRange = parseInt(req.query.commentRange as string, 10) || 0;
      const objectId = new mongoose.Types.ObjectId(req.query.idea_id as string);

      let comments = await Comment.find({ idea_id: objectId }).skip(0).limit(commentRange);
      console.log(comments);
      return comments;
    } catch (err) {
      console.error(err);
    }
  }

  static async commentIdea(req: Request, res: Response) {
    try {
      let ideaCommented = await Idea.findById(req.body.idea_id);
      if (ideaCommented) {
        let newComment = new Comment({
          username: req.body.username,
          idea_id: req.body.idea_id,
          text: req.body.text
        });
        let savedComment = await newComment.save();
        console.log('Comment saved:', savedComment);
        return savedComment;
      }
    } catch (err) {
      console.error('Error in commentIdea:', err);
      throw err; // Rilancia l'errore per la gestione a livello superiore
    }
  }
}