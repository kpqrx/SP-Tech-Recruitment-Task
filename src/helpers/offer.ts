import { getSum } from "@/helpers/misc"
import type { OfferType, BundleType, ServiceType, PriceType } from "@/types"

const getRangedPrice = (price: PriceType, years: number[]) =>
  years.reduce(
    (prev, year) => ({
      ...prev,
      [year]: typeof price === "number" ? price : price[year],
    }),
    {}
  )

export const getServicesOffer = (
  availableServices: ServiceType[],
  selectedServices: number[],
  years: number[]
): OfferType =>
  availableServices
    .filter(({ id }) => selectedServices.includes(id))
    .map(({ type, price }) => ({
      type,
      price: getRangedPrice(price, years),
    }))

export const getPackagesOffers = (
  availableBundles: BundleType[],
  availableServices: ServiceType[],
  selectedServiceIds: number[],
  years: number[]
): OfferType[] => {
  const possibleBundles = availableBundles.filter(
    ({ services: bundledServiceIds, exceptions = [] }) => {
      const exceptionIds = exceptions.map(({ id }) => id)
      return bundledServiceIds.every(
        (bundledServiceId) =>
          exceptionIds.includes(bundledServiceId) ||
          selectedServiceIds.includes(bundledServiceId)
      )
    }
  )

  const offers = possibleBundles.map((possibleBundle) => {
    const {
      services: bundledServiceIds,
      price: bundlePrice,
      exceptions = [],
    } = possibleBundle

    const selectedServices = availableServices.filter(({ id }) =>
      selectedServiceIds.includes(id)
    )

    const bundledServices = selectedServices.filter(
      ({ id }) =>
        bundledServiceIds.includes(id) &&
        !exceptions.find(({ id: exceptionId }) => exceptionId === id)
    )

    const unbundledServices: OfferType = selectedServices
      .filter(
        ({ id: selectedServiceId }) =>
          !bundledServices.find(
            ({ id: bundledServiceId }) => selectedServiceId === bundledServiceId
          )
      )
      .concat(
        bundledServices.filter(
          ({ id: bundledServiceId }) =>
            !selectedServices.find(
              ({ id: selectedServiceId }) =>
                selectedServiceId === bundledServiceId
            )
        )
      )
      .map((unbundledService) => {
        const exceptionServiceProperties = exceptions.find(
          ({ id }) => unbundledService.id === id
        )
        return {
          ...unbundledService,
          ...(exceptionServiceProperties ?? {}),
        }
      })
      .map(({ type, price }) => ({
        type,
        price: getRangedPrice(price, years),
      }))

    return [
      {
        type: bundledServices.map(({ type }) => type),
        price: getRangedPrice(bundlePrice, years),
      },
      ...unbundledServices,
    ]
  })

  return offers
}

export const getMostAffordableOffer = (offers: OfferType[]) => {
  const rankedOffers = offers.map((offer) => ({
    rank: getSum(offer.map(({ price }) => getSum(Object.values(price)))),
    offer,
  }))

  const [{ offer: mostAffordableOffer }] = rankedOffers.sort(
    (a, b) => a.rank - b.rank
  )

  return mostAffordableOffer
}
