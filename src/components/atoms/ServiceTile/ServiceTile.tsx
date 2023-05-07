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
    defaultChecked = false,
    disabled = false,
    onChange,
    ...restProps
  } = props
  const [isChecked, setIsChecked] = useState(defaultChecked)

  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange && onChange(event)
      setIsChecked((prevState) => !prevState)
    },
    [setIsChecked, onChange]
  )

  return (
    <StyledContainer
      $isDisabled={disabled}
      $isChecked={isChecked}
    >
      <StyledInput
        type="checkbox"
        checked={isChecked}
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
