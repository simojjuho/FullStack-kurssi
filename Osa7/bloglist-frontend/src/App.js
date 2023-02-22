import { useEffect } from 'react'
import Login from './components/Login'
import blogService from './services/blogs'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { loggedIn } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  //Checks on reload from the window.localStorage if a user logged in.
  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      dispatch(loggedIn(user))
      blogService.setToken(user.token)
    }
  }, [])

  return <Login />
}

export default App
