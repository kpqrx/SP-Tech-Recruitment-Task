import type { PropsWithChildren } from "react"

export interface ButtonProps extends PropsWithChildren {
  variant?: "primary" | "secondary"
  onClick: () => void
}
