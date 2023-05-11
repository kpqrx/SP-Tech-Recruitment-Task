import { configureStore } from "@reduxjs/toolkit"
import configuratorReducer from "./slices/configuratorSlice"
import baseReducer from "./slices/baseSlice"

export const store = configureStore({
  reducer: {
    configurator: configuratorReducer,
    base: baseReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
