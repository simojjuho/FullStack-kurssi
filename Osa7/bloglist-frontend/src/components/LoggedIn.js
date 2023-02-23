import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { newInfoMsg } from '../reducers/notificationReducer'
import { logoutUser } from '../reducers/userReducer'

const LoggedIn = ({ user }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const logout = () => {
    dispatch(logoutUser())
    navigate('/')
    dispatch(newInfoMsg('Logged out!'))
  }
  return (
    <div>
      <p>{user.name} logged in</p>
      <button onClick={() => logout()}>logout</button>
    </div>
  )
}

export default LoggedIn
