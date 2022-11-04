import { Outlet } from 'react-router-dom'
import { LoginLayoutContainer } from './styles'

export function LoginLayout() {
  return (
    <LoginLayoutContainer>
      <Outlet />
    </LoginLayoutContainer>
  )
}
