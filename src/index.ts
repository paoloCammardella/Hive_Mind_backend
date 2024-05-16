import mongoose from "mongoose";
import { mongo, server } from "./utils/config";
import express from "express"
import User from "./model/User";
import Idea from "./model/Idea";

const app = express();
const PORT = server.SERVER_PORT

const start = async () => {
  await mongoose.connect(mongo.MONGO_CONNECTION).then(() => {
    console.log("Database synced correctly");
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  }).catch((err) => {
    console.error("Error with database synchronization: " + err.message);
  });
  let user = new User({ firstName: "Ciaone", lastName: "Ciaone", email: "email", passwordHash: "Ciaone", username: "ciaoette" });
  // let idea = new Idea({text:"dmadmw", title:"titolo", user: "user"});
  // idea.save();
  try {
    user.save();
  } catch (e) {
    console.log("Error while saving a new user");
  }
}
start();