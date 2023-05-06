import styled from "styled-components"

export const StyledContainer = styled.span`
  ${({ theme }) => theme.typography.xs};
  text-transform: uppercase;
  background-color: ${({ theme }) => theme.color.gray[300]};
  padding: ${({ theme }) => theme.spacing("xxs", "xs")};
`
