import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const MONGO_URL = process.env.MONGO_URL;
export const MONGO_DATABASE = process.env.MONGO_DATABASE;
export const MONGO_USER = process.env.MONGO_USER;
export const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

export const MONGO_OPTIONS: mongoose.ConnectOptions = { retryWrites: true, w: 'majority' };

export const mongo = {
  MONGO_URL,
  MONGO_DATABASE,
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_CONNECTION: `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URL}/${MONGO_DATABASE}?authSource=admin`
}

export const server = {
  SERVER_HOSTNAME: process.env.SERVER_HOSTNAME,
  SERVER_PORT: process.env.PORT
}