const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    comments: [
      "This blog was so cool!!",
      "I wanna be like the writer!",
      "Thanks for sharing!",
      "Would¨ve written easily a better one. Dislike button needed!",
    ],
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    comments: [
      "#dislikebuttonneeded",
      "liked it!",
      "cool",
      "This is art, not just a mere blog",
    ],
  },
];

const initialComments = [
  "This blog was so cool!!",
  "I wanna be like the writer!",
  "Thanks for sharing!",
  "Would¨ve written easily a better one. Dislike button needed!",
];

const blogsInDB = async () => {
  const result = await Blog.find({});
  return result.map((blog) => blog.toJSON());
};

const usersInDB = async () => {
  const result = await User.find({});
  return result.map((blog) => blog.toJSON());
};

/* const loginHelper = async () => {

} */

module.exports = {
  initialBlogs,
  blogsInDB,
  usersInDB,
};
