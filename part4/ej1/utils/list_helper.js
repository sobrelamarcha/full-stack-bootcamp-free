const _ = require('lodash')
// const testdata = require('./data_for_tests')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce(function (acc, obj) { return acc + obj.likes }, 0)
}

const favoriteBlog = (blogs) => {
  // Find the maximum number of votes first

  const listLikes = blogs.map(object => {
    return object.likes
  })

  const maxLikes = Math.max(...listLikes)

  // Find the blog that contains the number of likes obtained in the previous step
  return blogs.find((blog) => blog.likes === maxLikes)
}

const getMax = (obj) => {
  const keys = Object.keys(obj) //=
  const maximo = _.maxBy(keys, (elem) => { return obj[elem] }) //=
  return maximo
}

const mostBlogs = (blogs) => {
  const contadores = _.countBy(blogs, 'author') //=
  const maximo = getMax(contadores) //=

  const finalAuthor = {
    author: maximo,
    blogs: contadores[maximo]
  }
  // console.log(finalAuthor)

  return finalAuthor
}

const mostLikes = (blogs) => {
  const blogAuthors = _.groupBy(blogs, 'author') //=

  const obj = {}
  for (const author in blogAuthors) {
    obj[author] = blogAuthors[author].reduce((acc, o) => {
      return acc + o.likes
    }, 0)
  }

  console.log(obj)
  const maximo = getMax(obj) //=

  const newObj = {
    author: maximo,
    likes: obj[maximo]
  } //=

  return newObj
}

// const result1 = mostBlogs(testdata.listWithManyBlogs) //=
// const result2 = mostLikes(testdata.listWithManyBlogs) //=

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}
