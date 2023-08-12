import LotForm from "./LotForm"
import LotsList from "./LotsList"
import {useState} from "react"
import { useLots } from "../../../context/LotsContext"
export default function Main({showForm,setShowForm,editionForm, setEditionForm}) {
  const {setLot} = useLots()

  const handleAccordion = ()=>{
    setShowForm(!showForm)
    if(editionForm){
      setLot({})
      setEditionForm(false)
    }
  }

  return (
    <>
      <div className="col-12 py-2 d-flex flex-column align-items-center p-0">
        <h2 onClick={handleAccordion} className="col-11 cursor-pointer admin-lotForm-button fs-1 p-3 rounded-4 text-admin-primary p-0 bg-admin-secondary d-flex justify-content-between ">{editionForm?'Editar':'Agregar'} Lote<i className={showForm?"bi bi-plus fw-bolder accordion-admin-button rotate-45":"bi bi-plus fw-bolder accordion-admin-button"} /></h2>

        <div className={showForm?"col-12 overflow-hidden col-lg-11 p-0 m-0 accordion-admin-content":"col-12 overflow-hidden col-lg-11 p-0 m-0 accordion-admin-content collapsed"}>
          <LotForm editionForm={editionForm} setEditionForm={setEditionForm}/>
        </div>

      </div>
    </>
  )
}