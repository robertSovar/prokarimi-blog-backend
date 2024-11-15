import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";

dotenv.config();

function connectToDb() {
  mongoose
    .connect(process.env.MONGO_DB_STRING)
    .then(() => console.log(colors.green("Connected to DB")))
    .catch((err) => console.log(colors.red(err)));
}

export default connectToDb;
