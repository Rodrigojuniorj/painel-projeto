import styled from 'styled-components'

const BoxContainer = styled.div`
  background: ${(props) => props.theme.white};
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  margin-top: 1rem;
`

export const BoxContainer100 = styled(BoxContainer)`
 width: 98.5%;

 @media only screen and (max-width: 768px) {
    height: 90vh;
    overflow-y: scroll;
  }
`

export const BoxContainer50 = styled(BoxContainer)`
 width: 49%;
`

export const BoxContainer33 = styled(BoxContainer)`
 width: 33%;
`