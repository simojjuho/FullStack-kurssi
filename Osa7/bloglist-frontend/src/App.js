import { useEffect } from 'react'
import Home from './components/Home'
import blogService from './services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { loggedIn } from './reducers/loggedUserReducer'
import { Route, Routes, useMatch } from 'react-router-dom'
import UsersList from './components/Users'
import LoggedIn from './components/LoggedIn'
import UserView from './components/UserView'
import { initializeUsers } from './reducers/usersReducer'
import BlogView from './components/BlogView'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'

const App = () => {
  const dispatch = useDispatch()
  const loggedInUser = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [])

  const match = useMatch('/users/:id')
  const users = useSelector((state) => state.users)
  const user = match ? users.find((user) => user.id === match.params.id) : null

  const matchBlog = useMatch('/blogs/:id')
  const blogs = useSelector((state) => state.blogs)
  const blog = matchBlog
    ? blogs.find((blog) => blog.id === matchBlog.params.id)
    : null

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
    if (loggedInUser) return <LoggedIn user={loggedInUser} />
  }

  return (
    <div className="container">
      <Navbar bg="light" variant="light" expand="sm">
        <Container>
          <Navbar.Brand href="#home">Bloglist App</Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link style={linkStyle} href="/">
              blogs
            </Nav.Link>
            <Nav.Link style={linkStyle} href="/users">
              users
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      {getLogout()}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/users/:id" element={<UserView user={user} />} />
        <Route path="/blogs/:id" element={<BlogView blog={blog} />} />
      </Routes>
    </div>
  )
}

export default App
