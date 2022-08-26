import {Box, Container, Flex, Stack} from '@chakra-ui/react'
import {DarkModeSwitch} from './DarkModeSwitch'
import {Logo} from './Logo'
import SearchBar from './SearchBar'

export default function Nav() {
  return (
    <Box as="nav">
      <Container py={{base: '3', lg: '4'}}>
        <Flex justify="space-between">
          <Box px={3}>
            <Logo />
          </Box>
          <Box px={3} maxW="640px" width="100%">
            <SearchBar />
          </Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <DarkModeSwitch />
            </Stack>
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}
