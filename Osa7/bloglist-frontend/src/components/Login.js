import Blog from './Blog'
import CreateBlogForm from './CreateBlogForm'
import ErrorMessage from './ErrorMessage'
import InfoMessage from './InfoMessage'
import LoginForm from './LoginForm'
import Togglable from './Togglable'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const Login = ({
  user,
  handleLogin,
  handleCreate,
  logout,
  errorMsg,
  infoMsg,
  handleRemove,
}) => {
  Login.propTypes = {
    user: PropTypes.object,
    handleLogin: PropTypes.func.isRequired,
    handleCreate: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    handleRemove: PropTypes.func.isRequired,
  }
  const blogs = useSelector((state) => state.blogs)

  if (user === null) {
    return (
      <div id="loginVisible">
        <h2>Login</h2>
        <ErrorMessage errorMsg={errorMsg} />

        <LoginForm handleLogin={handleLogin} />
      </div>
    )
  }
  return (
    <div id="blogList">
      <InfoMessage infoMsg={infoMsg} />
      <p>{user.name} logged in</p>
      <button onClick={() => logout()}>logout</button>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleRemove={handleRemove}
          username={user.username}
        />
      ))}
      <Togglable buttonLabel={'Create new'}>
        <h2>Create a blog</h2>
        <CreateBlogForm handleCreate={handleCreate} />
      </Togglable>
    </div>
  )
}

export default Login
