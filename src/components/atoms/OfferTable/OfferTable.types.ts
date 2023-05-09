export interface OfferTableProps {
  periods: number[]
  monthlyFees: number[]
  packages: {
    label: string
    price: number[]
  }[]
}
