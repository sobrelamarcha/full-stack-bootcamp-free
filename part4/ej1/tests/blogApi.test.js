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

  test('verify that property id exists', async () => {
    const allBlogs = await api.get('/api/blogs')
    expect(allBlogs.body[0].id).toBeDefined()
  })
})

afterAll(() => { mongoose.connection.close(); console.log('cerrada conexion') })
