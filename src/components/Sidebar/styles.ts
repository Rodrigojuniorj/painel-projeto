import styled from 'styled-components'

export const LayoutSidebar = styled.nav`
  display: flex;
  
  .navbar {
    background-color: #3F4D67;
    height: 80px;
    display: flex;
    justify-content: start;
    align-items: center;
  }

  .menu-bars {
    margin-left: 2rem;
    font-size: 2rem;
    background: none;
  }

  .nav-menu {
    background-color: ${(props) => props.theme['sidebar-color']};
    box-shadow: 1px 0 20px 0 #3f4d67;
    width: 16.5rem;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: fixed;
    left: 0;
    transition: 350ms;

    h3 {
      display: block;
      width: 100%;
      height: 10vh;
      text-align: center;
      padding-top: 1rem;
      font-size: 20px;
      color:  ${(props) => props.theme['gray-100']};
    }

    ul {
      height: 90vh;
      
    }
  }

  .nav-menu.active {
    width: 50%;
    position: absolute;
    height: 100vh;
    left: 0;
    transition: 350ms;
  }

  .nav-text {
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 0.5rem 0.7rem;
    list-style: none;
    height: 60px;
  }

  .nav-text a {
    text-decoration: none;
    color: ${(props) => props.theme['sidebar-text']};
    font-size: 0.8rem;
    width: 95%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 16px;
    border-radius: 0 15px 15px 0;
    transition: 0.3s;
  }

  .nav-text a:hover {
    color: ${(props) => props.theme['sidebar-text-hover']};
  }

  .nav-text a:select {
    background-color: ${(props) => props.theme['gray-850']};
  }

  .nav-menu-items {
    width: 100%;
    padding-left: 0 !important;
  }

  .navbar-toggle {
    background-color: #060b26;
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: start;
    align-items: center;
  }

  span {
    margin-left: 16px;
  }
  @media only screen and (max-width: 768px) {
    .nav-menu {
      top: 45px;
      left: -100%;
      transition: 850ms;
    }
  }
`
