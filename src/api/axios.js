import axios from 'axios'
import credentials from '../credentials'
const instance = axios.create({
    baseURL: credentials.api.devUrl,
    withCredentials: true})

export default instance