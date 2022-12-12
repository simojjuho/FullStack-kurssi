import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleLogin,
}) => {
  LoginForm.propTypes = ({
    handleLogin: PropTypes.func.isRequired
  })

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const logIn = event => {
    event.preventDefault()
    console.log('Logging in with', username, password)
    const newLogin = {
      username,
      password
    }
    handleLogin(newLogin)

    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={logIn}>
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
  )
}

export default LoginForm