import mongoose, { Model } from "mongoose";
mongoose.set('strictQuery', false);


export interface IdeaInterface {
  title: string,
  text: string,
  upvote: number,
  downvote: number,
  date: Date
}

const ideaSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 1,
    maxLength: 50,
    required: true
  },
  text: {
    type: String,
    minLength: 1,
    maxLength: 400,
    required: true
  },
  upvote: {
    type: Number,
    min: 0
  },
  downvote: {
    type: Number,
    min: 0
  },
  date: {
    type: Date,
    immutable: true,
    default: Date.now()
  },
  user: {
    type: String,
    immutable: true,
    required: true
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now()
  },
  updatedAt: {
    type: Date,
    default: () => Date.now()
  }
}, { collection: "ideas" });

const Idea: Model<IdeaInterface> = mongoose.model<IdeaInterface>("ideas", ideaSchema);
export default Idea;