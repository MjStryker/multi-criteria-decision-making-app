import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: `'Roboto', sans-serif`,
    body: `'Roboto', sans-serif`,
    mono: `'Roboto Mono', monospace`
  },
  styles: {
    global: {
      body: {
        bg: "gray.50"
      }
    }
  }
});

export function ChakraAppProvider({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
