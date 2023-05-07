import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { PackageType, ServiceType } from "@/types"

export interface ConfiguratorState {
  services: ServiceType[]
  packages: PackageType[]
}

const initialState: ConfiguratorState = {
  services: [],
  packages: [],
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
  },
})

export const { storeServices, storePackages } = configuratorSlice.actions

export default configuratorSlice.reducer
