import { Suspense, lazy } from "react"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { AuthProvider } from "./context/AuthContext"
import {LotsProvider} from "./context/LotsContext"
import ProtectedRoute from "./components/Admin/ProtectedRoute"
import quintasFavicon from './assets/logos/logoQuintasChico.png'
import quintasBlancoFavicon from './assets/logos/logoQuintasBlancoChico.png'

const Home = lazy(()=>import("./Pages/Home.jsx"))
const Admin = lazy(()=>import("./Pages/Admin.jsx"))
const Profile = lazy(()=>import("./Pages/Profile.jsx"))
const Login = lazy(()=>import("./Pages/Login.jsx"))
const Register = lazy(()=>import("./Pages/Register.jsx"))
const ReservationForm = lazy(()=>import("./Pages/ReservationForm.jsx"))
const ReservationFeedback = lazy(()=>import("./Pages/ReservationFeedback.jsx"))
const Error404 = lazy(()=>import("./Pages/ErrorNotFound.jsx"))

export default function App() {

  const metaData = {
    home:
        {
            title: "Tu sueño en General Rodriguez",
            description:"Conocé el proyecto de inversión inmobiliaria del oeste de Buenos Aires que te permitirá alcanzar la tranquilidad que estás buscando",
            keywords:"inversiones,barrio cerrado, oeste, buenos aires, general rodríguez, ",
            cannonical: "/",
            favicon: quintasFavicon
        },
    reservation:
        {
            title: "Elegí el hogar de tus sueños",
            description:"Reservá el lote donde vas a construir tu hogar y alcanzá la tranquilidad que estás buscando",
            keywords:"",
            cannonical: "/reservar-lote",
            favicon: quintasFavicon
        },
    admin:
        {
            title: "Panel administrador",
            description:"",
            keywords:"",
            cannonical: "/admin",
            favicon: quintasBlancoFavicon
        },
    register:
        {
            title: "Registrate",
            description:"Registrarse",
            keywords:"inversión, novedades, real estate",
            cannonical: "/admin/register",
            favicon: quintasBlancoFavicon
        },
    login:
        {
            title: "Logueate",
            description:"Logueate",
            keywords:"",
            cannonical: "/admin/login",
            favicon: quintasBlancoFavicon
        },
    profile:
        {
            title: "Gestioná tu perfil",
            description:"",
            keywords:"",
            cannonical: "/admin/profile",
            favicon: quintasBlancoFavicon
        },
    error404:
        {
            title: "Página no encontrada | Error 404",
            description:"No se ha encontrado la página que busca. Puede volver al inicio.",
            keywords:"error, 404",
            cannonical: "/*",
            favicon: quintasFavicon
        }
}

  return (
    <Suspense fallback={<div className="loading">Cargando...</div>}>
          <BrowserRouter>
      <AuthProvider>
        <LotsProvider>
            <Routes>
              <Route path="/" element={<Home metaData={metaData.home} />} />
              <Route path="/reservar-lote" element={<ReservationForm metaData={metaData.reservation} />} />
              <Route path="/pago-realizado" element={<ReservationFeedback metaData={metaData.reservation} />} />
              <Route element={<ProtectedRoute/>}>
                <Route path="/admin" element={<Admin metaData={metaData.admin} />} />
                <Route path="/admin/profile" element={<Profile metaData={metaData.admin} />} />
              </Route>
              <Route path="/admin/login" element={<Login metaData={metaData.login} />} />
              <Route path="/admin/register" element={<Register metaData={metaData.register} />} />
              <Route path="/*" element={<Error404 metaData={metaData.error404} />} />
            </Routes>
        </LotsProvider>
      </AuthProvider>
          </BrowserRouter>
    </Suspense>
  )
}