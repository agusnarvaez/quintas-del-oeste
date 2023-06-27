
import { Link } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
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
  const {signIn,isAuthenticated, errors:loginErrors} = useAuth()
  const navigate = useNavigate()


  //* Función que maneja el evento submit del formulario
  const onsubmit = handleSubmit( async (values) => {
    //* Llamo a la función signUp del contexto de autenticación
    signIn(values)
  })

  //* Campos del formulario de registro de usuario
  const campos =[
    {name:"email",placeholder:"Email",type:"text",errors:errors.email,register:register("email",{required:true})},
    {name:"password",placeholder:"Contraseña",type:"password",errors:errors.password,register:register("password",{required:true})}
  ]

  //* Si el usuario está autenticado lo redirijo a la página de administración
  useEffect(() => {

    if(isAuthenticated) navigate("/admin")

  }, [isAuthenticated,loginErrors,navigate])

  return (
    <main className="overflow-hidden vh-100 bg-dark justify-content-start flex-column align-items-center row py-5">

      <h1 className="text-white text-center">Iniciar sesión</h1>

      <form className="container-fluid row flex-column col-4 p-4 pb-0 rounded justify-content-center align-items-center bg-dark-subtle"
        onSubmit={onsubmit}
      >
        {
          //* Si hay errores en la autenticación los muestro
          loginErrors? loginErrors.map((error,i)=><span className="text-danger text-center" key={i}>{error.msg}</span>):null
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
                <span className="text-danger text-center">{campo.errors.message}</span>
              )}
            </div>
            )}
        <button type="submit" className="btn btn-primary my-2 w-75">Iniciar sesión</button>
        <Link to="/admin/register" className="my-3 text-center">No tengo una cuenta</Link>
      </form>

    </main>
  )
}