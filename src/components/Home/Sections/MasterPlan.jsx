import InteractiveMap from '../../Map/Map'
export default function MasterPlan() {
  return (
    <section className="container-fluid p-0" id="masterPlan">
      <InteractiveMap adminMode={false} />
    </section>
  )
}