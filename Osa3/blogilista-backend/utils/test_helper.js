const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  }
]

const blogsInDB = async () => {
  const result = await Blog.find({})
  return result.map(blog => blog.toJSON())
}

const usersInDB = async () => {
  const result = await User.find({})
  return result.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDB,
  usersInDB
}