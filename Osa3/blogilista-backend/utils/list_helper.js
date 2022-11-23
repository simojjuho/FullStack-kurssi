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

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}


module.exports = {
  totalLikes,
  favoriteBlog,
  dummy
}