import { ImgContainer } from "./styles";

interface ImagemProps {
  dados: string;
}

export function Imagem({dados}: ImagemProps) {
  const imagem = `data:image/png;base64,${dados}` 

  return (
    <ImgContainer>
      <img src={imagem}  />
    </ImgContainer>
  )
}