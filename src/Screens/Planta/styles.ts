import styled from "styled-components";


export const PlantaList = styled.div`
  flex: 1;
  overflow: auto;
  margin-top: 2rem;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;

    tr {
      

      &:hover{
        background: ${(props) => props.theme["gray-100"]};
      }
    }

    th {
      color: ${(props) => props.theme["gray-600"]};
      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.6;
      text-align: center;
    }

    td {
      color: ${(props) => props.theme["gray-600"]};
      border-top: 1px solid ${(props) => props.theme['gray-400']};
      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.6;
      text-align: center;
    }

    .escolhaTipo{
      display: flex;
      justify-content: center;
      gap: 0.5rem;

      button {
        &:first-child{
          background: ${(props) => props.theme["red-500"]};
        }
        background: ${(props) => props.theme["green-500"]};
      }
    }

    .acaoButton{
      display: flex;
      justify-content: center;
      gap: 0.5rem;
    }
  }
`


export const ContainerHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
 
  div {
    width: 100%;
  }
  
  @media only screen and (max-width: 425px) {
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    gap: 1rem;
  }
`

export const SearchWraper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  
  @media only screen and (max-width: 425px) {
    justify-content: flex-start;
    align-items: flex-start;
  }

  svg {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    width: 1.70rem;
    height: 1.70rem;
    padding: 5px;
    margin-right: -1px;
    background: ${(props) => props.theme["blue-500"]};
    color: ${(props) => props.theme.white};

    @media only screen and (max-width: 1024px) {
      width: 1.50rem;
      height: 1.50rem;
    }
  }
`

export const InputSearch = styled.input`
  width: 100%;
  max-width: 20rem;
  padding: 0.5% 1%;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  border: 1px solid ${(props) => props.theme["gray-400"]};

  &:focus {
    border: 1px solid ${(props) => props.theme["blue-300"]};

  }
`