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

module.exports = blogRouter