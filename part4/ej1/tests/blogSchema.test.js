const Blog = require('../models/blog')

describe('Verify when using the Blog Schema ', () => {
  test('if property likes is not set, then the default value is zero', () => {
    const blogObj = {
      title: 'aaa',
      author: 'bbb',
      url: 'xxx'

    }
    const newBlog = new Blog(blogObj)

    expect(newBlog.likes).toBe(0)
  })
})
