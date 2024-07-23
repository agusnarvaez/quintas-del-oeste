import axios from './axios'

//* Login and Register requests
const getAll = () => axios.get('/user')

const deleteById = (id) => axios.delete(`/user/${id}`)

export { getAll,deleteById }