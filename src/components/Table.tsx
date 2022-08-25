import {
  Box,
  Button,
  ButtonGroup,
  Container,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react'
import * as React from 'react'
import {FiSearch} from 'react-icons/fi'
import {MemberTable} from './MemberTable'

export const Table = () => {
  const isMobile = useBreakpointValue({base: true, md: false})
  return (
    <Box
      bg="bg-surface"
      boxShadow={{base: 'none', md: useColorModeValue('sm', 'sm-dark')}}
      borderRadius={useBreakpointValue({base: 'none', md: 'lg'})}
    >
      <Stack spacing="5">
        <Box overflowX="auto">
          <MemberTable />
        </Box>
      </Stack>
    </Box>
  )
}
