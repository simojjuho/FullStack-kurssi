import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/loggedUserReducer'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = (event) => {
    event.preventDefault()
    console.log('Logging in with', username, password)
    const newLogin = {
      username,
      password,
    }
    dispatch(loginUser(newLogin))

    setUsername('')
    setPassword('')
  }

  return (
    <Form onSubmit={handleLogin}>
      <Form.Group>
        <Form.Label>Username:</Form.Label>
        <Form.Control
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
        <Form.Label>Password:</Form.Label>
        <Form.Control
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
        <Button id="loginSubmit" type="submit">
          Login
        </Button>
      </Form.Group>
    </Form>
  )
}

export default LoginForm
