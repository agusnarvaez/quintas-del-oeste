import axios from './axios'

//* Login and Register requests
const getLots = ()=>axios.get(`/lots`)
const getLot = id => axios.get(`/lots${id}`)
const createLot = lot => axios.post(`/lots/create`, lot)
const updateLot = lot => axios.put(`/lots/update/${lot._id}`,lot)
const reserveLot = lot => axios.put(`/lots/update/${lot._id}`,lot)
const deleteLot = id => axios.delete(`/lots/delete/${id}`)

export { getLots, getLot,createLot,updateLot,deleteLot,reserveLot}