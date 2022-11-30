const Blog = require('../models/blog')
const blogRouter = require('express').Router()

//Kaikki blogimerkinnät tietokannasta.
blogRouter.get('/', async (request, response) => {
  const receivedBlogs = await Blog.find({})
  response.json(receivedBlogs)
})

//Uusien blogimerkintöjen luominen. Virheen käsittely middlewarella
blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  if (blog.title === undefined ||blog.author === undefined ||blog.url === undefined) {
    response.status(400).send({ error: 'Content missing!' })
  }

  if (blog.likes === undefined) blog.likes = 0

  const result = await blog.save()
  response.status(201).json(result)
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

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