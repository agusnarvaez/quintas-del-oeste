import {Link} from 'react-router-dom'
import HelmetData from '../components/HelmetData'
export default function ErrorNotFound({metaData}) {
  return (
    <main>
      <HelmetData metaData={metaData} />
      Error 404!
      <Link to="/">Volver al inicio</Link>
    </main>
  )
}