const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)

const initialBlogs = [
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

describe('blogs are fetched in json', () => {
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

    const response = await api.get('/api/blogs')

    const authors = response.body.map(a => a.author)
    expect(response.body).toHaveLength(initialBlogs.length + 1)
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

    const response = await api.get('/api/blogs')
    expect(response.body[2].likes).toBe(0)
  })
})

afterAll(() => {
  mongoose.connection.close()
})