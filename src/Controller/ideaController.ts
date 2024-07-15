import { Request, Response } from 'express'
import Idea from "../model/Idea";
import User from '../model/User';

export class IdeaController {
  
  static async postNewIdea(req: Request, res: Response) {
    let user = await User.findOne({ username: req.body.user});
    if (user) {
      let idea = new Idea({
        title: req.body.title,
        text: req.body.text,
        user: req.body.user
      });
      return await idea.save();
    }
    throw new Error('No user found');
  }

  static async getIdeas() {
    return await Idea.find({}).sort([['date', -1]]);
  }

  static async getIdeasByUsername(username: string){
    return await Idea.find({user: username});
  }

  static async getControverisalIdeas() {
    return await Idea.aggregate([
      {
        $match: {
          $expr: {
            $eq: [
              { $subtract: ['$upvote', '$downvote'] },
              0
            ]
          }
        }
      }
    ])
  }

  static async getPopularIdeas() {
    return await Idea.aggregate([
      {
        $match: {
          $expr: {
            $gt: [
              { $subtract: ['$upvote', '$downvote'] },
              0
            ]
          }
        }
      }
    ])
  }

  static async getUnpopularIdeas() {
    return await Idea.aggregate([
      {
        $match: {
          $expr: {
            $gt: [
              { $subtract: ['$upvote', '$downvote'] },
              0
            ]
          }
        }
      }
    ])
  }
}