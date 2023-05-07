import { configureStore } from "@reduxjs/toolkit"
import configuratorReducer from "./slices/configuratorSlice"

export const store = configureStore({
  reducer: {
    configurator: configuratorReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
