const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
usersRouter.post('/', async (request, response) => {
  console.log('request')

  if (!request.body) {
    return response.status(400).send({ error: 'request body cannot be empty' })
  }
  console.log('body checked')

  const { username, name, password } = request.body
  if (!username || !name || !password) {
    return response
      .status(400)
      .send({ error: 'one or more of the fields empty' })
  } else if (username.length < 3 || password.length < 3) {
    return response
      .status(400)
      .send({ error: 'username and password must be at least 3 chars long' })
  }
  console.log('credintials checked')

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const user = new User({
    username,
    name,
    passwordHash,
  })
  const savedUser = await user.save()
  console.log(savedUser)

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    url: 1,
    title: 1,
    author: 1,
  })
  response.status(200).json(users)
})

module.exports = usersRouter
