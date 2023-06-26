import { Handler } from 'leaflet'
import {useForm} from 'react-hook-form'

export default function Register() {
  const {register,handleSubmit} = useForm()

  return (
    <main className="vh-100 bg-dark justify-content-start flex-column align-items-center row py-5">

      <h1 className="text-white text-center">Registrarse</h1>

      <form className="container-fluid row flex-column col-4 p-4 rounded justify-content-center align-items-center bg-dark-subtle"
        onSubmit={handleSubmit( (data) => console.log(data))}
      >

        <input className="col-6 my-2 form-control w-75" type="text" placeholder="Nombre" {...register("name",{required:true})} />
        <input className="col-6 my-2 form-control w-75" type="text" placeholder="Apellido" {...register("lastName",{required:true})} />
        <input className="col-6 my-2 form-control w-75" type="text" placeholder="Email" {...register("email",{required:true})} />
        <input className="col-6 my-2 form-control w-75" type="text" placeholder="Repetir Email" {...register("email",{required:true})} />
        <input className="col-6 my-2 form-control w-75" type="text" placeholder="Contraseña" {...register("password",{required:true})} />
        <input className="col-6 my-2 form-control w-75" type="text" placeholder="Repetir contraseña" {...register("password",{required:true})} />
        <input className="col-6 my-2 form-control w-75" type="text" placeholder="Token" {...register("token",{required:true})} />
        <button type="submit" className="btn btn-primary w-75">Registrarse</button>

      </form>

    </main>
  )
}