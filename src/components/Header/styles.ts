import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  height: 3.75rem;
  width: calc(100% - 16.5rem);
  left: 16.5rem;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  background-color: ${(props) => props.theme['header-color']};
  z-index: 100;
  
  @media only screen and (max-width: 768px) {
    width: 100%;
    left: 0rem;
    
  }

  button {
    display: flex;
    align-items: center;
    margin-right: 0.5rem;
    border: none;
    border-top: 3px solid transparent;
    border-bottom: 3px solid transparent;

    cursor: pointer;
    background: transparent;

    &:hover {
      border-bottom: 3px solid ${(props) => props.theme['blue-500']};
    }

    &:focus {
      box-shadow: none;
    }
  }

  nav {
    display: flex;
    margin: 0 20px 0 0;
    gap: 0.5rem;

    a {
      width: 3rem;
      height: 3rem;

      display: flex;
      justify-content: center;
      align-items: center;

      color: ${(props) => props.theme['gray-100']};

      border-top: 3px solid transparent;
      border-bottom: 3px solid transparent;

      &:hover {
        border-bottom: 3px solid ${(props) => props.theme['blue-500']};
      }

      &.active {
        color: ${(props) => props.theme['blue-500']};
      }
    }
    a:last-child {
      width: auto;
      text-decoration: none;

      div {
        display: flex;
        align-items: center;
      }
      label:hover {
        cursor: pointer;
      }
    }
  }
  img {
    margin: 0 20px;
  }
  .menu-bars {
    display: none;
  }
  @media only screen and (max-width: 768px) {
    .menu-bars {
      display: flex;
    }
    img {
      display: none;
    }
  }
`
