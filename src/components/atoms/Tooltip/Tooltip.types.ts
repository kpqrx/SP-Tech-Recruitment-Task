import type { PropsWithChildren } from "react"

export interface TooltipProps extends PropsWithChildren {
  origin?: "left" | "right"
  label?: string
}
