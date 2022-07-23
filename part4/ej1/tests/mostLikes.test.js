const listHelper = require('../utils/list_helper')
const dataForTests = require('../utils/data_for_tests')
describe('Author who has more likes', () => {
  test.only('when list has many blogs', () => {
    const expectedResult = {
      author: 'Edsger W. Dijkstra',
      likes: 17
    }

    const result = listHelper.mostLikes(dataForTests.listWithManyBlogs)

    expect(result).toStrictEqual(expectedResult)
  })
})
