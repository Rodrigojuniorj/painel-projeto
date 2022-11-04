import { useContextSelector } from "use-context-selector"
import { AuthContext } from "../context/AuthContext"

export function userLogin(){
  const login = useContextSelector(AuthContext, (context) => {
    return context.userLogin
  })
  
  login()
}