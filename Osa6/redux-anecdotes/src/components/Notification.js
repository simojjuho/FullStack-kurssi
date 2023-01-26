import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    display: 'block',
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const styleHidden = {
    display: 'hidden'
  }

  const showStyle = () => {
    return notification ? style : styleHidden
  }


  return (
    <div style={showStyle()}>
      {console.log('Notification state: ', notification)}
      {notification}
    </div>
  )
}

export default Notification