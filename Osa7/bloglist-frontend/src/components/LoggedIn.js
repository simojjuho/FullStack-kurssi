import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { newInfoMsg } from '../reducers/notificationReducer'
import { logoutUser } from '../reducers/loggedUserReducer'
import Button from 'react-bootstrap/Button'

const LoggedIn = ({ user }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const logout = () => {
    dispatch(logoutUser())
    navigate('/')
    dispatch(newInfoMsg('Logged out!'))
  }
  return (
    <div className="text-right">
      <p>{user.name} logged in</p>
      <Button onClick={() => logout()}>logout</Button>
    </div>
  )
}

export default LoggedIn
