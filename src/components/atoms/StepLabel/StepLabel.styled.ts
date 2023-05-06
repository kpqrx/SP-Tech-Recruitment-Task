import styled from "styled-components"

export const StyledContainer = styled.div`
  ${({ theme }) => theme.typography.base};
  color: ${({ theme }) => theme.color.black};
  gap: ${({ theme }) => theme.spacing("xs")};
  display: flex;
  flex-flow: column;
`

export const StyledIndicator = styled.span`
  ${({ theme }) => theme.typography.xs};
  color: ${({ theme }) => theme.color.gray[500]};
  text-transform: uppercase;
`

export const StyledStatus = styled.span`
  ${({ theme }) => theme.typography.sm};
  color: ${({ theme }) => theme.color.gray[500]};
`
