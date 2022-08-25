import {
  Box,
  Stack,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react'
import * as React from 'react'
import {MemberTable} from './MemberTable'

export const Table = () => {
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
