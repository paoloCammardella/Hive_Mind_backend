import { Request } from 'express';
import Like from '../model/Like';
import Idea from '../model/Idea';
import mongoose from 'mongoose';

export class LikeController {

  static async getUserVote(req: Request) {
    console.log(req.query.username);
    const votedIdeas = await Like.find({user_id: req.query.username});
    if(votedIdeas){
      return votedIdeas;
    }
    throw new Error("No votes found")
  }

  static async likeIdea(req: Request) {
    try {
      const userID = req.body.user_id;
      const ideaID = req.body.idea_id;
      const upVote = req.body.upVote;
      const downVote = req.body.downVote;

      if (!mongoose.Types.ObjectId.isValid(ideaID)) {
        console.error('Invalid idea ID');
        return;
      }

      const objectId = new mongoose.Types.ObjectId(ideaID);

      if (typeof upVote !== 'boolean' || typeof downVote !== 'boolean') {
        console.error('Invalid upVote or downVote value');
        return;
      }

      const idea = await Idea.findById(objectId);
      if (!idea) {
        console.error('Idea not found');
        return;
      }

      let likedIdea = await Like.findOne({ user_id: userID, idea_id: objectId });

      if (!likedIdea) {
        likedIdea = new Like({
          user_id: userID,
          idea_id: objectId,
          upVote: false,
          downVote: false
        });
      }

      if (upVote) {
        if (!likedIdea.upVote) {
          if (likedIdea.downVote) {
            likedIdea.downVote = false
            await Idea.updateOne(
              { _id: objectId },
              { $inc: { upvote: 1, downvote: -1 } }
            );
          } else {
            await Idea.updateOne(
              { _id: objectId },
              { $inc: { upvote: 1 } }
            );
          }
          likedIdea.upVote = true;
        } else {
          if (idea.upvote > 0) {
            await Idea.updateOne(
              { _id: objectId },
              { $inc: { upvote: -1 } }
            );
            likedIdea.upVote = false;
          }
        }
      }

      if (downVote) {
        if (!likedIdea.downVote) {
          if (likedIdea.upVote) {
            likedIdea.upVote = false
            await Idea.updateOne(
              { _id: objectId },
              { $inc: { downvote: 1, upvote: -1 } }
            );
          } else {
            await Idea.updateOne(
              { _id: objectId },
              { $inc: { downvote: 1 } }
            );
          }
          likedIdea.downVote = true;
        } else {
          if (idea.downvote > 0) {
            await Idea.updateOne(
              { _id: objectId },
              { $inc: { downvote: -1 } }
            );
            likedIdea.downVote = false;
          }
        }
      }

      return await likedIdea.save();
    } catch (error) {
      console.error('Error updating idea:', error);
    }
  }
}
