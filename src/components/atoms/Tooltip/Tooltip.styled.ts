import styled, { css } from "styled-components";

export const StyledContainer = styled.div<{
  $origin: "left" | "right";
}>`
  display: inline-block;
  position: relative;
  padding: ${({ theme }) => theme.spacing("xs", "md")};
  background-color: ${({ theme }) => theme.color.gray[100]};
  color: ${({ theme }) => theme.color.black};
  line-height: ${({ theme }) => theme.lineHeight.md};
  margin-top: ${({ theme }) => theme.spacing("sm")};

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
`;
