import { useState, useEffect } from 'react'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

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
      //...
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
    } catch (error) {
      //...
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  return <Login user={user} handleLogin={handleLogin} logout={logout} />
}

export default App
