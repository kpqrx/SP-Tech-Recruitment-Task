import {
  StyledContainer,
  StyledIndicator,
  StyledStatus,
} from "@/components/atoms/StepLabel/StepLabel.styled"
import type { StepLabelProps } from "@/components/atoms/StepLabel/StepLabel.types"
import $t from "~/translations.json"

function StepLabel(props: StepLabelProps) {
  const { children, number, status, ...restProps } = props
  return (
    <StyledContainer {...restProps}>
      <StyledIndicator>
        {$t.step} {number}
      </StyledIndicator>
      {children}
      {status && <StyledStatus>{$t[status]}</StyledStatus>}
    </StyledContainer>
  )
}

export default StepLabel
