import { error } from "console";
import { IdeaController } from "../Controller/ideaController";
import { NextFunction, Request, Response } from "express";

export async function ensureUsersDoesntVoteOwnIdeas(req: Request, res: Response, next: NextFunction){
    const user = req.body.username;
    const idea_id = req.body.idea_id;
    const userHasPermission = await IdeaController.canUserVoteIdea(user, idea_id);
    if(userHasPermission){
      next();
    } else {
      error({
        status: 403, 
        message: "Forbidden! You do not have permissions to view or modify this resource"
      });
    }
  }