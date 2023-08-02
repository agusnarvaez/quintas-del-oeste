import axios from './axios'

//* Login and Register requests
const loginRequest = user => axios.post(`/auth/login`, user)
const registerRequest = user => axios.post(`/auth/register`, user)
const logoutRequest = () => axios.post(`/auth/logout`)
const updateUser = user => axios.put(`/user/update/${user._id}`, user)
const verifyToken = () => axios.get('/auth/verifyToken')

export { loginRequest, registerRequest,logoutRequest,verifyToken,updateUser}