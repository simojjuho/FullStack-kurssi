import { useSelector } from 'react-redux'
import Alert from 'react-bootstrap/Alert'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (!notification.payload) return null

  return <Alert variant={notification.type}>{notification.payload}</Alert>
}

export default Notification
