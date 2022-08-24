import {Box, Flex, Stack} from '@chakra-ui/react'
import {DarkModeSwitch} from './DarkModeSwitch'

export default function Nav() {
  return (
    <>
      <Box px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box>Logo</Box>

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
