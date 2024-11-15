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
  const createArticle = new Article({
    title: req.body.title,
    description: req.body.description,
    content: req.body.content,
    author: req.body.author,
    date: req.body.date,
  });

  try {
    
  } catch (error) {
    
  }
};

const articleController = {
  getArticles,
};

export default articleController;
