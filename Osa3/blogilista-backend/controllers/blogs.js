const Blog = require('../models/blog')
const blogRouter = require('express').Router()

//Kaikki blogimerkinnät tietokannasta.
blogRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

//Uusien blogimerkintöjen luominen. Virheen käsittely middlewarella
blogRouter.post('/', (request, response, next) => {
  const blog = new Blog(request.body)
  blog
    .save()
    .then(result => {
      response.json(result)
    })
    .catch(error => next(error))
})

module.exports = blogRouter