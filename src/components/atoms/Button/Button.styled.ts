import styled, { css } from "styled-components"

export const StyledContainer = styled.button<{
  $variant: "primary" | "secondary" | "tertiary"
}>`
  ${({ theme }) => theme.typography.base};
  color: ${({ theme }) => theme.color.black};
  white-space: nowrap;
  cursor: pointer;
  user-select: none;

  ${({ $variant }) =>
    $variant === "primary" &&
    css`
      padding: ${({ theme }) => theme.spacing("sm", "lg")};
      background-color: ${({ theme }) => theme.color.orange[300]};
      color: ${({ theme }) => theme.color.white};
      border-radius: ${({ theme }) => theme.radii.sm};

      &:hover {
        background-color: ${({ theme }) => theme.color.orange[200]};
      }

      &:disabled {
        background-color: ${({ theme }) => theme.color.orange[100]};
        cursor: not-allowed;
      }
    `};

  ${({ $variant }) =>
    $variant === "secondary" &&
    css`
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.spacing("sm")};
      padding: ${({ theme }) => theme.spacing("sm", "sm", "sm")} 2px;

      svg {
        width: 100%;
        max-width: 24px;
      }
    `};

  ${({ $variant }) =>
    $variant === "tertiary" &&
    css`
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.spacing("xs")};
      padding: ${({ theme }) => theme.spacing("xxs", "xs")};
      border-radius: ${({ theme }) => theme.radii.xs};
      ${({ theme }) => theme.typography.xs};
      text-transform: uppercase;

      svg {
        max-width: 16px;
        height: auto;
        stroke-width: 0.075rem;
      }

      &:hover {
        background-color: ${({ theme }) => theme.color.gray[300]};
      }
    `};
`
