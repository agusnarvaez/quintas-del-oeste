import axios from './axios'

//* Peticiones a la API de lotes
const apiLot = {
    getAll: () => axios.get(`/lots`),
    get: id => axios.get(`/lots${id}`),
    create: lot => axios.post(`/lots/create`, lot),
    update: lot => axios.put(`/lots/update/${lot._id}`,lot),
    reserve: reservation => axios.post(`/lots/reserve`,reservation),
    delete: id => axios.delete(`/lots/delete/${id}`),
    createPaymentOrder: reservationData => axios.post(`/mercadoPago/create-order`, reservationData),
}

export { apiLot }