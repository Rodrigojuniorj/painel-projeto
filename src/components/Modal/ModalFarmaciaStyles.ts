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
`

export const FormContentModal = styled.form`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 2rem;

  div {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
  }

  label {
    font-weight: 800;
  }

  textarea {
    margin-bottom: 1rem;
    width: 100%;
    padding: 2% 2%;
    border-radius: 4px;
    border: 1px solid ${(props) => props.theme["gray-400"]};
    resize: vertical;
    &:focus {
      border: 1px solid ${(props) => props.theme["blue-300"]};
    }

    &:last-child{
      margin-bottom: 0;
    }
  }
`

const ButtonCicle = styled.button`
  width: 30px;
  height: 30px; 
  border-radius: 50%;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.white};
`

export const ButtonAddCicle = styled(ButtonCicle)`
  background: ${(props) => props.theme["green-500"]};
`

export const ButtonDeleteCicle = styled(ButtonCicle)`
  background: ${(props) => props.theme["red-500"]};
`

export const ButtonWraper = styled.div`
  display: flex;
  flex-direction: row !important;
  justify-content: space-between;
  align-items: center;

  label {
    display: block;
  }

  div {
    width: 50%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
`