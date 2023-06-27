import { Link } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
export default function Register() {
  //* Obtengo los métodos necesarios para el formulario
  //* register: para registrar los inputs del formulario
  //* handleSubmit: para manejar el evento submit del formulario
  //* formState: para manejar el estado del formulario y sus errores
  const {
    register,
    handleSubmit,
    formState:{errors}
  } = useForm()

  //* Obtengo los métodos necesarios para la autenticación de la API
  //* signUp: para registrar un usuario
  //* isAuthenticated: para saber si el usuario está autenticado
  //* errors: para manejar los errores de la autenticación
  const {signUp,isAuthenticated, errors:registerErrors} = useAuth()
  const navigate = useNavigate()


  //* Función que maneja el evento submit del formulario
  const onsubmit = handleSubmit( async (values) => {
    //* Llamo a la función signUp del contexto de autenticación
    signUp(values)
  })

  //* Campos del formulario de registro de usuario
  const campos =[
    {name:"name",placeholder:"Nombre",type:"text",errors:errors.name,register:register("name",{required:true})},
    {name:"lastName",placeholder:"Apellido",type:"text",errors:errors.lastName,register:register("lastName",{required:true}),},
    {name:"email",placeholder:"Email",type:"text",errors:errors.email,register:register("email",{required:true})},
    {name:"email",placeholder:"Repetir Email",type:"text",errors:errors.email,register:register("email",{required:true})},
    {name:"password",placeholder:"Contraseña",type:"password",errors:errors.password,register:register("password",{required:true})},
    {name:"password",placeholder:"Repetir contraseña",type:"password",errors:errors.password,register:register("repeatPassword",{required:true})},
    {name:"token",placeholder:"Token",type:"password",errors:errors.token,register:register("token",{required:true})},
  ]

  //* Si el usuario está autenticado lo redirijo a la página de administración
  useEffect(() => {

    if(isAuthenticated) navigate("/admin")

  }, [isAuthenticated,registerErrors,navigate])

  return (
    <main className="overflow-hidden vh-100 bg-dark justify-content-start flex-column align-items-center row py-5">

      <h1 className="text-white text-center">Registrarse</h1>

      <form className="container-fluid row flex-column col-4 p-4 pb-0 rounded justify-content-center align-items-center bg-dark-subtle"
        onSubmit={onsubmit}
      >
        {
          //* Si hay errores en la autenticación los muestro
          registerErrors? registerErrors.map((error,i)=><span className="text-danger text-center" key={i}>{error.msg}</span>):null
        }
        { //* Muestro los campos del formulario y sus errores
        campos.map((campo,i)=>
            <div className="col-12 row justify-content-center "key={i}>
              <input
                className="col-6 my-2 form-control w-75"
                type={campo.type}
                placeholder={campo.placeholder}
                {...campo.register}
              />
              {campo.errors && (
                <span className="text-danger text-center">Este campo es requerido</span>
              )}
            </div>
            )}
        <button type="submit" className="btn btn-primary my-2 w-75">Registrarse</button>
        <Link to="/admin/login" className="my-3 text-center">Ya tengo una cuenta</Link>
      </form>

    </main>
  )
}