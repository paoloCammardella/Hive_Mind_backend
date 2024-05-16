import bcrypt from "bcrypt";
import mongoose, { Schema, model } from "mongoose";
mongoose.set('strictQuery', false);

export interface UserInterface {
  firstName: string,
  lastName: string,
  username: string,
  email: String,
  salt: string,
  passwordHash: string,
  createdAt: Date,
  updatedAt: Date;
}

const userSchema = new Schema<UserInterface>({
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
    // validate:{
    //   validator: v:number => v%2 === 0;
    // },
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
  passwordHash: {
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
}, { collection: "users" })

//TODO probabilmente devo farlo solo nell'onCreate o al cambio password
userSchema.pre("save", function (next) {
  bcrypt.genSalt(16).then(async (salt) => {
    this.salt = salt;
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
    this.updatedAt = new Date(Date.now());
    next()
  }).catch((err) => next(err));
})


userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  try {
    const match = await bcrypt.compare(candidatePassword, this.passwordHash);
    return match;
  } catch (error) {
    throw new Error(error.message);
  }
};

const User = model("users", userSchema);
export default User;