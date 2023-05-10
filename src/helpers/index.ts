import type { BundleType, ServiceType } from "@/types"
import {
  getServicesOffer,
  getPackagesOffers,
  getMostAffordableOffer,
} from "./offer"
export * from "./misc"

export const getOffer = (
  availableBundles: BundleType[],
  availableServices: ServiceType[],
  selectedServices: number[],
  years: number[]
) => {
  const offers = [
    getServicesOffer(availableServices, selectedServices, years),
    ...getPackagesOffers(
      availableBundles,
      availableServices,
      selectedServices,
      years
    ),
  ]

  return getMostAffordableOffer(offers)
}
