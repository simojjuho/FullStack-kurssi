const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const api = supertest(app)
const testHelper = require('../utils/test_helper')
const bcrypt = require('bcrypt')

describe('initially one user in db', () => {
  beforeEach( async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('salainen', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('succesfully creating new user', async () => {
    const usersAtStart = await testHelper.usersInDB()
    console.log('usersAtStart',usersAtStart)
    const user = {
      username: 'jusimo',
      name: 'juho',
      password: 'salaus'
    }

    await api
      .post('/api/users')
      .send(user)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await testHelper.usersInDB()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = (await usersAtEnd).map(user => user.username)
    expect(usernames).toContain('jusimo')
  })

  test('failing to create existing username', async () => {
    const usersAtStart = await testHelper.usersInDB()
    console.log('usersAtStart',usersAtStart)
    const user = {
      username: 'root',
      password: 'salaus'
    }

    await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await testHelper.usersInDB()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

})