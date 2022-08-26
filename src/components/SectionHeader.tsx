import React from 'react'
import {
  Box,
  Container,
  Divider,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
} from '@chakra-ui/react'
import {FiSearch} from 'react-icons/fi'

const SectionHeader = () => {
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
            <Input placeholder="Search" />
          </InputGroup>
        </Stack>
      </Stack>
    </Box>
  )
}

export default SectionHeader
