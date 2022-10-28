import styled from "styled-components";

const CicleButton = styled.button`
  cursor: pointer;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
`

export const EditButton = styled(CicleButton)`
  border: 1px solid ${(props) => props.theme["green-700"]};
  transition: all 0.5s ease-in-out;

  &:hover{
    background: ${(props) => props.theme["green-700"]};

    svg {
      color: ${(props) => props.theme["white"]};
    }
  }

  svg {
    color: ${(props) => props.theme["green-700"]};
  }

`

export const DeleteButton = styled(CicleButton)`
  border: 1px solid ${(props) => props.theme["red-800"]};
  transition: all 0.5s ease-in-out;

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

export const PhotographyButton = styled(CicleButton)`
  border: 1px solid ${(props) => props.theme["blue-700"]};
  transition: all 0.5s ease-in-out;

  &:hover{
    background: ${(props) => props.theme["blue-700"]};

    svg{
      color: ${(props) => props.theme["white"]};
    }
  }

  svg{
    color: ${(props) => props.theme["blue-700"]};
  }
`

export const PopularButton = styled(CicleButton)`
  border: 1px solid ${(props) => props.theme["yellow-300"]};
  transition: all 0.5s ease-in-out;

  &:hover{
    background: ${(props) => props.theme["yellow-300"]};

    svg{
      color: ${(props) => props.theme["white"]};
    }
  }

  svg{
    color: ${(props) => props.theme["yellow-300"]};
  }
`

export const VideoButton = styled(CicleButton)`
  border: 1px solid ${(props) => props.theme["purple-300"]};
  transition: all 0.5s ease-in-out;

  &:hover{
    background: ${(props) => props.theme["purple-300"]};

    svg{
      color: ${(props) => props.theme["white"]};
    }
  }

  svg{
    color: ${(props) => props.theme["purple-300"]};
  }
`