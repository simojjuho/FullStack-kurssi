import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    console.log('Logging in with', username, password)
    try{
      const user = await loginService.login({ username, password })
      setUser(user)
      console.log(user)
      setUsername('')
      setPassword('')      
    } catch (error) {
      setErrorMsg('unauthorized')
      setTimeout(() => {
        setErrorMsg(null)
      }, 5000)
    }
  }

  const login = () => {
    if (user === null) {
      return (
        <div>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input 
              type='text'
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)}
            />
            <input 
              type='password'
              value={password}
              name='Password'
              onChange={({ target }) => setPassword(target.value)}
              />
              <button 
                type='submit'
                >
                Login
              </button>
          </form>
        </div>
      )
    }
    return (
      <div>      
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }

  return (
    login()
  )
}

export default App
