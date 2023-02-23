import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification.payload) {
    console.log(notification.payload)

    const chooseStyle = () => {
      if (notification.type === 'info') {
        return {
          backgroundColor: '#77FF77',
          border: 'grey 2px solid',
          padding: '10px 5px 10px 5px',
          textAlign: 'center',
          maxWidth: '150px',
        }
      } else {
        return {
          backgroundColor: '#FF7777',
          border: 'grey 2px solid',
          padding: '10px 5px 10px 5px',
          textAlign: 'center',
          maxWidth: '150px',
        }
      }
    }

    return <p style={chooseStyle()}>{notification.payload}</p>
  }

  return null
}

export default Notification
