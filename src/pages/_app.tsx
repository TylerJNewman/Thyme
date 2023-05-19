import { SWRConfig } from "swr";
import { ChakraProvider } from "@chakra-ui/react";

import { AppProps } from "next/app";
import localStorageProvider from "lib/localStorageProvider";
import fetcher from "lib/fetchJson";
import { NpmPackageContextProvider } from "context/NpmPackageContext";
import { theme } from "theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher,
        onError: (err) => {
          console.error(err);
        },
        provider: localStorageProvider,
      }}
    >
      <NpmPackageContextProvider>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </NpmPackageContextProvider>
    </SWRConfig>
  );
}

export default MyApp;
