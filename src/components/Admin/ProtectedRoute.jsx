import { useAuth } from '../../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoute() {

  const {isAuthenticated,user} = useAuth()

  if(!isAuthenticated) return <Navigate to="/admin/login" replace/>

  return (
    <Outlet/>
  )
}