import { useSelector } from 'react-redux'
import Notification from './Notification'
import BlogList from './BlogList'
import Login from './Login'

const Home = () => {
  const user = useSelector((state) => state.user)
  if (user === null) {
    return <Login />
  }

  return (
    <div>
      <div id="blogList">
        <Notification />
        <BlogList />
      </div>
    </div>
  )
}

export default Home
