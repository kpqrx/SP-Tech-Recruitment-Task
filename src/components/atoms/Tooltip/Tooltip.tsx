import { StyledContainer } from "@/components/atoms/Tooltip/Tooltip.styled"
import type { TooltipProps } from "@/components/atoms/Tooltip/Tooltip.types"

function Tooltip(props: TooltipProps) {
  const { children, origin = "left", ...restProps } = props
  return (
    <StyledContainer
      $origin={origin}
      {...restProps}
    >
      {children}
    </StyledContainer>
  )
}

export default Tooltip
