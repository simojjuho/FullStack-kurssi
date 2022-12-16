import Blog from './Blog'
import CreateBlogForm from './CreateBlogForm'
import ErrorMessage from './ErrorMessage'
import InfoMessage from './InfoMessage'
import LoginForm from './LoginForm'
import Togglable from './Togglable'
import PropTypes from 'prop-types'

const Login = ({
  user,
  blogs,
  handleLogin,
  handleCreate,
  logout,
  errorMsg,
  infoMsg,
  handleAddLike,
  handleRemove

}) => {
  Login.propTypes = ({
    user: PropTypes.object,
    blogs: PropTypes.array.isRequired,
    handleLogin: PropTypes.func.isRequired,
    handleCreate: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    handleAddLike: PropTypes.func.isRequired,
    handleRemove: PropTypes.func.isRequired
  })

  if (user === null) {
    return (
      <div id='loginVisible'>
        <h2>Login</h2>
        <ErrorMessage
          errorMsg={errorMsg}
        />

        <LoginForm
          handleLogin={handleLogin}
        />

      </div>
    )
  }
  return (
    <div id='blogList'>
      <InfoMessage
        infoMsg={infoMsg}
      />
      <p>{user.name} logged in</p>
      <button onClick={() => logout()}>logout</button>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleAddLike={handleAddLike} handleRemove={handleRemove} username={user.username}/>
      )}
      <Togglable buttonLabel={'Create new'}>
        <h2>Create a blog</h2>
        <CreateBlogForm
          handleCreate={handleCreate}
        />
      </Togglable>
    </div>
  )
}

export default Login