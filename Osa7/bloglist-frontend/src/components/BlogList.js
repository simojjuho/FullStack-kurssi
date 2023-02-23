import { useSelector } from 'react-redux'
import Blog from './Blog'
import Togglable from './Togglable'
import CreateBlogForm from './CreateBlogForm'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} username={user.username} />
      ))}
      <Togglable buttonLabel={'Create new'}>
        <h2>Create a blog</h2>
        <CreateBlogForm />
      </Togglable>
    </div>
  )
}

export default BlogList
