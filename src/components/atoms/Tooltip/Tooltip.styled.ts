import styled, { css } from "styled-components"

export const StyledContainer = styled.div<{
  $origin: "left" | "right"
}>`
  display: inline-block;
  position: relative;
  padding: ${({ theme }) => theme.spacing("xs", "md")};
  background-color: ${({ theme }) => theme.color.gray[300]};
  color: ${({ theme }) => theme.color.black};
  line-height: ${({ theme }) => theme.lineHeight.md};
  margin-top: ${({ theme }) => theme.spacing("sm")};
  user-select: none;

  &::before {
    content: "";
    position: absolute;
    top: -${({ theme }) => theme.spacing("sm")};
    width: ${({ theme }) => theme.spacing("sm")};
    height: ${({ theme }) => theme.spacing("sm")};
    background-color: inherit;
    clip-path: polygon(0 0, 100% 100%, 0 100%);

    ${({ $origin }) =>
      $origin === "left" &&
      css`
        left: 0;
      `};

    ${({ $origin }) =>
      $origin === "right" &&
      css`
        right: 0;
        transform: rotate(-90deg);
      `};
  }
`

export const StyledLabel = styled.span`
  display: block;
  color: ${({ theme }) => theme.color.gray[500]};
  margin-bottom: ${({ theme }) => theme.spacing("xxs")};
  ${({ theme }) => theme.typography.xs};
`
