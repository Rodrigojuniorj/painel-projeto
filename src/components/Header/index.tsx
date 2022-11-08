import { HeaderContainer } from './styles'

import { Link } from 'react-router-dom'
import { FiLogOut } from 'react-icons/fi'
import * as FaIcons from 'react-icons/fa'
import { useContextSelector } from 'use-context-selector'
import { AuthContext } from '../../context/AuthContext'

export function Header({ showSidebar }: any) {
  const logout = useContextSelector(AuthContext, (context) => {
    return context.logout
  })

  function handleLoggout(){
    logout()
  }

  return (
    <HeaderContainer>
      <Link to="#" className="menu-bars">
        <FaIcons.FaBars onClick={showSidebar} />
      </Link>
      <img src="" alt="" />
      <nav>
        <button type="button" onClick={handleLoggout} title="Deslogar">
          <FiLogOut size={24} />
        </button>
      </nav>
    </HeaderContainer>
  )
}
