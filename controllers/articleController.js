import Article from "../models/Article.js";
import statusCodes from "../config/statusCodes.js";

const getArticles = async (req, res) => {
  try {
    const article = await Article.find();

    if (!article) {
      console.log("Articles not found");
      return res.status(statusCodes.notFound).json({
        message: "Articles not found",
      });
    }

    res.status(statusCodes.ok).json({
      message: "Articles found with success",
      data: article,
    });
    console.log("Articles found with success");
  } catch (error) {
    res.status(statusCodes.internalServerError).json({
      message: "Internal server error in getArticles",
      error: error.message,
    });
  }
};

const createArticle = async (req, res) => {
  const article = new Article({
    title: req.body.title,
    description: req.body.description,
    content: req.body.content,
    author: req.body.author,
    date: req.body.date,
  });

  try {
    const newArticle = await article.save();
    res.status(statusCodes.created).json({
      message: "Article created with success",
      data: newArticle,
    });
  } catch (error) {
    res.status(statusCodes.internalServerError).json({
      message: "Internal server error in creating new article",
      error: error.message,
    });
    console.log("Internal server error in creating new article");
  }
};

const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      console.log("Article not found");
      return res.status(statusCodes.notFound).json({
        message: "Article not found",
      });
    }
    res.status(statusCodes.ok).json({
      message: "Article found with success",
      data: article,
    });
    console.log("Article found with success");
  } catch (error) {
    res.status(statusCodes.internalServerError).json({ error: error.message });
  }
};

const updateArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!article) {
      console.log("Article not found");
      return res.status(statusCodes.notFound).json({
        message: "Article not found",
      });
    }
    article.title = req.body.title;
    article.description = req.body.description;
    article.content = req.body.content;
    article.author = req.body.author;
    article.date = req.body.date;

    const updatedArticle = await article.save();
    res.status(statusCodes.ok).json({
      message: "Article updated with success",
      data: updatedArticle,
    });
    console.log("Article updated with success");
  } catch (error) {
    res.status(statusCodes.internalServerError).json({ error: error.message });
    console.log("Internal server error in updating article");
  }
};

const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      console.log("Article not found");
      return res.status(statusCodes.notFound).json({
        message: "Article not found",
      });
    }
    res.status(statusCodes.ok).json({
      message: "Article deleted with success",
      data: article,
    });
    console.log("Article deleted with success");
  } catch (error) {
    res.status(statusCodes.internalServerError).json({ error: error.message });
    console.log("Internal server error in deleting article");
  }
};

const articleController = {
  getArticles,
  createArticle,
  getArticleById,
  updateArticle,
  deleteArticle,
};

export default articleController;
