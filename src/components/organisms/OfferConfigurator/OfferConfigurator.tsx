import Button from "@/components/atoms/Button"
import ViewContainer from "@/components/atoms/ViewContainer"
import ConfiguratorViews from "@/components/molecules/ConfiguratorViews/ConfiguratorViews"
import { StyledStepLabel } from "@/components/organisms/OfferConfigurator/OfferConfigurator.styled"
import {
  storeBundles,
  storeServices,
  storeContractPeriod,
} from "@/store/slices/configuratorSlice"
import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/store"
import type { HTMLAttributes } from "react"
import type { StepLabelStatusType } from "@/components/atoms/StepLabel/StepLabel.types"

const configuratorViews = [
  {
    fullLabel: "Wybierz interesujące Cię usługi",
    shortLabel: "Wybór usług",
    form: ConfiguratorViews.Services,
  },
  {
    fullLabel: "Wybierz czas trwania umowy",
    shortLabel: "Wybór czasu trwania umowy",
    form: ConfiguratorViews.ContractPeriod,
  },
  {
    fullLabel: "Plan abonamentowy przygotowany dla Ciebie",
    shortLabel: "Przedstawienie planu abonamentowego",
    form: ConfiguratorViews.Offer,
  },
]

function OfferConfigurator(props: HTMLAttributes<HTMLDivElement>) {
  const [currentStep, setCurrentStep] = useState(0)
  const dispatch = useDispatch()
  const { services, bundles } = useSelector(
    (state: RootState) => state.configurator
  )

  useEffect(() => {
    if (services.length > 0 && bundles.length > 0) {
      return
    }

    const handleFetch = async () => {
      const servicesResponse = await fetch("/api/services")
      const bundlesResponse = await fetch("/api/bundles")
      const contractPeriodResponse = await fetch("/api/contract-period")
      const [services, bundles, contractPeriod] = await Promise.all([
        await servicesResponse.json(),
        await bundlesResponse.json(),
        await contractPeriodResponse.json(),
      ])

      dispatch(storeServices(services))
      dispatch(storeBundles(bundles))
      dispatch(storeContractPeriod(contractPeriod))
    }

    handleFetch()
  })

  const steps = configuratorViews.map(({ shortLabel }, stepIndex) => ({
    label: shortLabel,
    number: stepIndex + 1,
    status:
      stepIndex === currentStep
        ? "inprogress"
        : stepIndex < currentStep
        ? "completed"
        : ("upcomming" as StepLabelStatusType),
  }))

  const handleCurrentStepChange = useCallback(
    (mode: "next" | "prev") => {
      const shouldSkipChange =
        (mode === "next" && currentStep === steps.length - 1) ||
        (mode === "prev" && currentStep === 0)

      if (shouldSkipChange) {
        return
      }

      setCurrentStep((prevStep) => prevStep + (mode === "next" ? 1 : -1))
    },
    [currentStep, setCurrentStep, steps]
  )

  return (
    <ViewContainer
      renderSteps={() =>
        steps.map(({ label, number, status }, index) => (
          <StyledStepLabel
            key={index}
            number={number}
            status={status}
          >
            {label}
          </StyledStepLabel>
        ))
      }
      renderButtons={() => (
        <Button onClick={() => handleCurrentStepChange("next")}>
          Kontynuuj
        </Button>
      )}
      renderContextual={() =>
        currentStep !== 0 && (
          <Button
            variant="secondary"
            onClick={() => handleCurrentStepChange("prev")}
          >
            Poprzedni krok
          </Button>
        )
      }
      {...props}
    >
      {configuratorViews.map(
        ({ form: View, fullLabel }, stepIndex) =>
          stepIndex === currentStep && (
            <View
              key={stepIndex}
              label={fullLabel}
              stepNumber={stepIndex + 1}
            />
          )
      )}
    </ViewContainer>
  )
}

export default OfferConfigurator
