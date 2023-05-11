import OfferTable from "@/components/atoms/OfferTable"
import ServiceTile from "@/components/atoms/ServiceTile"
import StepLabel from "@/components/atoms/StepLabel"
import ChipListing from "@/components/molecules/ChipListing"
import {
  StyledBaseFieldset,
  StyledBaseLegend,
  StyledServicesWrapper,
  StyledContractPeriodWrapper,
  StyledContractPeriodTypography,
  StyledContractPeriodTypographyWrapper,
  StyledContractPeriodSlider,
  StyledOfferChipListingsWrapper,
  StyledOfferWrapper,
} from "@/components/molecules/ConfiguratorViews/ConfiguratorViews.styled"
import { getOffer } from "@/helpers"
import type { ConfiguratorViewsBaseProps } from "@/components/molecules/ConfiguratorViews/ConfiguratorViews.types"
import type { RootState } from "@/store"
import {
  updateSelectedPeriod,
  updateSelectedServices,
} from "@/store/slices/configuratorSlice"
import { useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import $t from "~/translations.json"
import Button from "@/components/atoms/Button/Button"
import { Edit } from "react-feather"
import { setCurrentStep } from "@/store/slices/baseSlice"

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
  const { services, selectedServices } = useSelector(
    (state: RootState) => state.configurator
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
            label={$t[type as keyof typeof $t]}
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
  const { contractPeriod, selectedPeriod } = useSelector(
    (state: RootState) => state.configurator
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
              {$t.contractTimespan}
            </StyledContractPeriodTypography.Title>
            {period} {period === 1 ? $t.year : $t.years}
          </StyledContractPeriodTypography>

          <StyledContractPeriodTypography>
            <StyledContractPeriodTypography.Title>
              {$t.contractStartYear}
            </StyledContractPeriodTypography.Title>
            {contractPeriod[0]}
          </StyledContractPeriodTypography>

          <StyledContractPeriodTypography>
            <StyledContractPeriodTypography.Title>
              {$t.contractEndYear}
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
  const {
    selectedServices,
    services,
    contractPeriod,
    selectedPeriod,
    bundles,
  } = useSelector((state: RootState) => state.configurator)
  const dispatch = useDispatch()

  const serviceChipValues = services
    .filter(({ id }) => selectedServices.includes(id))
    .map(({ type }) => $t[type as keyof typeof $t])

  const periodChipValue = `${selectedPeriod} ${
    selectedPeriod === 1 ? $t.year : $t.years
  }`

  const years = contractPeriod.slice(0, selectedPeriod)

  const offer = getOffer(bundles, services, selectedServices, years)

  console.log({ offer })

  return (
    <ViewBase {...props}>
      <StyledOfferWrapper>
        <StyledOfferChipListingsWrapper>
          <ChipListing
            label={$t.contractTimespan}
            chips={[periodChipValue]}
            renderAfter={() => (
              <Button
                variant="tertiary"
                onClick={() =>
                  dispatch(setCurrentStep({ current: 1, next: 2 }))
                }
              >
                <Edit /> {$t.edit}
              </Button>
            )}
          />
          <ChipListing
            label={$t.services}
            chips={serviceChipValues}
            renderAfter={() => (
              <Button
                variant="tertiary"
                onClick={() =>
                  dispatch(setCurrentStep({ current: 0, next: 2 }))
                }
              >
                <Edit /> {$t.edit}
              </Button>
            )}
          />
        </StyledOfferChipListingsWrapper>
        <OfferTable
          years={years}
          offer={offer}
        />
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
