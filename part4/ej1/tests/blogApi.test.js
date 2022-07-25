const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const data = require('../utils/data_for_tests')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  for (const blog of data.initialBlogs) {
    const blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('Get all the blogs', () => {
  test('blogs are returned as json', async () => {
    await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('verify that property id exists in all of them', async () => {
    const allBlogs = await api.get('/api/blogs')
    allBlogs.body.forEach(element => {
      expect(element.id).toBeDefined()
    })
  })
})

describe('Create a new blog', () => {
  test('if title and url are not defined, the api must return a 400 error', async () => {
    const blogObj = {
      likes: 6
    }
    const newBlog = new Blog(blogObj)

    const result = await api.post('/api/blogs').send(newBlog).expect(400)

    expect(result.text).toBe('{"error":"content missing"}')
  })
})

afterAll(() => { mongoose.connection.close(); console.log('cerrada conexion') })
