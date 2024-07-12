import { Request } from 'express'
import Like from '../model/Like';

export class LikeController {
    static async likeIdea(req: Request) {

        let likedIdea = await Like.findOne({ user_id: req.body.user_id, idea_id: req.body.idea_id, });

        if (!likedIdea) {
            likedIdea = new Like({
                user_id: req.body.user_id,
                idea_id: req.body.idea_id,
                upVote: false,
                downVote: false
            });
        }

        if (req.body.upvote == true) {
            likedIdea.upVote = true;
            likedIdea.downVote = false;
        } else {
            likedIdea.upVote = false;
            likedIdea.downVote = true;
        }

        return likedIdea.save();
    }
}