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
  return (
    <main className="admin-main bg-admin-primary col-12 m-0 row justify-content-center">
        <Table setEditionForm={setEditionForm} setShowForm={setShowForm}/>
    </main>
  )
}