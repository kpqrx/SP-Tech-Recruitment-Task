import type { OfferType, PackageType, ServiceType, PriceType } from "@/types"

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
  availablePackages: PackageType[],
  availableServices: ServiceType[],
  selectedServiceIds: number[],
  years: number[]
): OfferType[] => {
  const possiblePackages = availablePackages.filter(
    ({ services: packagedServices, exceptions = [] }) => {
      const exceptionIds = exceptions.map(({ id }) => id)
      const servicesWithoutExceptions = packagedServices.filter(
        (serviceId) =>
          selectedServiceIds.includes(serviceId) &&
          exceptionIds.includes(serviceId)
      )

      return servicesWithoutExceptions.every((packagedService) =>
        selectedServiceIds.includes(packagedService)
      )
    }
  )

  const offers = possiblePackages.map((possiblePackage) => {
    const {
      services: bundledServiceIds,
      price: packagePrice,
      exceptions = [],
    } = possiblePackage

    const selectedServices = availableServices.filter(({ id }) =>
      selectedServiceIds.includes(id)
    )
    const bundledServices = availableServices
      .filter(({ id }) => bundledServiceIds.includes(id))
      .map(({ id }) => {
        const bundledService = selectedServices.find(
          ({ id: selectedServiceId }) => selectedServiceId === id
        )

        const exception = exceptions.find(
          ({ id: exceptedId }) => id === exceptedId
        )
        if (!exception) {
          return bundledService
        }

        const exceptionService = selectedServices.find(
          ({ id: selectedServiceId }) => selectedServiceId === exception.id
        )

        return exceptionService
      })
    console.log(bundledServices)
    const unbundledServices: OfferType = selectedServices
      .filter(({ id }) => !bundledServiceIds.includes(id))
      .map(({ id, type, price: basePrice }) => {
        const price =
          exceptions.find(({ id: exceptedId }) => id === exceptedId)?.price ||
          basePrice

        return {
          type,
          price: getRangedPrice(price, years),
        }
      })

    return [
      {
        type: bundledServices.map(({ type }) => type),
        price: getRangedPrice(packagePrice, years),
      },
      ...unbundledServices,
    ]
  })

  return offers
}

const getSum = (values: number[]) =>
  values.reduce((sum, value) => sum + value, 0)

export const getMostAffordableOffer = (offers: OfferType[]) => {
  const rankedOffers = offers.map((offer) => ({
    rank: getSum(offer.map(({ price }) => getSum(Object.values(price)))),
    offer,
  }))

  const { offer: mostAffordableOffer } =
    rankedOffers.find(
      ({ rank }) => rank === Math.min(...rankedOffers.map(({ rank }) => rank))
    ) || rankedOffers[0]

  return mostAffordableOffer
}
