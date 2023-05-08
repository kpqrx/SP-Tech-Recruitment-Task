import {
  StyledContainer,
  StyledPrice,
  StyledInput,
  StyledOffer,
} from "@/components/atoms/ServiceTile/ServiceTile.styled"
import type { ServiceTileProps } from "@/components/atoms/ServiceTile/ServiceTile.types"
import type { ChangeEvent } from "react"
import { useCallback, useState } from "react"

function ServiceTile(props: ServiceTileProps) {
  const {
    label,
    price,
    checked = false,
    disabled = false,
    onChange,
    ...restProps
  } = props

  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange && onChange(event)
    },
    [onChange]
  )

  return (
    <StyledContainer
      $isDisabled={disabled}
      $isChecked={checked}
    >
      <StyledInput
        type="checkbox"
        checked={checked}
        onChange={handleOnChange}
        disabled={disabled}
        {...restProps}
      />
      <span>{label}</span>
      <StyledOffer>
        od <StyledPrice>{price} zł</StyledPrice> / msc
      </StyledOffer>
    </StyledContainer>
  )
}

export default ServiceTile
