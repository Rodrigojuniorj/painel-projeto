import styled from 'styled-components'

export const LoginContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  div {
    flex: 1;
    display: flex;
    align-items: center;
    flex-direction: column;

    h1 {
      font-size: 2.5rem;
      color: ${(props) => props.theme['green-300']};
    }
  }
  
  @media (max-width: 768px){

    img {
      display: none;
    }
  }
`

export const LoginForm = styled.form`
  margin-top: 4rem;

  display: flex;
  align-items: center;
  flex-direction: column;
  width: 20rem;
  gap: 1rem;

  input {
    width: 100%;
    font-size: 0.875rem;
    background: transparent;
    border: none;
    border-bottom: 1px solid ${(props) => props.theme['gray-500']};
    color: ${(props) => props.theme['gray-800']};
    padding: 0.75rem;

    &:focus {
      border-bottom: 1px solid ${(props) => props.theme['green-300']};
      box-shadow: none;
    }
  }
`
export const SubmitButtonLogin = styled.button`
  cursor: pointer;
  margin-top: 1rem;
  width: 100%;
  padding: 0.5rem;
  border-radius: 5px;
  color: ${(props) => props.theme['gray-100']};
  background: ${(props) => props.theme['green-300']};
  border: none;

  transition: background-color 0.2s;

  &:hover {
    background: ${(props) => props.theme['green-500']};
  }

  &:disabled {
    cursor: not-allowed;
    background: ${(props) => props.theme['green-700']};
  }
`
