import styled from "styled-components";

export const ButtonStyled = styled.button`
  padding: 0.5rem 1rem;
  cursor: pointer;
  border: none;
  border-radius: 0.5rem;
  background: ${(props) => props.theme["blue-300"]};
  color: ${(props) => props.theme.white};
  transition: all 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;


  &:hover{
    background: ${(props) => props.theme["blue-500"]};
  }
`