export interface SliderProps {
  step?: number
  values?: number[]
  value: number
  minValue?: number
  onChange: (x: number) => void
}
