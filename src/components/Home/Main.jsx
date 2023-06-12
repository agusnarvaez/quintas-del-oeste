import Barrio from './Sections/Barrio'
import Contacto from './Sections/Contacto'
import MasterPlan from './Sections/MasterPlan'
import Ubicacion from './Sections/Ubicacion'


export default function Main() {
  return (
    <main data-bs-spy="scroll" data-bs-target="#navBar" tabindex="0" data-bs-smooth-scroll="true">
      <Barrio/>
      <MasterPlan/>
      <Ubicacion/>
      <Contacto/>
    </main>
  )
}