import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { PackageType, ServiceType } from "@/types"

export interface ConfiguratorState {
  services: ServiceType[]
  packages: PackageType[]
  contractPeriod: number[]
}

const initialState: ConfiguratorState = {
  services: [],
  packages: [],
  contractPeriod: [],
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
  },
})

export const { storeServices, storePackages, storeContractPeriod } =
  configuratorSlice.actions

export default configuratorSlice.reducer
