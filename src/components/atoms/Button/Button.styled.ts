import styled, { css } from "styled-components";

export const StyledContainer = styled.button<{
  $variant: "primary" | "secondary";
}>`
  ${({ theme }) => theme.typography.base};
  color: ${({ theme }) => theme.color.black};

  ${({ $variant }) =>
    $variant === "primary" &&
    css`
      padding: ${({ theme }) => theme.spacing("sm", "lg")};
      background-color: ${({ theme }) => theme.color.gray[400]};
    `};

  ${({ $variant }) =>
    $variant === "secondary" &&
    css`
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.spacing("sm")};
      padding: ${({ theme }) => theme.spacing("sm", "md")};
    `};
`;
