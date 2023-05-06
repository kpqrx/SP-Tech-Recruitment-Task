import {
  StyledContainer,
  StyledIndicator,
  StyledStatus,
} from "@/components/atoms/StepLabel/StepLabel.styled"
import type { StepLabelProps } from "@/components/atoms/StepLabel/StepLabel.types"

const statusNames = {
  upcomming: "Następny",
  inprogress: "W trakcie",
  completed: "Wykonano",
}

function StepLabel(props: StepLabelProps) {
  const { children, number, status, ...restProps } = props
  return (
    <StyledContainer {...restProps}>
      <StyledIndicator>Krok {number}</StyledIndicator>
      {children}
      {status && <StyledStatus>{statusNames[status]}</StyledStatus>}
    </StyledContainer>
  )
}

export default StepLabel
