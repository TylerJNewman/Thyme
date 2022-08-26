import {Box, Text} from '@chakra-ui/react'

const SectionHeader = () => {
  return (
    <Box as="section" pt={{base: '2', md: '4'}} pb={{base: '3', md: '6'}}>
      <Text fontSize="3xl" fontWeight="medium">
        Formulae
      </Text>
    </Box>
  )
}

export default SectionHeader
