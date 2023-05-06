import type { PropsWithChildren } from "react"

export interface StepLabelProps extends PropsWithChildren {
  number: number
  status?: "upcomming" | "inprogress" | "completed"
}
