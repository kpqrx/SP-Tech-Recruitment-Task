import {
  StyledContainer,
  StyledLabel,
} from "@/components/atoms/Tooltip/Tooltip.styled"
import type { TooltipProps } from "@/components/atoms/Tooltip/Tooltip.types"

function Tooltip(props: TooltipProps) {
  const { children, label, origin = "left", ...restProps } = props
  return (
    <StyledContainer
      $origin={origin}
      {...restProps}
    >
      {label && <StyledLabel>{label}</StyledLabel>}
      {children}
    </StyledContainer>
  )
}

export default Tooltip
