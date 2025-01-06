import express from "express";
import commentController from "../controllers/commentController.js";
import userController from "../controllers/userController.js";

const router = express.Router();

router.get(
  "/:articleId",
  userController.validateAuth,
  commentController.getCommentsByArticle
);
router.post("/", commentController.addComment);
router.put("/:id", userController.validateAuth, commentController.editComment);
router.delete(
  "/:id",
  userController.validateAuth,
  commentController.deleteComment
);

export default router;
