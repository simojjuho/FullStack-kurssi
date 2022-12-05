const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)
const testHelper = require('../utils/test_helper')
const User = require('../models/user')
const bcrypt = require('bcrypt')

describe('blogs are fetched', () => {

  beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = testHelper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

  test('blogs returned as json', async () => {
    //First login as root, password: 'salainen'
    const user = {
      username: 'root',
      password: 'salainen'
    }
    const loginResult = await api
      .post('/api/login')
      .send(user)

    await api
      .get('/api/blogs')
      .set( {
        'Authorization': `bearer ${loginResult.body.token}`
      })
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are two blogs', async () => {
    //First login as root, password: 'salainen'
    const user = {
      username: 'root',
      password: 'salainen'
    }
    const loginResult = await api
      .post('/api/login')
      .send(user)

    const response = await api
      .get('/api/blogs')
      .set( {
        'Authorization': `bearer ${loginResult.body.token}`
      })
    expect(response.body).toHaveLength(2)
  })

  test('first blogger is Dijkstra', async () => {
    //First login as root, password: 'salainen'
    const user = {
      username: 'root',
      password: 'salainen'
    }
    const loginResult = await api
      .post('/api/login')
      .send(user)

    const response = await api
      .get('/api/blogs')
      .set( {
        'Authorization': `bearer ${loginResult.body.token}`
      })
    expect(response.body[0].author).toBe('Edsger W. Dijkstra')
  })

  test('having and id field called id', async () => {
    //First login as root, password: 'salainen'
    const user = {
      username: 'root',
      password: 'salainen'
    }
    const loginResult = await api
      .post('/api/login')
      .send(user)

    const response = await api
      .get('/api/blogs')
      .set( {
        'Authorization': `bearer ${loginResult.body.token}`
      })
    expect(response.body[0].id).toBeDefined()
  })
})

describe('posting blogs', () => {

  beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = testHelper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)

    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('salainen', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('post a valid blog', async () => {
    //First login as root, password: 'salainen'
    const user = {
      username: 'root',
      password: 'salainen'
    }
    const loginResult = await api
      .post('/api/login')
      .send(user)

    const newBlog = {
      title: 'Blog',
      author: 'Writer',
      url: 'www.url.com',
      likes: 10
    }
    await api
      .post('/api/blogs')
      .set( {
        'Authorization': `bearer ${loginResult.body.token}`
      })
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await testHelper.blogsInDB()
    const authors = response.map(a => a.author)
    expect(response).toHaveLength(testHelper.initialBlogs.length + 1)
    expect(authors).toContain('Writer')
  })

  test('failed to post an unvalid blog', async () => {
    //First login as root, password: 'salainen'
    const user = {
      username: 'root',
      password: 'salainen'
    }
    const loginResult = await api
      .post('/api/login')
      .send(user)

    const newBlog = {
      likes: 10
    }
    await api
      .post('/api/blogs')
      .set( {
        'Authorization': `bearer ${loginResult.body.token}`
      })
      .send(newBlog)
      .expect(400)
  })

  test('undefined likes turned to zero', async () => {
    //First login as root, password: 'salainen'
    const user = {
      username: 'root',
      password: 'salainen'
    }
    const loginResult = await api
      .post('/api/login')
      .send(user)

    const newBlog = {
      title: 'Blog',
      author: 'Writer',
      url: 'www.url.com',
      likes: ''
    }
    await api
      .post('/api/blogs')
      .set( {
        'Authorization': `bearer ${loginResult.body.token}`
      })
      .send(newBlog)

    const response = await testHelper.blogsInDB()
    console.log(response)
    expect(response[2].likes).toBe(0)
  })

  test('failed tp post a new blog without a valid token', async () => {
    //First login as root, password: 'salainen'
    const newBlog = {
      title: 'Blog',
      author: 'Writer',
      url: 'www.url.com',
      likes: 10
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const blogsAtTheEnd = await testHelper.blogsInDB()
    expect(blogsAtTheEnd).toHaveLength(testHelper.initialBlogs.length)

  })
})

describe('delete a blog succesfully', () => {

  beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = testHelper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

  test('with a valid id', async () => {
    const blogsAtTheStart = await testHelper.blogsInDB()
    const blogToDelete = blogsAtTheStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtTheEnd = await testHelper.blogsInDB()
    expect(blogsAtTheEnd).toHaveLength(blogsAtTheStart.length - 1)
  })
})

describe('update a blog', () => {

  beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = testHelper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

  test('update an existing blog', async () => {
    const blogToModify = await testHelper.blogsInDB()
    const id = blogToModify[0].id
    const blogObject = {
      likes: 200
    }
    await api
      .put(`/api/blogs/${id}`)
      .send(blogObject)

    const updatedBlogs = await testHelper.blogsInDB()
    expect(updatedBlogs[0].likes).toBe(200)
  })
})

afterAll(() => {
  mongoose.connection.close()
})