import { Outlet } from 'react-router-dom'
import { Sidebar } from '../../components/Sidebar'
import { LayoutContainer } from './styles'

export function DefaultLayout() {
  return (
    <>
      <Sidebar />
      <LayoutContainer>
        <Outlet />
      </LayoutContainer>
    </>
  )
}
