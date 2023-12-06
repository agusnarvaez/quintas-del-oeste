import axios from './axios'

//* Peticiones a la API de lotes
const apiLot = {
    getAll: () => axios.get(`/lot`),
    get: id => axios.get(`/lot/${id}`),
    create: lot => axios.post(`/lot`, lot),
    update: lot => axios.put(`/lot/${lot._id}`,lot),
    delete: id => axios.delete(`/lot/${id}`),
    reserve: reservation => axios.post(`/lot/reserve`,reservation),
    reservations: () => axios.get(`/lot/reservations`),
    reservation: id => axios.get(`/lot/reservations/${id}`),
    createPaymentOrder: reservationData => axios.post(`/mercadoPago/create-order`, reservationData),
    getPaymentFeedback: paymentData => axios.post(`/mercadoPago/feedback`, paymentData),
}

export { apiLot }