import articleController from "../../controllers/articleController.js";
import express from "express";

const router = express.Router();

router.get("/", articleController.getArticles);
router.get("/:id", articleController.getArticleById);
router.post("/", articleController.createArticle);
router.put("/:id", articleController.updateArticle);
router.delete("/:id", articleController.deleteArticle);

export default router;
