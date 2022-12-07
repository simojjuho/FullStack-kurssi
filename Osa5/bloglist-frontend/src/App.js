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
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    console.log('Logging in with', username, password)
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUsername('')
      setPassword('')      
    } catch (error) {
      setErrorMsg('unauthorized')
      setTimeout(() => {
        setErrorMsg(null)
      }, 5000)
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const handleCreate = async event => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url
    }
    console.log(`Creating a blog ${newBlog.toString()}`)
    try {
      const result = await blogService.create(newBlog)
      console.log(result)
      setAuthor('')
      setTitle('')
      setUrl('')
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )  
    } catch (exeption) {
      setErrorMsg(exeption.error)
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
        <p>{user.name} logged in</p> 
        <button onClick={()=>logout()}>logout</button>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
        <h2>Create a blog</h2>
        <form onSubmit={handleCreate}>
          <input 
            type='text'
            value={title}
            name='Title'
            onChange={({ target })=> setTitle(target.value)}
          />
          <input
            type='text'
            value={author}
            name='Author'
            onChange={({ target }) => setAuthor( target.value )}
            />
          <input
            type='text'
            value={url}
            name='Url'
            onChange={({ target }) => setUrl( target.value )}
          />
          <button type='submit'>create</button>
        </form>
      </div>
    )
  }

  return (
    login()
  )
}

export default App
