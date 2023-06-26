import axios from 'axios'

const API = 'http://localhost:3030/api/auth'

const loginRequest = user => axios.post(`${API}/login`, user)

const registerRequest = user => axios.post(`${API}/register`, user)

export { loginRequest, registerRequest}