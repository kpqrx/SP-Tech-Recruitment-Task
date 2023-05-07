import styled from "styled-components"

export const StyledServicesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing("md")};
`

export const StyledBaseLegend = styled.legend`
  margin-bottom: ${({ theme }) => theme.spacing("md")};
`
