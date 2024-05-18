import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors"
import express from "express"
import swaggerUi, { serve } from 'swagger-ui-express';


import { mongo, server } from "./utils/config";
import User, { comparePassword } from "./model/User";
import { authenticationRouter } from "./router/authenticationRouter";
import swaggerDocs from "./utils/swagger";
import { spec } from "node:test/reporters";

const app = express();
const PORT = server.SERVER_PORT

// Register the morgan logging middleware, use the 'dev' format
app.use(morgan('dev'));

app.use(cors()); //API will be accessible from anywhere. We'll talk about this in Lecture 23!

//permette di deserializzare il json delle richieste
app.use(express.json());


//using the routers
app.use(authenticationRouter)

app.get("/", (req, res) => {
  res.send("Benvenuto a Hive Mind!"); // Aggiungi qui il contenuto che desideri visualizzare sulla rotta principale
});




const start = async () => {
  await mongoose.connect(mongo.MONGO_CONNECTION).then(() => {
    console.log("Database synced correctly");
    app.listen(PORT, () => {
      swaggerDocs(app, parseInt(server.SERVER_PORT));
      console.log(`Server is running on port: ${PORT}`);
    });
  }).catch((err) => {
    console.error("Error with database synchronization: " + err.message);
  });
// let user = new User({username: "paolo", firstName: "paolo", lastName: "cammardella", email:"paolo", password:"password"})
// await user.save();
  try {
    const oldUser = await User.findOne({ username: 'paolo' }).exec();
    if (oldUser) {
      oldUser.password = "come va";
      // await oldUser.save();

      try {
        if (await comparePassword(" va", oldUser.password)) {
          console.log("Le password corrispondono\n" + oldUser);
        }else{
          console.error("Password didn't match");
        }
      } catch (error) {
        throw new Error(error.message);
      }
    }else{console.error("Unable to find user")}
  } catch (err) {
    console.log("Error while saving a new user");
    console.log(err);
  }
};

start();