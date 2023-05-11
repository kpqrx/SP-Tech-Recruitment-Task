import {
  StyledContainer,
  StyledWrapper,
  StyledHead,
  StyledCell,
  StyledSummaryPrice,
  StyledFoot,
} from "@/components/atoms/OfferTable/OfferTable.styled"
import type { OfferTableProps } from "@/components/atoms/OfferTable/OfferTable.types"
import { sumColumns } from "@/helpers"
import $t from "~/translations.json"

function OfferTable(props: OfferTableProps) {
  const { years, offer, ...restProps } = props

  if (
    offer.some(({ price }) => Object.entries(price).length !== years.length)
  ) {
    throw Error(
      "The props structure is invalid, number of years doesn't match with packages / monthly fees."
    )
  }

  const transformedOffer = offer.map(({ type, price }) => ({
    label: [type]
      .flat()
      .map((phrase) => $t[phrase as keyof typeof $t])
      .join(" + "),
    price: Object.values(price),
  }))

  const monthlyFees = sumColumns(transformedOffer.map(({ price }) => price))

  return (
    <StyledContainer>
      <StyledWrapper {...restProps}>
        <StyledHead>
          <tr>
            <StyledCell>&nbsp;</StyledCell>
            {years.map((year, index) => (
              <StyledCell key={index}>{year}</StyledCell>
            ))}
          </tr>
        </StyledHead>
        <tbody>
          {transformedOffer.map(({ label, price }, index) => (
            <tr key={index}>
              <StyledCell>{label}</StyledCell>
              {price.map((price, index) => (
                <StyledCell key={index}>
                  {price} {$t.currency} / {$t.monthAbbr}
                </StyledCell>
              ))}
            </tr>
          ))}
        </tbody>
        <StyledFoot>
          <tr>
            <StyledCell>{$t.monthlyFee}</StyledCell>
            {monthlyFees.map((fee, index) => (
              <StyledCell key={index}>
                <StyledSummaryPrice>
                  {fee} {$t.currency}
                </StyledSummaryPrice>{" "}
                / {$t.monthAbbr}
              </StyledCell>
            ))}
          </tr>
        </StyledFoot>
      </StyledWrapper>
    </StyledContainer>
  )
}

export default OfferTable
