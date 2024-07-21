import mongoose, { Model } from "mongoose";
import sanitizeHtml from 'sanitize-html';

mongoose.set('strictQuery', false);


export interface IdeaInterface {
  user: string,
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
    required: true
  },
  text: {
    type: String,
    minLength: 1,
    required: true
  },
  upvote: {
    type: Number,
    min: 0,
    required: true
  },
  downvote: {
    type: Number,
    min: 0,
    required: true
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

ideaSchema.pre('save', function (next) {
  const idea = this;
  const textWithoutTags = sanitizeHtml(idea.text, { allowedTags: [], allowedAttributes: {} });

  if (textWithoutTags.length > 400) {
    return next(new Error('The idea text exceeds the maximum allowed length of 400 characters.'));
  }

  next();
});

ideaSchema.pre('save', function (next) {
  const idea = this;
  const titleWithoutTags = sanitizeHtml(idea.title, { allowedTags: [], allowedAttributes: {} });

  if (titleWithoutTags.length > 50) {
    return next(new Error('The idea title exceeds the maximum allowed length of 50 characters: ' + idea.title));
  }

  next();
});

const Idea: Model<IdeaInterface> = mongoose.model<IdeaInterface>("ideas", ideaSchema);
export default Idea;