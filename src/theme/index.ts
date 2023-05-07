import { createGlobalStyle } from "styled-components"
import designTokens from "../../design-tokens.json"

const { fontFamily, spacing, fontSize, fontWeight, lineHeight, ...theme } =
  designTokens

export const GlobalStyle = createGlobalStyle`
    *, *::before, *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    button, input, textarea {
        font-family: inherit;
        border: none;
        background: transparent;
    }

    ul, ol {
        list-style: none;
    }

    html {
        font-family: ${fontFamily};
        font-size: 16px;
    }

    fieldset {
      border: none;
    }
`

export default {
  ...theme,
  fontSize,
  fontWeight,
  lineHeight,
  typography: {
    xs: {
      fontSize: fontSize.xs,
      lineHeight: lineHeight.xs,
      fontWeight,
    },
    sm: {
      fontSize: fontSize.sm,
      lineHeight: lineHeight.sm,
      fontWeight,
    },
    base: {
      fontSize: fontSize.md,
      lineHeight: lineHeight.md,
      fontWeight,
    },
    lg: {
      fontSize: fontSize.lg,
      lineHeight: lineHeight.lg,
      fontWeight,
    },
  },
  spacing: (...values: (keyof typeof spacing)[]) =>
    values.map((value) => spacing[value]).join(" "),
}
