import { Link } from 'react-router-dom'
import { registerRequest } from '../api/auth'
import {useForm} from 'react-hook-form'

export default function Register() {
  const {register,handleSubmit} = useForm()
  const onsubmit = handleSubmit( async (values) => {
    console.log(values)
    const repsonse = await registerRequest(values)
    console.log(repsonse)
  })
  return (
    <main className="overflow-hidden vh-100 bg-dark justify-content-start flex-column align-items-center row py-5">

      <h1 className="text-white text-center">Registrarse</h1>

      <form className="container-fluid row flex-column col-4 p-4 pb-0 rounded justify-content-center align-items-center bg-dark-subtle"
        onSubmit={onsubmit}
      >

        <input className="col-6 my-2 form-control w-75" type="text" placeholder="Nombre" {...register("name",{required:true})} />
        <input className="col-6 my-2 form-control w-75" type="text" placeholder="Apellido" {...register("lastName",{required:true})} />
        <input className="col-6 my-2 form-control w-75" type="text" placeholder="Email" {...register("email",{required:true})} />
        <input className="col-6 my-2 form-control w-75" type="text" placeholder="Repetir Email" {...register("email",{required:true})} />
        <input className="col-6 my-2 form-control w-75" type="password" placeholder="Contraseña" {...register("password",{required:true})} />
        <input className="col-6 my-2 form-control w-75" type="password" placeholder="Repetir contraseña" {...register("password",{required:true})} />
        <input className="col-6 my-2 form-control w-75" type="password" placeholder="Token" {...register("token",{required:true})} />
        <button type="submit" className="btn btn-primary my-2 w-75">Registrarse</button>
        <Link to="/admin/login" className="my-3 text-center">Ya tengo una cuenta</Link>
      </form>

    </main>
  )
}