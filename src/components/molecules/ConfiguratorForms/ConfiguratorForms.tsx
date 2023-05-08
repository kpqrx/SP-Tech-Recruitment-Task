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
} from "@/components/molecules/ConfiguratorForms/ConfiguratorForms.styled"
import type { ConfiguratorFormsBaseProps } from "@/components/molecules/ConfiguratorForms/ConfiguratorForms.types"
import type { RootState } from "@/store"
import { useState } from "react"
import { useSelector } from "react-redux"

const translations = {
  internet: "INTERNET",
  television: "TELEWIZJA",
  telephone: "TELEFON",
  decoder4K: "DEKODER 4K",
}

function FormBase(props: ConfiguratorFormsBaseProps) {
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

function Services(props: ConfiguratorFormsBaseProps) {
  const services = useSelector(
    (state: RootState) => state.configurator.services
  )

  return (
    <FormBase {...props}>
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
    </FormBase>
  )
}

function ContractPeriod(props: ConfiguratorFormsBaseProps) {
  const contractPeriod = useSelector(
    (state: RootState) => state.configurator.contractPeriod
  )
  const [contractEndYear, setContractEndYear] = useState(contractPeriod[0])

  return (
    <FormBase {...props}>
      <StyledContractPeriodWrapper>
        <StyledContractPeriodTypographyWrapper>
          <StyledContractPeriodTypography>
            <StyledContractPeriodTypography.Title>
              Czas trwania
            </StyledContractPeriodTypography.Title>
            2 lata
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
    </FormBase>
  )
}

const ConfiguratorForms = {
  Services,
  ContractPeriod,
}

export default ConfiguratorForms
