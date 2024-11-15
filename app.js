import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectToDb from "./config/connectToDb.js";
import cors from "cors";

dotenv.config();
const app = express();
connectToDb();

app.use(cors());
app.use(express.json());

export default app;
