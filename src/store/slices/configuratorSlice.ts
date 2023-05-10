import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { BundleType, ServiceType } from "@/types"

export interface ConfiguratorState {
  services: ServiceType[]
  bundles: BundleType[]
  contractPeriod: number[]
  selectedServices: number[]
  selectedPeriod: number
}

const initialState: ConfiguratorState = {
  services: [],
  bundles: [],
  contractPeriod: [],
  selectedServices: [],
  selectedPeriod: 1,
}

export const configuratorSlice = createSlice({
  name: "configurator",
  initialState,
  reducers: {
    storeServices: (state, action: PayloadAction<ServiceType[]>) => {
      state.services = action.payload
    },
    storeBundles: (state, action: PayloadAction<BundleType[]>) => {
      state.bundles = action.payload
    },
    storeContractPeriod: (state, action: PayloadAction<number[]>) => {
      state.contractPeriod = action.payload
    },
    updateSelectedServices: (state, action: PayloadAction<number>) => {
      const isAleadyStored =
        state.selectedServices.findIndex(
          (serviceId) => serviceId === action.payload
        ) !== -1
      state.selectedServices = isAleadyStored
        ? state.selectedServices.filter(
            (serviceId) => serviceId !== action.payload
          )
        : [...state.selectedServices, action.payload]
    },
    updateSelectedPeriod: (state, action: PayloadAction<number>) => {
      state.selectedPeriod = action.payload
    },
  },
})

export const {
  storeServices,
  storeBundles,
  storeContractPeriod,
  updateSelectedPeriod,
  updateSelectedServices,
} = configuratorSlice.actions

export default configuratorSlice.reducer
