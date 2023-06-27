import axios from 'axios'
import credentials from '../credentials'
const API = credentials.api.testUrl

//* Login and Register requests
const loginRequest = user => axios.post(`${API}/login`, user)
const registerRequest = user => axios.post(`${API}/register`, user)

export { loginRequest, registerRequest}