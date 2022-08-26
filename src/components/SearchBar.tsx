import React, {useContext} from 'react'
import {Box, Icon, Input, InputGroup, InputLeftElement} from '@chakra-ui/react'
import {FiSearch} from 'react-icons/fi'
import {FormulaeContext} from '../context/FormulaaContext'

const SearchBar = () => {
  const {setSearchPattern} = useContext(FormulaeContext)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchPattern(e.target.value)
  }

  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <Icon as={FiSearch} color="muted" boxSize="5" />
      </InputLeftElement>
      <Input placeholder="Search" onChange={handleSearch} />
    </InputGroup>
  )
}

export default SearchBar
