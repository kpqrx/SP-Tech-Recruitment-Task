import type { PropsWithChildren } from "react"

export type StepLabelStatusType = "upcomming" | "inprogress" | "completed"
export interface StepLabelProps extends PropsWithChildren {
  number: number
  status?: StepLabelStatusType
}
