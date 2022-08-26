import React, {createContext} from 'react'
import useSWR from 'swr'

const url = 'https://formulae.brew.sh/api/formula.json'

// create context
const FormulaeContext = createContext(null)

const FormulaeContextProvider = ({children}) => {
  const {data, error} = useSWR(url)

  return (
    // the Provider gives access to the context to its children
    <FormulaeContext.Provider value={{data, error}}>
      {children}
    </FormulaeContext.Provider>
  )
}

export {FormulaeContext, FormulaeContextProvider}
