import mongoose from "mongoose";

export interface LikeInterface{
  user_id: string,
  idea_id: string,
  upvote: boolean,
  downvote: boolean
}


const likeSchema = new mongoose.Schema({
  user_id:{
    type: String,
    required: true
  },
  idea_id:{
    type: String,
    required: true
  },
  upVote:{
    type: Boolean
  },
  downVote:{
    type: Boolean
  }
}, {collection: "likes"});

const Like = mongoose.model("Like", likeSchema);
export default Like;