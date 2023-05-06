import type { PropsWithChildren } from "react"

type RenderFunctionPropType = () => JSX.Element | string

export interface FormContainerProps extends PropsWithChildren {
  renderSteps: RenderFunctionPropType
  renderContextual: RenderFunctionPropType
  renderButtons: RenderFunctionPropType
}
