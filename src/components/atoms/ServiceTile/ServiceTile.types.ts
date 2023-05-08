import type { InputHTMLAttributes } from "react"

export interface ServiceTileProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  price: number
}
