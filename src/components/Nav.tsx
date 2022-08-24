import {Box, Flex, Stack} from '@chakra-ui/react'
import {DarkModeSwitch} from './DarkModeSwitch'
import {Logo} from './Logo'

export default function Nav() {
  return (
    <>
      <Box px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Logo />

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <DarkModeSwitch />
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}
