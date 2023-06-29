import axios from './axios'

//* Peticiones a la API de lotes
const apiLot = {
    getAll: ()=>axios.get(`/lots`),
    get: id => axios.get(`/lots${id}`),
    create: lot => axios.post(`/lots/create`, lot),
    update: lot => axios.put(`/lots/update/${lot._id}`,lot),
    reserve: (lot,user) => axios.put(`/lots/update/${lot._id}`,lot,user),
    delete: id => axios.delete(`/lots/delete/${id}`)
}

export { apiLot }