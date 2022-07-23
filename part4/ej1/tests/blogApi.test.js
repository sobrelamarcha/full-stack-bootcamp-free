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

test('blogs are returned as json', async () => {
  await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

afterAll(() => { mongoose.connection.close(); console.log('cerrada conexion') })
