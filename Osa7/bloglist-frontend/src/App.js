import { useEffect } from 'react'
import Home from './components/Home'
import blogService from './services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { loggedIn } from './reducers/userReducer'
import { Link, Route, Routes } from 'react-router-dom'
import UsersList from './components/Users'
import LoggedIn from './components/LoggedIn'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const linkStyle = {
    padding: '2px 5px',
  }

  //Checks on reload from the window.localStorage if a user logged in.
  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      dispatch(loggedIn(user))
      blogService.setToken(user.token)
    }
  }, [])

  const getLogout = () => {
    if (user) return <LoggedIn user={user} />
  }

  return (
    <div>
      <div>
        <Link style={linkStyle} to="/">
          blogs
        </Link>
        <Link style={linkStyle} to="/users">
          users
        </Link>
      </div>
      {getLogout()}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UsersList />} />
      </Routes>
    </div>
  )
}

export default App
