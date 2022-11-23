const totalLikes = (blogs) => {
  const reducer = (sum, current) => {
    return sum + current.likes
  }
  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)

}

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}


module.exports = {
  totalLikes,
  dummy
}