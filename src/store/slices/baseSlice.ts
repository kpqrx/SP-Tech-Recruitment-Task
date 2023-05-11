import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface ConfiguratorState {
  currentStep: number
  nextStep: number | null
}

const initialState: ConfiguratorState = {
  currentStep: 0,
  nextStep: null,
}

export const configuratorSlice = createSlice({
  name: "configurator",
  initialState,
  reducers: {
    setCurrentStep: (
      state,
      action: PayloadAction<{ next?: number | null; current: number }>
    ) => {
      const { current, next = null } = action.payload

      state.nextStep = next
      state.currentStep = current
    },
  },
})

export const { setCurrentStep } = configuratorSlice.actions

export default configuratorSlice.reducer
