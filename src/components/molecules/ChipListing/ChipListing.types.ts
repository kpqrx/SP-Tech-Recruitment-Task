import type { ReactNode } from "react"

export interface ChipListingProps {
  label: string
  chips: string[]
  renderAfter?: () => ReactNode
}
