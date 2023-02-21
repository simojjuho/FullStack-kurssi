import { useState, useEffect } from 'react'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [infoMsg, setInfoMsg] = useState(null)
  const dispatch = useDispatch()

  //One function to handle communication with blogService.getAll()
  const getAllBlogs = async () => {
    const newBlogs = await blogService.getAll()
    const blogsSorted = sortBlogs(newBlogs)
    setBlogs(blogsSorted)
  }

  const sortBlogs = (blogs) => {
    return [...blogs].sort((a, b) => {
      return b.likes - a.likes
    })
  }

  useEffect(() => {
    dispatch(initializeBlogs())
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

  const handleLogin = async (newLogin) => {
    try {
      const user = await loginService.login(newLogin)
      setUser(user)
      setInfoMsg('Login succesful!')
      setTimeout(() => {
        setInfoMsg(null)
      }, 5000)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
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
  const handleCreate = async (newBlog) => {
    try {
      const result = await blogService.create(newBlog)
      getAllBlogs()
      console.log(result)
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

  const handleAddLike = async (newBlog, id) => {
    try {
      const result = await blogService.update(newBlog, id)
      setBlogs(sortBlogs(blogs))
      setInfoMsg('Like added!')
      setTimeout(() => {
        setInfoMsg(null)
      }, 5000)
      console.log(result)
    } catch (exception) {
      console.log(exception)
      setErrorMsg(exception)
      setTimeout(() => {
        setErrorMsg(null)
      }, 5000)
    }
  }

  const handleRemove = async (id) => {
    try {
      const result = await blogService.remove(id)
      getAllBlogs()
      console.log('Blog removal status:', result.status)
      setInfoMsg('Blog removed')
      setTimeout(() => {
        setInfoMsg(null)
      }, 5000)
    } catch (exception) {
      console.log(exception)
      setErrorMsg(exception)
      setTimeout(() => {
        setErrorMsg(null)
      }, 5000)
    }
  }

  return (
    <Login
      user={user}
      handleLogin={handleLogin}
      handleCreate={handleCreate}
      logout={logout}
      errorMsg={errorMsg}
      infoMsg={infoMsg}
      handleAddLike={handleAddLike}
      handleRemove={handleRemove}
    />
  )
}

export default App
