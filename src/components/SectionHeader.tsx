import {Box, Stack, Text} from '@chakra-ui/react'

const SectionHeader = () => {
  return (
    <Box as="section" pt={{base: '4', md: '8'}} pb={{base: '3', md: '6'}}>
      <Stack spacing="5">
        <Box>
          <Text fontSize="3xl" fontWeight="medium">
            Formulae
          </Text>
        </Box>
      </Stack>
    </Box>
  )
}

export default SectionHeader
