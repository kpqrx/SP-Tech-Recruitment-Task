import type { PropsWithChildren } from "react"

export interface ConfiguratorViewsBaseProps extends PropsWithChildren {
  stepNumber: number
  label: string
}
