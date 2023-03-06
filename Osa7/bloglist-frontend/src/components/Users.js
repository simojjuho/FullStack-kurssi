import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getUsers } from '../services/users'
import User from './User'

const UsersList = () => {
  const [users, setUsers] = useState([])
  const loggedInUser = useSelector((state) => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (loggedInUser === null) navigate('/')
    getUsers().then((userList) => setUsers(userList))
  }, [])

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <td></td>
            <td>
              <strong>blogs created</strong>
            </td>
          </tr>
          {users.map((user) => (
            <User key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsersList
