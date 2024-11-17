import express from "express";
import commentController from "../../controllers/commentController.js";
import validateAuth from "../../controllers/userController.js";

const router = express.Router();

router.get("/:articleId", validateAuth, commentController.getCommentsByArticle);
router.post("/", commentController.addComment);
router.put("/:id", validateAuth, commentController.editComment);
router.delete("/:id", validateAuth, commentController.deleteComment);

export default router;
