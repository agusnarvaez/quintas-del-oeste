import LotForm from "./LotForm"
import LotsList from "./LotsList"
import {useState} from "react"
export default function Main() {
  const [editionForm, setEditionForm] = useState(false)

  return (
    <main className="bg-admin-primary col-12 m-0 row justify-content-center">
        <LotForm editionForm={editionForm} setEditionForm={setEditionForm}/>

        <LotsList setEditionForm={setEditionForm}/>
    </main>
  )
}