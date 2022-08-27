import {Icon, Input, InputGroup, InputLeftElement} from '@chakra-ui/react'
import {FiSearch} from 'react-icons/fi'
import {useFormulae} from '../context/FormulaaContext'
import {useScrollTable} from '../context/ScrollTableContext'

const SearchBar = () => {
  const {setSearchPattern} = useFormulae()
  const {goToTop} = useScrollTable()

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchPattern(e.target.value)
    goToTop()
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
