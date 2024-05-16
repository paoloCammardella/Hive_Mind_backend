import mongoose from "mongoose";
import User from "./User";

const ideaSchema = new mongoose.Schema({
  title: {
    type: String,
    maxLength: 50,
    required: true
  },
  text: {
    type: String,
    minLength: 1,
    maxLength: 400,
    required: true
  },
  date: {
    type: Date,
    immutable: true,
    default: Date.now()
  },
  user: {
    type: mongoose.Schema.ObjectId,
    required: true
  }
}, { collection: "ideas" });

const Idea = mongoose.model("ideas", ideaSchema);
export default Idea;