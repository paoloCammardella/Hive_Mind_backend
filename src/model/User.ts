import bcrypt from "bcrypt";
import mongoose, { Schema, Document, Model } from "mongoose";
mongoose.set('strictQuery', false);

export interface UserInterface {
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  password: string
}

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  salt: {
    type: String
  },
  password: {
    type: String,
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
}, { collection: "users" });

userSchema.pre("save", function (next) {
  if (this.password && this.isModified('password')) {
    bcrypt.genSalt(12).then(async (salt) => {
      this.salt = salt;
      this.password = await bcrypt.hash(this.password, salt);
      this.updatedAt = new Date(Date.now());
      next();
    }).catch((err) => next(err));
  } else {
    next();
  }
});

export async function comparePassword(async: string, userPassword: string): Promise<boolean> {
  try {
    const match = await bcrypt.compare(async, userPassword);
    return match;
  } catch (error) {
    throw new Error(error.message);
  }
};

const User: Model<UserInterface> = mongoose.model<UserInterface>("User", userSchema);
export default User;
