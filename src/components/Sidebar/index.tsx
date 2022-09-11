import React, { useState } from 'react'

import { IconContext } from 'react-icons'

import { Link } from 'react-router-dom'
import { SidebarData } from './SidebarData'
import { LayoutSidebar } from './styles'
import { Header } from '../Header'

export function Sidebar() {
  const [sidebar, setSidebar] = useState(false)

  const showSidebar = () => setSidebar(!sidebar)
  return (
    <LayoutSidebar>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Header showSidebar={showSidebar} />
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <h3>Projeto AgroFarmácia</h3>
          <ul className="nav-menu-items" onClick={() => setSidebar(false)}>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </LayoutSidebar>
  )
}
