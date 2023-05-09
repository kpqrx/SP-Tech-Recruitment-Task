import {
  StyledContainer,
  StyledWrapper,
  StyledHead,
  StyledCell,
  StyledSummaryPrice,
  StyledFoot,
} from "@/components/atoms/OfferTable/OfferTable.styled"
import type { OfferTableProps } from "@/components/atoms/OfferTable/OfferTable.types"

function OfferTable(props: OfferTableProps) {
  const { periods, packages, monthlyFees, ...restProps } = props
  console.log(
    packages.length,
    periods.length,
    monthlyFees.length,
    packages.some(({ price }) => {
      console.log({ pri: price.length, per: periods.length })
      return price.length !== periods.length
    })
  )
  if (
    packages.some(({ price }) => price.length !== periods.length) ||
    monthlyFees.length !== periods.length
  ) {
    throw Error(
      "The props structure is invalid, number of periods doesn't match with packages / monthly fees."
    )
  }

  return (
    <StyledContainer>
      <StyledWrapper {...restProps}>
        <StyledHead>
          <tr>
            <StyledCell>&nbsp;</StyledCell>
            {periods.map((period) => (
              <StyledCell>{period}</StyledCell>
            ))}
          </tr>
        </StyledHead>
        <tbody>
          {packages.map(({ label, price }, index) => (
            <tr key={index}>
              <StyledCell>{label}</StyledCell>
              {price.map((price) => (
                <StyledCell>od {price} zł / msc</StyledCell>
              ))}
            </tr>
          ))}
        </tbody>
        <StyledFoot>
          <tr>
            <StyledCell>Wysokość abonamentu miesięcznego</StyledCell>
            {monthlyFees.map((fee) => (
              <StyledCell>
                <StyledSummaryPrice>{fee} zł</StyledSummaryPrice> / msc
              </StyledCell>
            ))}
          </tr>
        </StyledFoot>
      </StyledWrapper>
    </StyledContainer>
  )
}

export default OfferTable
