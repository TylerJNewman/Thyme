import {SWRConfig} from 'swr'
import {ChakraProvider} from '@chakra-ui/react'

import {AppProps} from 'next/app'
import localStorageProvider from 'lib/localStorageProvider'
import fetcher from 'lib/fetchJson'
import {FormulaeContextProvider} from 'context/FormulaeContext'
import {theme} from 'theme'

function MyApp({Component, pageProps}: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher,
        onError: err => {
          console.error(err)
        },
        provider: localStorageProvider,
      }}
    >
      <FormulaeContextProvider>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </FormulaeContextProvider>
    </SWRConfig>
  )
}

export default MyApp
