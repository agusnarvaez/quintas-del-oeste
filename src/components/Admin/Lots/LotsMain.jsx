
import LotsList from "./LotsList"
import LotEdition from "./LotEdition"
import {useState} from "react"
import { useLots } from "../../../context/LotsContext"
export default function Main() {
  const {setLot} = useLots()
  const [editionForm, setEditionForm] = useState(false)
  const [showForm, setShowForm] = useState(false)

  return (
    <main className="admin-main bg-admin-primary col-12 mx-0 row justify-content-center">

      <LotEdition editionForm={editionForm} setEditionForm={setEditionForm} showForm={showForm} setShowForm={setShowForm}/>

      <LotsList setEditionForm={setEditionForm} setShowForm={setShowForm}/>

    </main>
  )
}