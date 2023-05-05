import { createSlice } from "@reduxjs/toolkit";
import type { PackageType, ServiceType } from "@/types";

export interface ConfiguratorState {
  services: ServiceType[];
  packages: PackageType[];
}

const initialState: ConfiguratorState = {
  services: [],
  packages: [],
};

export const configuratorSlice = createSlice({
  name: "configurator",
  initialState,
  reducers: {},
});

export default configuratorSlice.reducer;
