import Slider from "@/components/molecules/Slider"
import styled from "styled-components"

export const StyledServicesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing("md")};
`

export const StyledContractPeriodWrapper = styled.div`
  display: flex;
  flex-flow: column;
  gap: ${({ theme }) => theme.spacing("md")};
`

export const StyledContractPeriodTypographyWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing("xl")};
  padding: ${({ theme }) => theme.spacing("lg")} 0;
`

const StyledContractPeriodTypographyBase = styled.div`
  ${({ theme }) => theme.typography.base};
`

const StyledContractTypographyTitle = styled.span`
  display: block;
  color: ${({ theme }) => theme.color.gray[500]};
  ${({ theme }) => theme.typography.xs};
`

export const StyledContractPeriodTypography = Object.assign(
  StyledContractPeriodTypographyBase,
  { Title: StyledContractTypographyTitle }
)

export const StyledContractPeriodSlider = styled(Slider)`
  width: 75%;
`

export const StyledBaseFieldset = styled.fieldset`
  user-select: none;
`

export const StyledBaseLegend = styled.legend`
  margin-bottom: ${({ theme }) => theme.spacing("md")};
`
