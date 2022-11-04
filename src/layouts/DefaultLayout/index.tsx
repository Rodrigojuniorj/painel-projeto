import { Outlet } from 'react-router-dom'
import { Sidebar } from '../../components/Sidebar'
import { userLogin } from '../../hooks/userLogin'
import { LayoutContainer } from './styles'

export function DefaultLayout() {
  userLogin()

  return (
    <>
      <Sidebar />
      <LayoutContainer>
        <Outlet />
      </LayoutContainer>
    </>
  )
}
