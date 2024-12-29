import express from "express";
import dotenv from "dotenv";
import connectToDb from "../config/connectToDb.js";
import cors from "cors";
import articleRouter from "./article/article.js";
import authRouter from "./auth/auth.js";
import commentRouter from "./comment/comment.js";
import "../passport.js";
import passport from "passport";
import colors from "colors";
dotenv.config();

const app = express();
connectToDb();

app.use(passport.initialize());

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.options("*", cors(corsOptions));

app.use(cors(corsOptions));
app.use(express.json());

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(colors.green(`Server is running on port ${port}`));
});

app.use("/api/articles", articleRouter);
app.use("/api/auth", authRouter);
app.use("/api/comments", commentRouter);
app.use("api/hello", (req, res) => {
  res.send("Hello world");
});
export default app;
