import { Link } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'

import AdminHeader from '../components/Admin/AdminHeader'
import HelmetData from '../components/HelmetData'
import '../assets/styles/adminPanel.css'
import CRUDNotification from '../components/Admin/CRUDNotification'

export default function Profile({metaData}) {
  //* Obtengo los métodos necesarios para el formulario
  //* register: para registrar los inputs del formulario
  //* handleSubmit: para manejar el evento submit del formulario
  //* formState: para manejar el estado del formulario y sus errores
  const {
    register,
    handleSubmit,
    formState:{errors},
    getValues
  } = useForm()

  //* Obtengo los métodos necesarios para la autenticación de la API
  //* isAuthenticated: para saber si el usuario está autenticado
  //* errors: para manejar los errores de la autenticación
  const {user,isAuthenticated,updateRegisteredUser, errors:registerErrors} = useAuth()
  const navigate = useNavigate()

  const [showPopUp,setShowPopUp] = useState(false)
  const [text,setText] = useState("")
  const [deleteConfirmation,setDeleteConfirmation] = useState(false)


  const userData = {
    _id: user._id,
    name: user.name,
    lastName: user.lastName,
    email: user.email,
    password: undefined,
    newPassword: undefined,
    repeatNewPassword: undefined
  }

  //* Función que maneja el evento submit del formulario
  const onsubmit = handleSubmit( async (values) => {
    //* Llamo a la función signUp del contexto de autenticación

    const userToUpdate = {
      _id: userData._id,
      name: values.name,
      lastName: values.lastName,
      email: values.email
    }

    if(values.password && values.newPassword) {
      userToUpdate.password = values.password
      userToUpdate.newPassword = values.newPassword
    }

    const response = await updateRegisteredUser(userToUpdate)
    if(response.status==='User updated') {
      setText("Usuario editado correctamente")
      setShowPopUp(true)
    }
  })

  //* Campos del formulario de registro de usuario
  const campos =[
    {name:"name",placeholder:"Nombre",type:"text",errors:errors.name,register:register("name")},
    {name:"lastName",placeholder:"Apellido",type:"text",errors:errors.lastName,register:register("lastName"),},
    {name:"email",placeholder:"Email",type:"text",errors:errors.email,register:register("email")},
    {name:"password",placeholder:"Contraseña vieja",type:"password",errors:errors.password,register:register("password")},
    {name:"newPassword",placeholder:"Nueva Contraseña",type:"password",errors:errors.newPassword,register:register("newPassword")},
    {name:"repeatNewPassword",placeholder:"Repetir nueva contraseña",type:"password",errors:errors.repeatNewPassword,register:register("repeatNewPassword",{
      validate: (value) => value === getValues("newPassword") || "Las contraseñas no coinciden" //* Valido que las contraseñas coincidan
    })}
  ]
  //* Si el usuario está autenticado lo redirijo a la página de administración
  useEffect(() => {

    if(!isAuthenticated) navigate("/admin/login")

  }, [isAuthenticated,registerErrors,navigate])

  return (
    <>
      <HelmetData metaData={metaData} />
      <AdminHeader />
      <main className="overflow-hidden vh-100 bg-dark justify-content-start flex-column align-items-center row py-5">

        <h1 className="text-white text-center">Editar usuario</h1>

        <form className="container-fluid position-relative row flex-column col-11 col-md-7 col-lg-4 p-4 pb-0 rounded justify-content-center align-items-center bg-dark-subtle"
          onSubmit={onsubmit}
        >
          <CRUDNotification showPopUp={showPopUp} setShowPopUp={setShowPopUp} text={text}  />
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
                  defaultValue={userData[campo.name]}
                  {...campo.register}
                />
                {campo.errors && campo.errors.message && (
                  <span className="text-danger text-center">{campo.errors.message}</span>
                )}
              </div>
              )}
          <button type="submit" className="btn btn-primary my-2 w-75">Editar</button>
          {/* <button to="/admin/login" className="col-6 my-3 btn btn-danger text-center text-white">Eliminar usuario</button> */}
        </form>

      </main>
    </>
  )
}