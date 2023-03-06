import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (newBlog) => {
  const response = await axios.put(`${baseUrl}/${newBlog.id}`, newBlog)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response
}

const createComment = async (id, content) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, content)
  return response.data
}

const blogs = {
  getAll,
  create,
  setToken,
  update,
  remove,
  createComment,
}

export default blogs
