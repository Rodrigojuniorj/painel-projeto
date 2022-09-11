import { HeaderContainer } from './styles'

import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FiLogOut } from 'react-icons/fi'
import { FcManager } from 'react-icons/fc'
import * as FaIcons from 'react-icons/fa'

export function Header({ showSidebar }: any) {
  const navigate = useNavigate()

  return (
    <HeaderContainer>
      <Link to="#" className="menu-bars">
        <FaIcons.FaBars onClick={showSidebar} />
      </Link>
      <img src="" alt="" />
      <nav>
        <button type="button"  title="Deslogar">
          <FiLogOut size={24} />
        </button>
        <NavLink to="/" title="Timer">
          <div>
            <FcManager size={24} />
          </div>
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
