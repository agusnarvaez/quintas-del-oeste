import axios from './axios'

//* Peticiones a la API de lotes
const apiLot = {
    getAll: () => axios.get(`/lot`),
    get: id => axios.get(`/lot/${id}`),
    create: lot => axios.post(`/lot/create`, lot),
    update: lot => axios.put(`/lot/update/${lot._id}`,lot),
    reserve: reservation => axios.post(`/lot/reserve`,reservation),
    delete: id => axios.delete(`/lot/delete/${id}`),
    createPaymentOrder: reservationData => axios.post(`/mercadoPago/create-order`, reservationData),
    getPaymentFeedback: paymentData => axios.post(`/mercadoPago/feedback`, paymentData),
    reservations: () => axios.get(`/lot/reservations`),
    reservation: id => axios.get(`/lot/reservations/${id}`),
}

export { apiLot }