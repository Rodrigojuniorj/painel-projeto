import { ReactNode } from "react";
import { ButtonStyled } from "./styles";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type: "button" | "submit" | "reset" | undefined;
  children: ReactNode;
}

export function Button({ children, type, ...rest }:ButtonProps) {
  return (
    <ButtonStyled type={type} {...rest} >{children}</ButtonStyled>
  )
}