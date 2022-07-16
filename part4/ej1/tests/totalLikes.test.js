const listHelper = require('../utils/list_helper')
const dataForTests = require('../utils/data_for_tests')

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(dataForTests.listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has many blogs, the result is the sum of them', () => {
    const result = listHelper.totalLikes(dataForTests.listWithManyBlogs)
    expect(result).toBe(36)
  })
})
