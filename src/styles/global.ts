import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :focus {
    outline: 0;
    box-shadow: 0 0 0 1px ${(props) => props.theme['blue-700']};
  }

  body {
    overflow-x: hidden;
    background: ${(props) => props.theme['gray-300']};
    color: ${(props) => props.theme['gray-700']};
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 1rem;
  }



  @media (max-width: 1080px){
    html {
      font-size: 93.75%;
    }
  }

  @media (max-width: 720px){
    html {
      font-size: 87.5%;
    }
  }
`
