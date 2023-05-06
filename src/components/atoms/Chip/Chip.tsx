import { StyledContainer } from "@/components/atoms/Chip/Chip.styled"
import type { PropsWithChildren } from "react"

function Chip(props: PropsWithChildren) {
  const { children, ...restProps } = props
  return <StyledContainer {...restProps}>{children}</StyledContainer>
}

export default Chip
