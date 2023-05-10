export type PriceType = { [year: number]: number } | number

export type PackageType = {
  services: number[]
  exceptions?: {
    id: number
    price: PriceType
  }[]
  price: PriceType
}

export type ServiceType = {
  id: number
  dependsOn?: number[]
  type: string
  price: PriceType
}

export type OfferType = {
  type: string | string[]
  price: PriceType
}[]
