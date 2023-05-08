import {
  StyledContainer,
  StyledButtonsWrapper,
  StyledContextualWrapper,
  StyledViewWrapper,
  StyledStepsWrapper,
} from "@/components/atoms/ViewContainer/ViewContainer.styled"
import type { ViewContainerProps } from "@/components/atoms/ViewContainer/ViewContainer.types"

function ViewContainer(props: ViewContainerProps) {
  const {
    children,
    renderSteps,
    renderContextual,
    renderButtons,
    ...restProps
  } = props
  return (
    <StyledContainer {...restProps}>
      <StyledStepsWrapper>{renderSteps()}</StyledStepsWrapper>
      <StyledContextualWrapper>{renderContextual()}</StyledContextualWrapper>
      <StyledViewWrapper>{children}</StyledViewWrapper>
      <StyledButtonsWrapper>{renderButtons()}</StyledButtonsWrapper>
    </StyledContainer>
  )
}

export default ViewContainer
