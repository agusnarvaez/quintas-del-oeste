import axios from 'axios'
import credentials from '../credentials'
const instance = axios.create({
    baseURL: credentials.api.testUrl,
    withCredentials: true})

export default instance