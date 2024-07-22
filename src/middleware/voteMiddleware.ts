import { IdeaController } from "../Controller/ideaController";
import { NextFunction, Request, Response } from "express";

export async function ensureUsersDoesntVoteOwnIdeas(req: Request, res: Response, next: NextFunction) {
  const user = req.query.username as string;
  const idea_id = req.body.idea_id;

  console.log(user);
  const userHasPermission = await IdeaController.canUserVoteIdea(user, idea_id);
  if (userHasPermission) {
    next();
  } else {
    console.error("User voted his own idea.");
    res.send("User doesn't have permission").status(403);
  }
}