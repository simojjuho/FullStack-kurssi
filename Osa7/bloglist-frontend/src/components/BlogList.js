import { useSelector } from 'react-redux'
import Blog from './Blog'
import Togglable from './Togglable'
import CreateBlogForm from './CreateBlogForm'
import { Table } from 'react-bootstrap'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  return (
    <div>
      <h2>blogs</h2>
      <Table striped>
        <tbody>
          <tr>
            <td>blog:</td>
            <td>added by:</td>
          </tr>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} username={user.username} />
          ))}
        </tbody>
      </Table>
      <Togglable
        buttonLabel={'Create new'}
        heading={<h3>Create a new blog</h3>}
      >
        <CreateBlogForm />
      </Togglable>
    </div>
  )
}

export default BlogList
