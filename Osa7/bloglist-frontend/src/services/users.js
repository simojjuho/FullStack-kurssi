import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/users'

export const getUsers = async () => {
  const result = await axios.get(baseUrl)
  return result.data
}
