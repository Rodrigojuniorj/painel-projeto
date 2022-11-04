import styled from "styled-components";

export const ModalInputContent = styled.div`
  h3 {
    display: flex;
    justify-content: center;
    font-weight: 800;
    margin-bottom: 2rem;
  }

  & > button {
    background: transparent;
    position: absolute;
    top: 0;
    right: 0;
    margin: 0.5rem;
    border: none;
    cursor: pointer;
  }

  p {
    text-align: center;
    font-weight: bold;
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
`

export const WraperButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`

const Button = styled.button`
  width: 20%;
  padding: 0.6rem 0;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  color: ${(props) => props.theme["white"]};

  transition: filter 0.2s;
  
  &:hover {
    filter: brightness(0.9);
  }
`

export const ButtonDelete = styled(Button)`
  background: ${(props) => props.theme["red-500"]};
  
`

export const ButtonCancel = styled(Button)`
  background: ${(props) => props.theme["green-500"]};
`