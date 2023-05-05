import { createGlobalStyle } from "styled-components";
import designTokens from "../../design-tokens.json";

const { fontFamily, spacing, ...theme } = designTokens;

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
`;

export default {
  ...theme,
  spacing: (...values: (keyof typeof spacing)[]) =>
    values.map((value) => spacing[value]).join(" "),
};
