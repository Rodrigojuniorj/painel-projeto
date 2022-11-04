import styled from 'styled-components'

export const LoginLayoutContainer = styled.div`
  left: 0;
  right: 0;
  bottom: 0;
  top: -10rem;
  position: absolute;

  max-width: 30rem;
  height: 50vh;
  margin: auto;
  overflow: hidden;

  background: ${(props) => props.theme.white};
  border-radius: 15px;

  display: flex;

  @media (max-width: 768px){
    max-width: 30rem;
  }
  
  @media (max-width: 426px){
    max-width: 25rem;
  }

  -webkit-box-shadow: -3px 3px 21px 1px ${(props) => props.theme['gray-400']};
  box-shadow: -3px 3px 21px 1px ${(props) => props.theme['gray-400']};
`
