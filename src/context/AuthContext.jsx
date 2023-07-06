import { createContext, useState, useContext, useEffect } from "react"
import { loginRequest, registerRequest,logoutRequest,verifyToken } from '../api/auth'
import Cookie from 'js-cookie'
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
            const response = await registerRequest(user)
            setUser(response.data.user)
            setIsAuthenticated(true)
        }catch(error){
            console.log(error)
            setErrors(error.response.data.errors)
        }
    }

    const signIn = async (user) => {
        try{
            const response = await loginRequest(user)
            setUser(response.data.user)
            setIsAuthenticated(true)
        }catch(error){
            setErrors(error.response.data.errors)
        }
    }

    const signOut = async () => {
        try{
            const response = await logoutRequest()
            Cookie.remove('token')
            setUser(null)
            setIsAuthenticated(false)
        }catch(error){
            console.log(error.response)
        }
    }

    useEffect(() => {
        if(errors.length > 0){
            const timer = setTimeout(() => {
                setErrors([])
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [errors])

    useEffect(()=>{
        //* Verifico si el usuario está logueado
        const checkLogin= async() => {
            //* Obtengo el token de la cookie
            const token = Cookie.get('token')
            //* Si el token existe, verifico que sea válido
            if(token){
                try{
                    const response = await verifyToken(token)
                    //* Si el token no es válido, elimino la cookie y el usuario
                    if(!response.data) setIsAuthenticated(false)
                    //* Si el token es válido, seteo el usuario y la autenticación
                    setIsAuthenticated(true)
                    setUser(response.data)
                }catch(error){
                    //* Si el token no es válido, elimino la cookie y el usuario
                    setIsAuthenticated(false)
                    setUser(null)
                    console.log(error.response)
                }
            }
        }
        //* Ejecuto la verificación del token
        checkLogin()
    },[])

    return (
        <AuthContext.Provider
            value={{
                signUp,
                signIn,
                signOut,
                user,
                isAuthenticated,
                errors
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}