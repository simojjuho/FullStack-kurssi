const jwt = require('jsonwebtoken')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const logger = require('../utils/logger')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    user: user.username,
    id: user._id
  }

  const token = jwt.sign(
    userForToken,
    process.env.SECRET
  )
  logger.info(`Logged in: ${userForToken.user}`)
  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
