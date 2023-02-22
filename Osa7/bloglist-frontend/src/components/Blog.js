import { useState } from 'react'
import PropTypes from 'prop-types'
import { addLike, deleteBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const Blog = ({ blog, username }) => {
  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    username: PropTypes.string,
  }

  const dispatch = useDispatch()
  const [showMore, setShowMore] = useState(false)
  const toggleVisibility = () => {
    setShowMore(!showMore)
  }

  const blogStyle = {
    border: '2px black solid',
    maxWidth: '250px',
    padding: '10px',
    marginBottom: '5px',
  }

  const handleLike = (id) => {
    dispatch(
      addLike({
        user: blog.user.id,
        title: blog.title,
        author: blog.author,
        likes: blog.likes + 1,
        url: blog.url,
        id,
      })
    )
  }

  const handleDelete = () => {
    if (window.confirm(`Want to delete ${blog.author}: ${blog.title}?`)) {
      dispatch(deleteBlog(blog.id))
    }
  }

  const deleteButton = () => {
    return username === blog.user.username ? (
      <button className="deleteButton" onClick={() => handleDelete()}>
        delete
      </button>
    ) : null
  }

  if (showMore) {
    return (
      <div className="blogMoreInfo blog" style={blogStyle}>
        Title: {blog.title}
        <button className="viewLessButton" onClick={() => toggleVisibility()}>
          view less
        </button>
        <br />
        Author: {blog.author}
        <br />
        Likes: {blog.likes}
        <br />
        <button className="addLike" onClick={() => handleLike(blog.id)}>
          like
        </button>
        <br />
        Url: {blog.url}
        <br />
        {deleteButton()}
      </div>
    )
  } else {
    return (
      <div className="blogLessInfo blog" style={blogStyle}>
        {blog.title} {blog.author}
        <button className="viewMoreButton" onClick={() => toggleVisibility()}>
          view more
        </button>
      </div>
    )
  }
}

export default Blog
