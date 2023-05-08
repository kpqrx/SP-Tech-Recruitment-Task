import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { PackageType, ServiceType } from "@/types"

export interface ConfiguratorState {
  services: ServiceType[]
  packages: PackageType[]
  contractPeriod: number[]
  selectedServices: number[]
  selectedPeriod: number
}

const initialState: ConfiguratorState = {
  services: [],
  packages: [],
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
    storePackages: (state, action: PayloadAction<PackageType[]>) => {
      state.packages = action.payload
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
  storePackages,
  storeContractPeriod,
  updateSelectedPeriod,
  updateSelectedServices,
} = configuratorSlice.actions

export default configuratorSlice.reducer
