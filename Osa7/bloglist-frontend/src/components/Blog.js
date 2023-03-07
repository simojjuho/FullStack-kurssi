import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    username: PropTypes.string,
  }

  return (
    <tr>
      <td>
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
      </td>
      <td>{blog.user.name}</td>
    </tr>
  )
}

export default Blog
