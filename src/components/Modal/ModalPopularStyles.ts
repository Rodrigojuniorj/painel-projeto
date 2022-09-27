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


  table {
    margin-top: 20px;
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

      &:last-child {
      }
    }
  }
`
export const DeleteButton = styled.button`
  cursor: pointer;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border: 1px solid ${(props) => props.theme["red-800"]};
  transition: all 0.5s ease-in-out;
  margin-bottom: 1rem;

  &:hover{
    background: ${(props) => props.theme["red-800"]};

    svg{
      color: ${(props) => props.theme["white"]};
    }
  }

  svg{
    color: ${(props) => props.theme["red-800"]};
  }
`

const ButtonStar = styled.button`
  cursor: pointer;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border: 1px solid ${(props) => props.theme["blue-500"]};
  transition: all 0.5s ease-in-out;

  &:hover{
    background: ${(props) => props.theme["blue-500"]};

    svg{
      color: ${(props) => props.theme["white"]};
    }
  }

  svg{
    color: ${(props) => props.theme["blue-500"]};
  }
`

export const StarButton = styled(ButtonStar)`
  background: none;
  
`
export const StarButtonActive = styled(ButtonStar)`
  background: ${(props) => props.theme["blue-500"]};
  
  svg{
    color: ${(props) => props.theme["white"]};
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
    margin-top: 0.5rem;
  }

  input {
    width: 100%;
    padding: 1% 2%;
    border-radius: 4px;
    border: 1px solid ${(props) => props.theme["gray-400"]};

    &:focus {
      border: 1px solid ${(props) => props.theme["blue-300"]};
    }
  }
`

export const InputFile = styled.input`

`