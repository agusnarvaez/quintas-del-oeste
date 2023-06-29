import LotForm from "./LotForm"
import LotsList from "./LotsList"
export default function Main() {
  return (
    <main className="bg-dark-subtle col-12 m-0 row justify-content-center">

        <LotForm/>

        <LotsList/>
    </main>
  )
}