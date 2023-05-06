import styled from "styled-components"

export const StyledContainer = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${({ theme }) => theme.spacing("md")};
`

export const StyledLabel = styled.span`
  ${({ theme }) => theme.typography.base};
  white-space: nowrap;
`

export const StyledChipsList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing("sm")};
`
