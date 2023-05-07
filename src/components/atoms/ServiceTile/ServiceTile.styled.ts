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

  ${({ $isChecked }) =>
    $isChecked &&
    css`
      box-shadow: 0 0 8px 4px hsl(0, 0%, 0%, 20%);
    `}

  ${({ $isDisabled }) =>
    $isDisabled &&
    css`
      opacity: 0.5;
    `}
`

export const StyledInput = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  inset: 0;
  opacity: 0;
  cursor: pointer;
`

export const StyledPrice = styled.span`
  ${({ theme }) => theme.typography.lg};
  color: ${({ theme }) => theme.color.black};
`

export const StyledOffer = styled.span`
  color: ${({ theme }) => theme.color.gray[500]};
`
