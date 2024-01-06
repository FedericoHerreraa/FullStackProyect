import { createContext, useContext, useEffect, useState } from "react";
import { registerRequest, loginRequest } from "../api/auth";
import { verifyTokenRequest } from "../api/auth";
import Cookies from 'js-cookie'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(true)

    const signUp = async (user) => {
        try {
            const res = await registerRequest(user);
            if (res.status === 200) {
                setUser(res.data)
                setIsAuthenticated(true)
            }
        } catch (error) {
            setErrors(error.response.data.error);
        }
    }

    const signIn = async (user) => {
        try {
            const res = await loginRequest(user)
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error)
            setErrors(error.response.data.error);
        }

    }

    const logout = () => {
        Cookies.remove('token')
        setIsAuthenticated(false)
        setUser(null)
    }

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([])
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [errors])

    useEffect(() => {
        async function chekLogin() {
            const cookies = Cookies.get()

            if (!cookies.token) {
                setIsAuthenticated(false)
                setLoading(false)
                return setUser(null)
            }

            try {
                const res = await verifyTokenRequest(cookies.token)
                if (!res.data) {
                    setLoading(false)
                    setIsAuthenticated(false)
                    return
                } 

                setIsAuthenticated(true)
                setUser(res.data)
                setLoading(false)
            } catch (err) {
                setIsAuthenticated(false)
                setUser(null)
                setLoading(false)
            }
        }
        chekLogin()
    }, [])


    return (
        <AuthContext.Provider value={{ signUp, user, isAuthenticated, errors, signIn, loading, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}