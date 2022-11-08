import { ReactNode, useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { createContext } from 'use-context-selector'
import { Api } from '../services/api'
import { useNavigate } from 'react-router-dom'
import { getLocalStorage, setLocalStorage } from '../utils/localStorageExpires'

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
      
      await Api.post('/usuario/login/', {        
        nome: login,
        senha: password,
      })
      .then((response) => {
        setUser(response.data)
        setLocalStorage('@info-plantas:auth-1.0.0', JSON.stringify(response.data), 1)
        navigate('/paineladm/plantas')
      })
      .catch((error) => {
        toast.error(error.response.data['error'])
      })
    },
    [],
  )

  const userLogin = useCallback(() => {
    const user = getLocalStorage('@info-plantas:auth-1.0.0')
    if (!user) {
      navigate('/')
    }
  },[])

  const logout = useCallback(
    async () => {
      const user = JSON.parse(getLocalStorage('@info-plantas:auth-1.0.0'))

      await Api.delete(`/usuario/logout/`, {
        data: user
      })
      .then((response) => {
        localStorage.removeItem('@info-plantas:auth-1.0.0')
        navigate('/')
      })
      .catch((error) => {
        toast.error(error.response.data['error'])
      })
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