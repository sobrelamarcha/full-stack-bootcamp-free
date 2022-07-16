const listHelper = require('../utils/list_helper')
const dataForTests = require('../utils/data_for_tests')

describe('Find the favorite blog ', () => {
  test('that has more likes', () => {
    const result = listHelper.favoriteBlog(dataForTests.listWithManyBlogs)
    expect(result).toStrictEqual(dataForTests.actualFavoriteBlog)
  })
})
