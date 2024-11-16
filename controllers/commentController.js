import Comment from "../models/Comment.js";
import Article from "../models/Article.js";
import statusCodes from "../config/statusCodes.js";

const addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const { articleId } = req.params;

    try {
      const article = await Article.findById(articleId);
      if (!article) {
        console.log("Article not found");
        return res.status(statusCodes.notFound).json({
          message: "Article not found",
        });
      }

      const comment = new Comment({
        content,
        author: req.user._id,
        article: articleId,
      });
      await comment.save();
      res.status(statusCodes.created).json({
        message: "Comment added with success",
      });
      console.log("Comment added with success");
    } catch (error) {}
  } catch (error) {
    res.status(statusCodes.internalServerError).json({
      message: "Internal server error in adding comment",
      error: error.message,
    });
    console.log("Internal server error in adding comment");
  }
};

const getCommentsByArticle = async (req, res) => {
  const { articleId } = req.params;

  try {
    const article = await Article.findById(articleId);
    if (!article) {
      console.log("Article not found");
      return res.status(statusCodes.notFound).json({
        message: "Article not found",
      });
    }
    const comments = await Comment.find({ article: articleId })
      .populate("author", "email")
      .sort({ date: -1 });
    res.status(statusCodes.ok).json({
      message: "Comments found with success",
      data: comments,
    });
  } catch (error) {
    res.status(statusCodes.internalServerError).json({
      message: "Internal server error in getting comments",
      error: error.message,
    });
  }
};

const editComment = async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      console.log("Comment not found");
      return res.status(statusCodes.notFound).json({
        message: "Comment not found",
      });
    }

    if (comment.author.toString() !== req.user._id) {
      console.log("You are not authorized to edit this comment");
      return res.status(statusCodes.unauthorized).json({
        message: "You are not authorized to edit this comment",
      });
    }

    comment.content = content;
    await comment.save();
    res.status(statusCodes.ok).json({
      message: "Comment edited with success",
      data: comment,
    });
    console.log("Comment edited with success");
  } catch (error) {
    res.status(statusCodes.internalServerError).json({
      message: "Internal server error in editing comment",
      error: error.message,
    });
    console.log("Internal server error in editing comment");
  }
};

const deleteComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      console.log("Comment not found");
      return res.status(statusCodes.notFound).json({
        message: "Comment not found",
      });
    }

    if (
      comment.author.toString() !== req.user._id &&
      req.user.role !== "Admin"
    ) {
      console.log("You are not authorized to delete this comment");
      return res.status(statusCodes.unauthorized).json({
        message: "You are not authorized to delete this comment",
      });
    }

    await comment.remove();
    res.status(statusCodes.ok).json({
      message: "Comment deleted with success",
    });
    console.log("Comment deleted with success");
  } catch (error) {
    res.status(statusCodes.internalServerError).json({
      message: "Internal server error in deleting comment",
      error: error.message,
    });
    console.log("Internal server error in deleting comment");
  }
};

const commentController = {
  addComment,
  getCommentsByArticle,
  editComment,
  deleteComment,
};

export default commentController;
