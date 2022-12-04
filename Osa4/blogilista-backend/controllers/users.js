const User = require('../models/user')
const bcrypt = require('bcrypt')
const userRouter = require('express').Router()

userRouter.get('/', async (request, response) => {
  const result = await User
    .find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
  response.json(result)
})

userRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  if (password.length < 3) return response.status(400).json({
    error: 'password must be at least 3 characters long'
  })

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})


module.exports = userRouter