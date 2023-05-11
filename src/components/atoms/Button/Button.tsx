import { StyledContainer } from "@/components/atoms/Button/Button.styled"
import type { ButtonProps } from "@/components/atoms/Button/Button.types"

function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    disabled = false,
    ...restProps
  } = props
  return (
    <StyledContainer
      $variant={variant}
      disabled={disabled}
      {...restProps}
    >
      {children}
    </StyledContainer>
  )
}

export default Button
