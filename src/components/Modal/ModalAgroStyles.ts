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
  gap: 1rem;

  div {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;

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