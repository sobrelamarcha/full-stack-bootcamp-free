const listHelper = require('../utils/list_helper')
const dataForTests = require('../utils/data_for_tests')
describe('Author who has more blogs', () => {
  test('when list has many blogs', () => {
    const result = listHelper.mostBlogs(dataForTests.listWithManyBlogs)
    expect(result).toBe('Robert C. Martin')
  })
})
