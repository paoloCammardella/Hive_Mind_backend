import mongoose from "mongoose";
import User from "./User";

const ideaSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  title:{
    type: String,
    required: true
  },
  text:{
    type: String,
    required: true
  }
}, {collection: "ideas"});

const Idea = mongoose.model("ideas", ideaSchema);
export default Idea;