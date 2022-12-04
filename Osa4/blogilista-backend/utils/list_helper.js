const lodash = require('lodash')

const totalLikes = (blogs) => {
  const reducer = (sum, current) => {
    return sum + current.likes
  }
  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = blogs => {
  const reducer = (holder, current) => {
    return current.likes > holder.likes
      ? current
      : holder
  }
  return blogs.reduce(reducer)
}

const mostBlogs = blogs => {
  const reducer = (holder, current) => {
    return bloggers[current] > bloggers[holder]
      ? current
      : holder
  }
  const bloggers = lodash.countBy(blogs, blog => blog.author)
  return Object.keys(bloggers).reduce(reducer)

}

/* //Tehtävä 4.7 kesken

const mostLikes = blogs => {
  const reducer = (holder, current) => {
    return holder.hasOwnProperty(current.author)
      ? holder[current.author] += current.likes
      : holder[current.author] = current.likes
  }
  const reducer2 = (holder, current) => {
    return bloggersLikes[current] > bloggersLikes[holder]
      ? current
      : holder
  }
  const bloggersLikes =  blogs.reduce(reducer, {})
  console.log(bloggersLikes)
  return Object.keys(bloggersLikes).reduce(reducer2)
} */

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}


module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  dummy
}