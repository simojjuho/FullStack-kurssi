import Blog from './Blog'
import CreateBlogForm from './CreateBlogForm'
import Notification from './Notification'
import LoginForm from './LoginForm'
import Togglable from './Togglable'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const Login = ({ user, handleLogin, logout }) => {
  Login.propTypes = {
    user: PropTypes.object,
    handleLogin: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
  }
  const blogs = useSelector((state) => state.blogs)

  if (user === null) {
    return (
      <div id="loginVisible">
        <h2>Login</h2>
        <LoginForm handleLogin={handleLogin} />
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
