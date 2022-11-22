import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const createContact = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const updateContact = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
    
}

const deleteContact = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const update = (id, updatedContact) => {
    const request = axios.put(`${baseUrl}/${id}`, updatedContact)
    return request.then(response => response.data)
}

export default {
    getAll,
    createContact,
    updateContact,
    deleteContact,
    update
}