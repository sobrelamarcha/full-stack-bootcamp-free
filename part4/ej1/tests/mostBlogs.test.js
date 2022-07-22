const listHelper = require('../utils/list_helper')
const dataForTests = require('../utils/data_for_tests')
describe('Author who has more blogs', () => {
  test.only('when list has many blogs', () => {
    const expectedResult = {
      author: 'Robert C. Martin',
      blogs: 3
    }

    const result = listHelper.mostBlogs(dataForTests.listWithManyBlogs)

    expect(result).toStrictEqual(expectedResult)
  })
})
