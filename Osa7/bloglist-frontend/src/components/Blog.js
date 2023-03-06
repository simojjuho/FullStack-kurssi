import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    username: PropTypes.string,
  }

  const blogStyle = {
    border: '2px black solid',
    maxWidth: '250px',
    padding: '10px',
    marginBottom: '5px',
  }

  return (
    <div className="blogLessInfo blog" style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>
    </div>
  )
}

export default Blog
