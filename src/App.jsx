import { Suspense, lazy } from "react"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { AuthProvider } from "./context/AuthContext"
import {LotsProvider} from "./context/LotsContext"
import ProtectedRoute from "./components/Admin/ProtectedRoute"

const Home = lazy(()=>import("./pages/Home"))
const Admin = lazy(()=>import("./pages/Admin"))
const Login = lazy(()=>import("./pages/Login"))
const Register = lazy(()=>import("./pages/Register"))
const ReservationForm = lazy(()=>import("./pages/ReservationForm"))
const Error404 = lazy(()=>import("./pages/ErrorNotFound"))
export default function App() {
  return (
    <Suspense fallback={<div className="loading">Cargando...</div>}>
      <AuthProvider>
        <LotsProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/reservar-lote" element={<ReservationForm />} />
              <Route element={<ProtectedRoute/>}>
                <Route path="/admin" element={<Admin />} />
              </Route>
              <Route path="/admin/login" element={<Login />} />
              <Route path="/admin/register" element={<Register />} />
              <Route path="*" element={<Error404 />} />
            </Routes>
          </BrowserRouter>
        </LotsProvider>
      </AuthProvider>
    </Suspense>
  )
}


