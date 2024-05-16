import mongoose from "mongoose";
import Idea from "./Idea";
import User from "./User";

const likeSchema = new mongoose.Schema({
  user:{
    type: User,
    required: true
  },
  idea:{
    type: Idea,
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