const Blog = require("../models/blog");
const User = require("../models/user");
const blogRouter = require("express").Router();
const middleware = require("../utils/middleware");
const logger = require("../utils/logger");

//Kaikki blogimerkinnät tietokannasta.
blogRouter.get("/", async (request, response) => {
  const receivedBlogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  response.json(receivedBlogs);
});

//Uusien blogimerkintöjen luominen.
blogRouter.post(
  "/",
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (request, response) => {
    const body = request.body;
    if (!request.token || !request.user.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }
    const user = await User.findById(request.user.id);
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id,
    });
    if (
      blog.title === undefined ||
      blog.author === undefined ||
      blog.url === undefined
    ) {
      response.status(400).send({ error: "Content missing!" });
    }

    if (!blog.likes) blog.likes = 0;

    const result = await blog.save();
    user.blogs = user.blogs.concat(result._id);
    await user.save();
    response.status(201).json(result);
  }
);

//Blogimerkintöjen poistaminen
blogRouter.delete(
  "/:id",
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (request, response) => {
    if (!request.token || !request.user.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }
    const user = request.user.id;
    const blog = await Blog.findById(request.params.id);
    const blogMakerId = blog.user.toString();

    if (!(user.toString() === blogMakerId)) {
      return response
        .status(401)
        .json({ error: "blog post made by other user" });
    }

    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  }
);

//Blogimerkintöjen päivittäminen
blogRouter.put("/:id", async (request, response) => {
  const body = request.body;
  const blogObject = {
    title: body.title,
    author: body.author,
    url: body.author,
    likes: body.likes,
    comments: [],
  };
  const result = await Blog.findByIdAndUpdate(request.params.id, blogObject, {
    new: true,
  });
  response.json(result);
});

blogRouter.get("/:id/comments", async (req, res) => {
  const result = await Blog.findById(req.params.id);
  const comments = result.comments;
  console.log(comments);
  res.json(comments);
});

blogRouter.post("/:id/comments", async (req, res) => {
  const content = req.body.content;
  console.log("req:", content);
  if (!content) {
    return res.status(400).json({ error: "no comment to add" });
  }
  const blog = await Blog.findById(req.params.id);
  if (!blog.comments) {
    blog = {
      ...blog,
      comments: [{ content }],
    };
  } else {
    const id = blog.comments.length + 1;
    blog.comments = blog.comments.concat({ content, id });
  }
  const result = await blog.save();
  res.status(201).json(result);
});

module.exports = blogRouter;
