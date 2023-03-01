const middleware = require("../utils/middleware");
const logger = require("../utils/logger");
const Blog = require("../models/blog");
const commentRouter = require("express").Router();

commentRouter.get("/:id/comments", async (req, res) => {
  const response = await Blog.findById(req.params.id);
  res.json(response);
});

commentRouter.post("/:id/comments", async (req, res) => {
  const content = req.body;
  const blog = await Blog.findById(req.params.id);
  blog = blog.comments.concat(content);
  const result = await blog.save();
  res.status(201).json(result);
});
