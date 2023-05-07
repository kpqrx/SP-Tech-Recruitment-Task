import type { Preview } from "@storybook/react"
import React from "react"
import { ThemeProvider } from "styled-components"
import theme, { GlobalStyle } from "../src/theme"
import { Provider as StoreProvider } from "react-redux"
import { store } from "../src/store"
import { initialize, mswDecorator } from "msw-storybook-addon"

initialize({ onUnhandledRequest: "bypass" })

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <StoreProvider store={store}>
          <GlobalStyle />
          <Story />
        </StoreProvider>
      </ThemeProvider>
    ),
    mswDecorator,
  ],
}

export default preview
