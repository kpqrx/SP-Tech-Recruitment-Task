import {
  StyledContainer,
  StyledButtonsWrapper,
  StyledContextualWrapper,
  StyledFormWrapper,
  StyledStepsWrapper,
} from "@/components/atoms/FormContainer/FormContainer.styled"
import type { FormContainerProps } from "@/components/atoms/FormContainer/FormContainer.types"

function FormContainer(props: FormContainerProps) {
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
      <StyledFormWrapper>{children}</StyledFormWrapper>
      <StyledButtonsWrapper>{renderButtons()}</StyledButtonsWrapper>
    </StyledContainer>
  )
}

export default FormContainer
