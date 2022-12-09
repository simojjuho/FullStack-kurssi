import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [infoMsg, setInfoMsg] = useState(null)


  //One function to handle communication with blogService.getAll()
  const getAllBlogs = async () => {
    const newBlogs = await blogService.getAll()
    setBlogs(newBlogs)
  }

  useEffect(() => {
    getAllBlogs()
  }, [])

  //Checks on reload if a user logged in, checks from the window.localStorage
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
      setInfoMsg('Login succesful!')
      setTimeout(() => {
        setInfoMsg(null)
      }, 5000)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMsg('Unauthorized, wrong username and/or password')
      setTimeout(() => {
        setErrorMsg(null)
      }, 5000)
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  //Takes care of new blog creation
  const handleCreate = async newBlog => {
    try {
      const result = await blogService.create(newBlog)
      setBlogs(blogs.concat(result))
      setInfoMsg('Blog succesfully created!')
      setTimeout(() => {
        setInfoMsg(null)
      }, 5000)
    } catch (exeption) {
      setErrorMsg(exeption.error)
      setTimeout(() => {
        setErrorMsg(null)
      }, 5000)
    }
  }

  return (
    <Login 
      username={username}
      password={password}
      setUsername={setUsername}
      setPassword={setPassword}
      user={user}
      blogs={blogs}
      handleLogin={handleLogin}
      handleCreate={handleCreate}
      logout={logout}
      errorMsg={errorMsg}
      infoMsg={infoMsg}
    />
  )
}

export default App
