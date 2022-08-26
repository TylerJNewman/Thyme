import React, {createContext} from 'react'
import useSWR from 'swr'
import FuzzySearch from 'fuzzy-search'

const url = 'https://formulae.brew.sh/api/formula.json'
const keys = ['name', 'full_name']

// create context
const FormulaeContext = createContext(null)

const FormulaeContextProvider = ({children}) => {
  const {data, error} = useSWR(url)
  const [searchPattern, setSearchPattern] = React.useState('')

  const searcher = new FuzzySearch(data, keys, {sort: true})
  const result = searcher.search(searchPattern)

  return (
    // the Provider gives access to the context to its children
    <FormulaeContext.Provider value={{data: result, error, setSearchPattern}}>
      {children}
    </FormulaeContext.Provider>
  )
}

export {FormulaeContext, FormulaeContextProvider}
