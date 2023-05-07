import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"

import App from "./App.tsx"
import { api } from "./mocks"
import { store } from "./store"
import { ThemeProvider } from "styled-components"
import theme, { GlobalStyle } from "./theme"

api.start()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ThemeProvider>
  </Provider>
)
