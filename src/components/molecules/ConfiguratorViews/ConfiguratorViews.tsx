import OfferTable from "@/components/atoms/OfferTable/OfferTable"
import ServiceTile from "@/components/atoms/ServiceTile"
import StepLabel from "@/components/atoms/StepLabel"
import ChipListing from "@/components/molecules/ChipListing/ChipListing"
import {
  StyledBaseFieldset,
  StyledBaseLegend,
  StyledServicesWrapper,
  StyledContractPeriodWrapper,
  StyledContractPeriodTypography,
  StyledContractPeriodTypographyWrapper,
  StyledContractPeriodSlider,
  StyledOfferChipListingsWrapper,
  StyledOfferTable,
  StyledOfferWrapper,
} from "@/components/molecules/ConfiguratorViews/ConfiguratorViews.styled"
import type { ConfiguratorViewsBaseProps } from "@/components/molecules/ConfiguratorViews/ConfiguratorViews.types"
import type { RootState } from "@/store"
import {
  updateSelectedPeriod,
  updateSelectedServices,
} from "@/store/slices/configuratorSlice"
import { useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

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

  const selectedServices = useSelector(
    (state: RootState) => state.configurator.selectedServices
  )
  const dispatch = useDispatch()

  const handleServiceChange = useCallback(
    (id: number) => {
      const dependenciesToDisable = services
        .filter(
          ({ dependsOn, id: serviceId }) =>
            dependsOn?.includes(id) && selectedServices.includes(serviceId)
        )
        .map(({ id: serviceId }) => serviceId)

      dispatch(updateSelectedServices(id))
      dependenciesToDisable.forEach((serviceId) =>
        dispatch(updateSelectedServices(serviceId))
      )
    },
    [dispatch, services, selectedServices]
  )

  return (
    <ViewBase {...props}>
      <StyledServicesWrapper>
        {services.map(({ id, type, price, dependsOn }) => (
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
            onChange={() => handleServiceChange(id)}
            checked={selectedServices.includes(id)}
            disabled={
              dependsOn &&
              !selectedServices.some((serviceId) =>
                dependsOn?.includes(serviceId)
              )
            }
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
  const selectedPeriod = useSelector(
    (state: RootState) => state.configurator.selectedPeriod
  )
  const dispatch = useDispatch()
  const [period, setPeriod] = useState(selectedPeriod)

  const handlePeriodChange = useCallback(
    (newPeriod: number) => {
      setPeriod(newPeriod)
      dispatch(updateSelectedPeriod(newPeriod))
    },
    [dispatch, setPeriod]
  )

  return (
    <ViewBase {...props}>
      <StyledContractPeriodWrapper>
        <StyledContractPeriodTypographyWrapper>
          <StyledContractPeriodTypography>
            <StyledContractPeriodTypography.Title>
              Czas trwania
            </StyledContractPeriodTypography.Title>
            {period} {period === 1 ? "rok" : "lata"}
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
            {contractPeriod[period - 1]}
          </StyledContractPeriodTypography>
        </StyledContractPeriodTypographyWrapper>
        <StyledContractPeriodSlider
          values={contractPeriod}
          minValue={1}
          value={period}
          onChange={handlePeriodChange}
        />
      </StyledContractPeriodWrapper>
    </ViewBase>
  )
}

function Offer(props: ConfiguratorViewsBaseProps) {
  const selectedServices = useSelector(
    (state: RootState) => state.configurator.selectedServices
  )
  const services = useSelector(
    (state: RootState) => state.configurator.services
  )
  const selectedPeriod = useSelector(
    (state: RootState) => state.configurator.selectedPeriod
  )
  const packages = useSelector(
    (state: RootState) => state.configurator.packages
  )

  const offerServices = services.filter(({ id }) =>
    selectedServices.includes(id)
  )

  const offerPackages = packages.filter(({ services, optionalServices = [] }) =>
    offerServices.some(({ id }) =>
      [...services, ...optionalServices].includes(id)
    )
  )

  const serviceChipValues = services
    .filter(({ id }) => selectedServices.includes(id))
    .map(({ type }) => translations[type as keyof typeof translations])

  const periodChipValue = `${selectedPeriod} ${
    selectedPeriod === 1 ? "rok" : "lata"
  }`

  return (
    <ViewBase {...props}>
      <StyledOfferWrapper>
        <StyledOfferChipListingsWrapper>
          <ChipListing
            label="Czas trwania umowy:"
            chips={[periodChipValue]}
          />
          <ChipListing
            label="Usługi:"
            chips={serviceChipValues}
          />
        </StyledOfferChipListingsWrapper>
      </StyledOfferWrapper>
    </ViewBase>
  )
}

const ConfiguratorViews = {
  Services,
  ContractPeriod,
  Offer,
}

export default ConfiguratorViews
