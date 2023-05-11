import styled from "styled-components"

export const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing("lg")};
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
