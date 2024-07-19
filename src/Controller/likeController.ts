import { Request } from 'express'
import Like from '../model/Like';
import Idea from '../model/Idea';

export class LikeController {
    static async likeIdea(req: Request) {

        let likedIdea = await Like.findOne({ user_id: req.body.user_id, idea_id: req.body.idea_id, });
        
        Idea.updateOne( { _id: req.body.idea_id },
            {
              $inc: {
                upvote: 1
              },
              $currentDate: { lastUpdated: true }
            })
        if (!likedIdea) {
            likedIdea = new Like({
                user_id: req.body.user_id,
                idea_id: req.body.idea_id,
                upVote: false,
                downVote: false
            });
        }
        if (req.body.upVote === true) {
            Idea.updateOne( { _id: req.body.idea_id },
                {
                  $inc: {
                    upvote: 1
                  },
                  $currentDate: { lastUpdated: true }
                })
            likedIdea.upVote = true;
            likedIdea.downVote = false;
        } else if (req.body.downVote === true){

            Idea.updateOne( { _id: req.body.idea_id },
                {
                  $inc: {
                    upvote: 1
                  },
                  $currentDate: { lastUpdated: true }
                })

            likedIdea.upVote = false;
            likedIdea.downVote = true;
        }else{
            likedIdea.upVote = false;
            likedIdea.downVote = false;
        }
        return likedIdea.save();
    }
}