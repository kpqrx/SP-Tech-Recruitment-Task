import type { PropsWithChildren, ReactNode } from "react"

type RenderFunctionPropType = (args?: unknown) => ReactNode

export interface ViewContainerProps extends PropsWithChildren {
  renderSteps: RenderFunctionPropType
  renderContextual: RenderFunctionPropType
  renderButtons: RenderFunctionPropType
}
