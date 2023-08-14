/* import LotForm from "./LotForm" */
import Table from "../Table"
import {useState} from "react"
/* import { useLots } from "../../../context/LotsContext" */
export default function Main() {
  /* const {setLot} = useLots() */
  const [editionForm, setEditionForm] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const handleAccordion = ()=>{
    setShowForm(!showForm)
    if(editionForm){
      /* setLot({}) */
      setEditionForm(false)
    }
  }
  const titles = [
    {name:'Nombre',size:2},
    {name:'Apellido',size:2},
    {name:'Email',size:3},
    {name:'Rol',size:3},
    {name:'Acciones',size:3}
  ]
  const elementsList =[
    {
      name:'Juan',
      lastName:'Perez',
      email:'juan.perez@gmail.com',
      rol:'Admin',
      actions:'Editar Eliminar'
    },
    {
      name:'Juan',
      lastName:'Perez',
      email:'juan.perez@gmail.com',
      rol:'Admin',
      actions:'Editar Eliminar'
    }
  ]

  return (
    <main className="admin-main bg-admin-primary col-12 mx-0 row justify-content-center">
      
        <Table
          title='Usuarios'
          titles={titles}
          elementsList={elementsList}

        setEditionForm={setEditionForm} setShowForm={setShowForm}/>
    </main>
  )
}