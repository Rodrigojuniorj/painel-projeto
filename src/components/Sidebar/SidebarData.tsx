import React from 'react'
import styled from 'styled-components'
import { House, Leaf, Pill } from 'phosphor-react'

const styleIcon = styled.div`
  color: blue;

  .something {
    border: 1px solid;
    display: block;
  }
`

export const SidebarData = [
  // {
  //   title: 'Dashboard',
  //   path: '/paineladm',
  //   icon: <House size={20} />,
  //   cName: 'nav-text',
  // },
  {
    title: 'Plantas',
    path: '/paineladm/plantas',
    icon: <Leaf size={20} />,
    cName: 'nav-text',
  },
]
