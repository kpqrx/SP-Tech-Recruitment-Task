import ServiceTile from "@/components/atoms/ServiceTile"
import StepLabel from "@/components/atoms/StepLabel"
import {
  StyledBaseFieldset,
  StyledBaseLegend,
  StyledServicesWrapper,
  StyledContractPeriodWrapper,
  StyledContractPeriodTypography,
  StyledContractPeriodTypographyWrapper,
  StyledContractPeriodSlider,
} from "@/components/molecules/ConfiguratorViews/ConfiguratorViews.styled"
import type { ConfiguratorViewsBaseProps } from "@/components/molecules/ConfiguratorViews/ConfiguratorViews.types"
import type { RootState } from "@/store"
import { useState } from "react"
import { useSelector } from "react-redux"

const translations = {
  internet: "INTERNET",
  television: "TELEWIZJA",
  telephone: "TELEFON",
  decoder4K: "DEKODER 4K",
}

function ViewBase(props: ConfiguratorViewsBaseProps) {
  const { stepNumber, label, children, ...restProps } = props
  return (
    <StyledBaseFieldset {...restProps}>
      <StyledBaseLegend>
        <StepLabel number={stepNumber}>{label}</StepLabel>
      </StyledBaseLegend>
      {children}
    </StyledBaseFieldset>
  )
}

function Services(props: ConfiguratorViewsBaseProps) {
  const services = useSelector(
    (state: RootState) => state.configurator.services
  )

  return (
    <ViewBase {...props}>
      <StyledServicesWrapper>
        {services.map(({ id, type, price }) => (
          <ServiceTile
            key={id}
            label={translations[type as keyof typeof translations]}
            price={
              typeof price === "number"
                ? price
                : Math.min(...Object.values(price))
            }
            name="service"
            id={`service-${type}-${id}`}
          />
        ))}
      </StyledServicesWrapper>
    </ViewBase>
  )
}

function ContractPeriod(props: ConfiguratorViewsBaseProps) {
  const contractPeriod = useSelector(
    (state: RootState) => state.configurator.contractPeriod
  )
  const [contractEndYear, setContractEndYear] = useState(contractPeriod[0])

  return (
    <ViewBase {...props}>
      <StyledContractPeriodWrapper>
        <StyledContractPeriodTypographyWrapper>
          <StyledContractPeriodTypography>
            <StyledContractPeriodTypography.Title>
              Czas trwania
            </StyledContractPeriodTypography.Title>
            {contractEndYear - contractPeriod[0] + 1}{" "}
            {contractEndYear - contractPeriod[0] === 0 ? "rok" : "lata"}
          </StyledContractPeriodTypography>
          <StyledContractPeriodTypography>
            <StyledContractPeriodTypography.Title>
              Początek okresu trwania umowy
            </StyledContractPeriodTypography.Title>
            {contractPeriod[0]}
          </StyledContractPeriodTypography>
          <StyledContractPeriodTypography>
            <StyledContractPeriodTypography.Title>
              Koniec okresu trwania umowy
            </StyledContractPeriodTypography.Title>
            {contractEndYear}
          </StyledContractPeriodTypography>
        </StyledContractPeriodTypographyWrapper>
        <StyledContractPeriodSlider
          steps={contractPeriod}
          value={contractEndYear}
          onChange={setContractEndYear}
        />
      </StyledContractPeriodWrapper>
    </ViewBase>
  )
}

const ConfiguratorViews = {
  Services,
  ContractPeriod,
}

export default ConfiguratorViews
