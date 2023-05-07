import ServiceTile from "@/components/atoms/ServiceTile"
import StepLabel from "@/components/atoms/StepLabel"
import {
  StyledBaseLegend,
  StyledServicesWrapper,
} from "@/components/molecules/ConfiguratorForms/ConfiguratorForms.styled"
import type { ConfiguratorFormsBaseProps } from "@/components/molecules/ConfiguratorForms/ConfiguratorForms.types"
import type { RootState } from "@/store"
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
    <fieldset {...restProps}>
      <StyledBaseLegend>
        <StepLabel number={stepNumber}>{label}</StepLabel>
      </StyledBaseLegend>
      {children}
    </fieldset>
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

const ConfiguratorForms = {
  Services,
}

export default ConfiguratorForms
