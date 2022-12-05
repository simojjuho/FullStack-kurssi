import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  console.log(response)
  return response.user
  
}

export default { 
  getAll
}