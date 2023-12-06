import axios from './axios'

//* Peticiones a la API de lotes
const apiLot = {
    getAll: () => axios.get(`/lots`),
    get: id => axios.get(`/lots/${id}`),
    create: lot => axios.post(`/lots`, lot),
    update: lot => axios.put(`/lots/${lot._id}`,lot),
    delete: id => axios.delete(`/lots/${id}`),
    reserve: reservation => axios.post(`/lots/reserve`,reservation),
    reservations: () => axios.get(`/lots/reservations`),
    reservation: id => axios.get(`/lots/reservations/${id}`),
    createPaymentOrder: reservationData => axios.post(`/mercadoPago/create-order`, reservationData),
    getPaymentFeedback: paymentData => axios.post(`/mercadoPago/feedback`, paymentData),
}

export { apiLot }