import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectToDb from "./config/connectToDb.js";
import cors from "cors";
import articleRouter from "./routes/api/articleRoutes.js";
dotenv.config();
const app = express();
connectToDb();

app.use(cors());
app.use(express.json());

app.use("/api/articles", articleRouter);
export default app;
