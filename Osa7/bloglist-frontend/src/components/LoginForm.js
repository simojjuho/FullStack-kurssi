import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'

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
    <form onSubmit={handleLogin}>
      <input
        id="username"
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
      <input
        id="password"
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
      <button id="loginSubmit" type="submit">
        Login
      </button>
    </form>
  )
}

export default LoginForm
