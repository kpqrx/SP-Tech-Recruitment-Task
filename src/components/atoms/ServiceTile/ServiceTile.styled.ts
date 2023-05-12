import styled, { css } from "styled-components"

export const StyledContainer = styled.div<{
  $isChecked: boolean
  $isDisabled: boolean
}>`
  display: inline-flex;
  flex-flow: column;
  gap: ${({ theme }) => theme.spacing("sm")};
  padding: ${({ theme }) => theme.spacing("md")};
  position: relative;
  ${({ theme }) => theme.typography.base};
  color: ${({ theme }) => theme.color.black};
  background-color: ${({ theme }) => theme.color.gray[300]};
  border-radius: ${({ theme }) => theme.radii.sm};
  transition: 0.125s ease;
  transition-property: box-shadow, opacity;

  ${({ $isChecked }) =>
    $isChecked &&
    css`
      box-shadow: 0 0 0 4px ${({ theme }) => theme.color.orange[100]};
    `}

  ${({ $isDisabled }) =>
    $isDisabled &&
    css`
      opacity: 0.35;
    `}

  &:focus-within {
    outline: 2px solid ${({ theme }) => theme.color.orange[300]};
    outline-offset: 6px;
  }
`

export const StyledInput = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  inset: 0;
  opacity: 0;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }
`

export const StyledPrice = styled.span`
  ${({ theme }) => theme.typography.lg};
  color: ${({ theme }) => theme.color.black};
`

export const StyledOffer = styled.span`
  color: ${({ theme }) => theme.color.gray[500]};
`
