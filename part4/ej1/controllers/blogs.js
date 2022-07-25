const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({})

  response.json(blogs)
})

blogsRouter.post('/', (request, response, next) => {
  if (!('title' in request.body) || !('url' in request.body)) {
    return response.status(400).json({ error: 'content missing' })
  }
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = blogsRouter
