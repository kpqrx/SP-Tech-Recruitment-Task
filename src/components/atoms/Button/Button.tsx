import { StyledContainer } from "@/components/atoms/Button/Button.styled"
import type { ButtonProps } from "@/components/atoms/Button/Button.types"

const ChevronIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 18L9 12L15 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

function Button(props: ButtonProps) {
  const { children, variant = "primary", ...restProps } = props
  return (
    <StyledContainer
      $variant={variant}
      {...restProps}
    >
      {variant === "secondary" && <ChevronIcon />}
      {children}
    </StyledContainer>
  )
}

export default Button
