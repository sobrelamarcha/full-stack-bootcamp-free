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

const mostBlogs = (blogs) => {
  const contadores = _.countBy(blogs, 'author') //=
  const keys = Object.keys(contadores) //=
  const maximo = _.maxBy(keys, (elem) => { return contadores[elem] }) //=

  const finalAuthor = {
    author: maximo,
    blogs: contadores[maximo]
  }
  // console.log(finalAuthor)

  return finalAuthor
}

// const result = mostBlogs(testdata.listWithManyBlogs) //=

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs
}
