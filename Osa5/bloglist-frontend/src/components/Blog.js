import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleAddLike, handleRemove, username }) => {
  Blog.propTypes = ({
    blog: PropTypes.object.isRequired,
    handleAddLike: PropTypes.func.isRequired,
    handleRemove: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired
  })

  const [showMore, setShowMore] = useState(false)

  const toggleVisibility = () => {
    setShowMore(!showMore)
  }

  const blogStyle = {
    border: '2px black solid',
    maxWidth:  '250px',
    padding: '10px',
    marginBottom: '5px'
  }

  const addLike = () => {
    blog.likes += 1
    handleAddLike({
      user: blog.user.id,
      title: blog.title,
      author: blog.author,
      likes: blog.likes,
      url: blog.url
    }, blog.id)
  }

  const deleteBlog = () => {
    if (window.confirm(`Want to delete ${blog.author}: ${blog.title}?`)) {
      handleRemove(blog.id)
    }
  }

  const deleteButton = () => {
    return username === blog.user.username
      ? <button onClick={() => deleteBlog()}>delete</button>
      : null
  }

  if(showMore) {
    return (
      <div style={blogStyle}>
        Title: {blog.title}<button onClick={() => toggleVisibility()}>view less</button><br />
        Author: {blog.author}<br />
        Likes: {blog.likes}<br />
        <button onClick={() => addLike(blog.id)}>like</button><br />
        Url: {blog.url}<br />
        {deleteButton()}
      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={() => toggleVisibility()}>view more</button>
      </div>
    )
  }
}


export default Blog