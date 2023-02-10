import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'


const getAll = async () => {
    const result = await axios.get(baseUrl)
    return result.data
}

const create = async data => {
    const result = await axios.post(baseUrl, data)
    return result.data
}

const update = async updatedAnecdote => {
    const response = await axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote)
    return response.data
}

const requests = {
    getAll,
    create,
    update
}

export default requests