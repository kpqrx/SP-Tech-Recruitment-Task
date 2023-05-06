import styled, { css } from "styled-components";

export const StyledContainer = styled.div<{
  $isDisabled: boolean;
}>`
  display: inline-flex;
  flex-flow: column;
  gap: ${({ theme }) => theme.spacing("sm")};
  padding: ${({ theme }) => theme.spacing("md")};
  position: relative;
  ${({ theme }) => theme.typography.base};
  color: ${({ theme }) => theme.color.black};
  background-color: ${({ theme }) => theme.color.gray[200]};

  ${({ $isDisabled }) =>
    $isDisabled &&
    css`
      opacity: 0.5;
    `}
`;

export const StyledInput = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  inset: 0;
  opacity: 0;
`;

export const StyledPrice = styled.span`
  ${({ theme }) => theme.typography.lg};
  color: ${({ theme }) => theme.color.black};
`;

export const StyledOffer = styled.span`
  color: ${({ theme }) => theme.color.gray[500]};
`;
