import {Link} from 'react-router-dom';

export default function ErrorNotFound() {
  return (
    <main>
      Error 404!
      <Link to="/">Volver al inicio</Link>
    </main>
  )
}