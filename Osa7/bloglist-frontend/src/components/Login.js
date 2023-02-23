import Blog from './Blog'
import CreateBlogForm from './CreateBlogForm'
import Notification from './Notification'
import LoginForm from './LoginForm'
import Togglable from './Togglable'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'

const Login = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const logout = () => {
    dispatch(logoutUser())
  }

  if (user === null) {
    return (
      <div id="loginVisible">
        <h2>Login</h2>
        <Notification />
        <LoginForm />
      </div>
    )
  }
  return (
    <div id="blogList">
      <Notification />
      <p>{user.name} logged in</p>
      <button onClick={() => logout()}>logout</button>
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

export default Login
