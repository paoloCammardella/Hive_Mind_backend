import mongoose from "mongoose";

export interface CommentInterface {
    username: string,
    idea_id: string,
    text: string
}

const commentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    idea_id: {
        type: String,
        required: true
    },
    text: {
        type: String,
        reqired: true
    }
}, { collection: "comments" });

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;