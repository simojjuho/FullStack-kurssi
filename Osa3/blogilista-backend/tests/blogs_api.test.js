const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)
const testHelper = require('../utils/test_helper')

describe('blogs are fetched in json', () => {

  beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = testHelper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

  test('blogs returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(2)
  })

  test('first blogger is Dijkstra', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].author).toBe('Edsger W. Dijkstra')
  })

  test('having and id field called id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

describe('posting blogs', () => {

  beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = testHelper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

  test('post a valid blog', async () => {
    const newBlog = {
      title: 'Blog',
      author: 'Writer',
      url: 'www.url.com',
      likes: 10
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await testHelper.blogsInDB()
    const authors = response.map(a => a.author)
    expect(response).toHaveLength(testHelper.initialBlogs.length + 1)
    expect(authors).toContain('Writer')
  })

  test('post an unvalid blog', async () => {
    const newBlog = {
      likes: 10
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('undefined likes turned to zero', async () => {
    const newBlog = {
      title: 'Blog',
      author: 'Writer',
      url: 'www.url.com'
    }
    await api
      .post('/api/blogs')
      .send(newBlog)

    const response = await testHelper.blogsInDB()
    expect(response[2].likes).toBe(0)
  })
})

describe('delete a blog', () => {

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
    console.log(id)
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