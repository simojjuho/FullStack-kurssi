const Blog = require('../models/blog')
const User = require('../models/user')
const blogRouter = require('express').Router()

//Kaikki blogimerkinnät tietokannasta.
blogRouter.get('/', async (request, response) => {
  const receivedBlogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(receivedBlogs)
})

//Uusien blogimerkintöjen luominen.
blogRouter.post('/', async (request, response) => {
  const body = request.body
  if (!request.token || !request.user.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(request.user.id)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })
  if (blog.title === undefined || blog.author === undefined || blog.url === undefined) {
    response.status(400).send({ error: 'Content missing!' })
  }

  if (blog.likes === undefined) blog.likes = 0

  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()

  response.status(201).json(result.toJSON)
})

//Blogimerkintöjen poistaminen
blogRouter.delete('/:id', async (request, response) => {
  if (!request.token || !request.user.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = request.user.id
  const blog = await Blog.findById(request.params.id)
  const blogMakerId = blog.user.toString()

  if (!(user.toString() === blogMakerId)) {
    return response.status(401).json({ error: 'blog post made by other user' })
  }

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

//Blogimerkintöjen päivittäminen
blogRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blogObject = {
    title: body.title,
    author: body.author,
    url: body.author,
    likes: body.likes
  }
  const result = await Blog
    .findByIdAndUpdate(request.params.id, blogObject, { new: true })
  response.json(result)
})

module.exports = blogRouter