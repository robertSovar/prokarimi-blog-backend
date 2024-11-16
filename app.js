import express from "express";
import dotenv from "dotenv";
import connectToDb from "./config/connectToDb.js";
import cors from "cors";
import articleRouter from "./routes/api/articleRoutes.js";
import authRouter from "./routes/api/authRoutes.js";
import "./passport.js";
import passport from "passport";
dotenv.config();

const app = express();
connectToDb();

app.use(passport.initialize());

app.use(cors());
app.use(express.json());

app.use("/api/articles", articleRouter);
app.use("/api/auth", authRouter);
export default app;
