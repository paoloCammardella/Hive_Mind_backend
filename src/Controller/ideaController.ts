import { Request, Response } from 'express'
import { AuthenticationController } from "./authenticationController";
import Idea from "../model/Idea";

export class ideaController {

  static async getIdeas() {
    return await Idea.find({}).sort([['date', -1]]);
  }

  static async getControverisalIdeas(){
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

  static async getPopularIdeas(){
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

  static async getUnpopularIdeas(){
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