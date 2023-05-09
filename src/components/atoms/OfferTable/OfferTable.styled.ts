import styled from "styled-components"

export const StyledContainer = styled.div`
  background-color: ${({ theme }) => theme.color.gray[300]};
`

export const StyledWrapper = styled.table`
  width: 100%;
`

export const StyledCell = styled.td`
  padding: ${({ theme }) => theme.spacing("sm")} 0;
  text-align: center;

  &:first-of-type {
    padding-left: ${({ theme }) => theme.spacing("sm")};
    text-align: left;
  }
`

export const StyledHead = styled.thead`
  ${({ theme }) => theme.typography.xs};
  text-transform: uppercase;

  ${StyledCell} {
    padding: ${({ theme }) => theme.spacing("xs")} 0;
  }
`

export const StyledSummaryPrice = styled.span`
  ${({ theme }) => theme.typography.lg};

  margin: 0 ${({ theme }) => theme.spacing("xxs")};
`

export const StyledFoot = styled.tfoot`
  ${StyledCell}:not(:first-of-type) {
    letter-spacing: -0.075ch;
  }
`
