import { Outlet } from 'react-router-dom'
import { userLogin } from '../../hooks/userLogin'
import { LoginLayoutContainer } from './styles'

export function LoginLayout() {
  
  return (
    <LoginLayoutContainer>
      <Outlet />
    </LoginLayoutContainer>
  )
}
