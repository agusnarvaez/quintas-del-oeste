import LotForm from "./LotForm"
import LotsList from "./LotsList"
import {useState} from "react"
export default function Main() {
  const [editionForm, setEditionForm] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const handleAccordion = ()=>{
    console.log("Handle accordion!")
    setShowForm(!showForm)
    if(editionForm){
      setEditionForm(false)
    }
  }
  return (
    <main className="bg-admin-primary col-12 m-0 row justify-content-center">
      <div className="col-12 py-2 d-flex flex-column align-items-center p-0">

        <h2 onClick={handleAccordion} className="col-11 fs-1 p-3 rounded-4 text-admin-primary p-0 bg-admin-secondary d-flex justify-content-between ">{editionForm?'Editar':'Agregar'} Lote<i className={showForm?"bi bi-plus fw-bolder accordion-admin-button rotate-45":"bi bi-plus fw-bolder accordion-admin-button"} /></h2>

        <div className={showForm?"col-12 col-lg-11 p-0 m-0 accordion-admin-content":"col-12 col-lg-11 p-0 m-0 accordion-admin-content collapsed"}>
          <LotForm editionForm={editionForm} setEditionForm={setEditionForm}/>
        </div>

      </div>


        <LotsList setEditionForm={setEditionForm} setShowForm={setShowForm}/>
    </main>
  )
}