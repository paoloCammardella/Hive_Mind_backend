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
    require: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  salt: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  createdAt: Date,
  updatedAt: Date
}, { collection: "users" })

// userSchema.pre("save", function(value){
//   const user = this as UserInterface;
//   user.passwordHash = bcrypt.genSalt(16).then((salt) => {
//         this.salt = salt;
//         return bcrypt.hash(value, salt);
//       });
// })

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  const user = this as UserInterface; // Bind 'this' to the user document

  try {
    const match = await bcrypt.compare(candidatePassword, user.passwordHash);
    return match;
  } catch (error) {
    throw new Error(error);
  }
};

const User = model("users", userSchema);
export default User;