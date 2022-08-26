import React, {useContext} from 'react'
import {
  Box,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
} from '@chakra-ui/react'
import {FiSearch} from 'react-icons/fi'
import {FormulaeContext} from '../context/FormulaaContext'

const SectionHeader = () => {
  const {setSearchPattern} = useContext(FormulaeContext)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchPattern(e.target.value)
  }

  return (
    <Box as="section" pt={{base: '4', md: '8'}} pb={{base: '3', md: '6'}}>
      <Stack spacing="5">
        <Stack
          spacing="4"
          direction={{base: 'column', md: 'row'}}
          justify="space-between"
        >
          <Box>
            <Text fontSize="3xl" fontWeight="medium">
              Formulae
            </Text>
          </Box>
          <InputGroup maxW={{sm: 'xs'}}>
            <InputLeftElement pointerEvents="none">
              <Icon as={FiSearch} color="muted" boxSize="5" />
            </InputLeftElement>
            <Input placeholder="Search" onChange={handleSearch} />
          </InputGroup>
        </Stack>
      </Stack>
    </Box>
  )
}

export default SectionHeader
