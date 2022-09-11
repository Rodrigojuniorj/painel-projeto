import styled from 'styled-components'

export const LayoutContainer = styled.div`
  margin-left: 17rem;
  margin-top: 90px;
  transition: 350ms;
  padding: 0 2%;
  width: calc(100vw - 17.5rem);
  height: 100vw;

  @media only screen and (max-width: 768px) {
    margin-left: 0;
    transition: 650ms;

    width: 100%;
  }
`
