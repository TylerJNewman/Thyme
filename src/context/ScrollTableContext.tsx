import React, {createContext, useContext, useEffect, useState} from 'react'

const ScrollTableContext = createContext(null)

const ScrollTableContextProvider = ({children}) => {
  const ref = React.useRef(null)

  const goToTop = () => {
    ref.current?.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <ScrollTableContext.Provider value={{goToTop, ref}}>
      {children}
    </ScrollTableContext.Provider>
  )
}

function useScrollTable() {
  const context = useContext(ScrollTableContext)
  if (context === undefined) {
    throw new Error(
      'useScrollTable must be used within a ScrollTableContextProvider',
    )
  }
  return context
}

export {ScrollTableContext, ScrollTableContextProvider, useScrollTable}
