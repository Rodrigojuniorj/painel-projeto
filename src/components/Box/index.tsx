import { BoxContainer100, BoxContainer33, BoxContainer50 } from "./styles";

interface BoxProps {
  children: React.ReactNode;
  size: 1 | 2 | 3;
}



export function Box({ children, size }: BoxProps) {
  return (
    size === 1 ? (
      <BoxContainer100 >
        <div >
          {children}
        </div>
      </BoxContainer100>   
    ) : size === 2 ? (
      <BoxContainer50 >
        <div >
          {children}
        </div>
      </BoxContainer50>
    ) : (
      <BoxContainer33 >
        <div >
          {children}
        </div>
      </BoxContainer33>
    )
  )
}