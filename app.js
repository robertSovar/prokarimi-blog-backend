import express from "express";
import dotenv from "dotenv";
import connectToDb from "./config/connectToDb.js";
import cors from "cors";
import articleRouter from "./routes/api/articleRoutes.js";
import authRouter from "./routes/api/authRoutes.js";
import commentRouter from "./routes/api/commentRoutes.js";
import "./passport.js";
import passport from "passport";
dotenv.config();

const app = express();
connectToDb();

app.use(passport.initialize());

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.options("*", cors(corsOptions));

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/articles", articleRouter);
app.use("/api/auth", authRouter);
app.use("/api/comments", commentRouter);
export default app;
