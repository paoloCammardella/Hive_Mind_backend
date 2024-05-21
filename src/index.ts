import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors"
import express from "express"

import { mongo, server } from "./utils/config";
import { authenticationRouter } from "./router/authenticationRouter";
import swaggerDocs from "./utils/swagger";
import { ideaRouter } from "./router/ideaRouter";
import { userRouter } from "./router/userRouter";
import { verifyToken } from "./middleware/authenticationMiddleware";

const app = express();
const PORT = server.SERVER_PORT

// Register the morgan logging middleware, use the 'dev' format
app.use(morgan('dev'));

app.use(cors()); //API will be accessible from anywhere.

//deserialize JSON
app.use(express.json());


//using the routers
app.use(authenticationRouter);
app.use('/idea', verifyToken, ideaRouter);
app.use('/user', verifyToken, userRouter);

app.get("/", (req, res) => {
  res.send("Benvenuto a Hive Mind!");
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
};

start();