import mongoose from "mongoose";
import dotenv from "dotenv";
import log from "./logger";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI);

mongoose.connection.on("connected", () => {
  log.info("Mongo has connected successfully");
});

mongoose.connection.on("reconnected", () => {
  log.info("Mongo has reconnected");
});

mongoose.connection.on("error", (error) => {
  log.error("Mongo connection has an error", error);
  mongoose.disconnect();
  throw new Error(error);
});

mongoose.connection.on("disconnected", () => {
  log.info("Mongo connection is disconnected");
});
