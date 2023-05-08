import Button from "@/components/atoms/Button"
import FormContainer from "@/components/atoms/FormContainer"
import ConfiguratorForms from "@/components/molecules/ConfiguratorForms/ConfiguratorForms"
import { StyledStepLabel } from "@/components/organisms/OfferConfigurator/OfferConfigurator.styled"
import {
  storePackages,
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
    form: ConfiguratorForms.Services,
  },
  {
    fullLabel: "Wybierz czas trwania umowy",
    shortLabel: "Wybór czasu trwania umowy",
    form: ConfiguratorForms.ContractPeriod,
  },
  {
    fullLabel: "Plan abonamentowy przygotowany dla Ciebie",
    shortLabel: "Przedstawienie planu abonamentowego",
    form: ConfiguratorForms.Services,
  },
]

function OfferConfigurator(props: HTMLAttributes<HTMLDivElement>) {
  const [currentStep, setCurrentStep] = useState(0)
  const dispatch = useDispatch()
  const { services, packages } = useSelector(
    (state: RootState) => state.configurator
  )

  useEffect(() => {
    if (services.length > 0 && packages.length > 0) {
      return
    }

    const handleFetch = async () => {
      const servicesResponse = await fetch("/api/services")
      const packagesResponse = await fetch("/api/packages")
      const contractPeriodResponse = await fetch("/api/contract-period")
      const [services, packages, contractPeriod] = await Promise.all([
        await servicesResponse.json(),
        await packagesResponse.json(),
        await contractPeriodResponse.json(),
      ])

      dispatch(storeServices(services))
      dispatch(storePackages(packages))
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
    <FormContainer
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
        ({ form: Form, fullLabel }, stepIndex) =>
          stepIndex === currentStep && (
            <Form
              key={stepIndex}
              label={fullLabel}
              stepNumber={stepIndex + 1}
            />
          )
      )}
    </FormContainer>
  )
}

export default OfferConfigurator
