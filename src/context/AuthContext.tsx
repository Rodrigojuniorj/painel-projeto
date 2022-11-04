import { ReactNode, useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { createContext } from 'use-context-selector'
import { Api } from '../services/api'
import { useNavigate } from 'react-router-dom'

interface User {
  login: string,
  password: string,
}

interface AuthProviderProps {
  children: ReactNode
}

interface AuthContextType {
  authLogin: (data: User) => Promise<void>
  userLogin: () => void
  logout: () => void
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>()

  const navigate = useNavigate()

  const authLogin = useCallback(
    async (data: User) => {
      const { login, password } = data
      
      await Api.post('/api/user/login', {
        login,
        password,
      })
      .then((response) => {
        setUser(response.data)
        localStorage.setItem('@info-plantas:auth-1.0.0', JSON.stringify(response.data))
        navigate('/admin')
      })
      .catch((error) => {
        toast.error(error.response.data['error'])
      })
    },
    [],
  )

  const userLogin = useCallback(() => {
    console.log('dawad')
    const user = localStorage.getItem('@info-plantas:auth-1.0.0')
    if (!user) {
      console.log('dwadw')
      navigate('/')
    }
  },[])

  const logout = useCallback(() => {
    localStorage.removeItem('@info-plantas:auth-1.0.0')
    navigate('/')
  },[])

  return (
    <AuthContext.Provider
      value={{
        authLogin,
        userLogin,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}