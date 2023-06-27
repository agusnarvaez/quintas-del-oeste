import { createContext, useState, useContext } from "react"
import { loginRequest, registerRequest } from '../api/auth'

//* Creo el contexto de autenticación para poder usarlo en cualquier parte de la aplicación
export const AuthContext = createContext()

//* Creo un hook para poder usar el contexto de autenticación en cualquier parte de la aplicación
export const useAuth = () => {
    //* Obtengo el contexto de autenticación desde el proveedor AuthContext
    const context = useContext(AuthContext)
    if(!context) throw new Error("useAuth debe estar dentro del proveedor AuthContext")
    return context
}

//* Creo el proveedor de autenticación para poder usarlo en cualquier parte de la aplicación
export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errors,setErrors] = useState([])

    const signUp = async (user) => {
        try{
            console.log(user)
            const repsonse = await registerRequest(user)
            console.log(repsonse.data)
            setUser(repsonse.data)
            setIsAuthenticated(true)
        }catch(error){
            console.log(error)
            setErrors(error.response.data.errors)
        }
    }

    const signIn = async (user) => {
        try{
            const repsonse = await loginRequest(user)
            setUser(repsonse.data)
            setIsAuthenticated(true)
        }catch(error){
            setErrors(error.response.data.errors)
        }
    }

    return (
        <AuthContext.Provider
            value={{
                signUp,
                signIn,
                user,
                isAuthenticated,
                errors
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}