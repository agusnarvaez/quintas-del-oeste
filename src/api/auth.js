import axios from './axios'

//* Login and Register requests
const loginRequest = user => axios.post(`/login`, user)
const registerRequest = user => axios.post(`/register`, user)
const logoutRequest = () => axios.post(`/logout`)
const verifyToken = () => axios.get('/verifyToken')



export { loginRequest, registerRequest,logoutRequest,verifyToken}