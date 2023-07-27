import Neighborhood from './Sections/Neighborhood'
import Contact from './Sections/Contact'
import MasterPlan from './Sections/MasterPlan'
import Location from './Sections/Location'
import Services from './Sections/Services'
import Payments from './Sections/Payments'
export default function Main() {
  return (
    <main data-bs-spy="scroll" data-bs-target="#navBar" tabIndex="0" data-bs-smooth-scroll="true">
      <Contact/>
      {/* <Neighborhood/> */}
      <Services />
      <MasterPlan/>
      <Payments/>
      <Location/>
    </main>
  )
}