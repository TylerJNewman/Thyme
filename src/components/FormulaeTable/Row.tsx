import {Text, Td, Fade, HStack, IconButton, Box} from '@chakra-ui/react'
import ChakraNextLink from 'components/ChakraNextLink'
import {LogoSmall} from 'components/LogoSmall'
import Overlay from './Overlay'

const Row = ({index, data, setOverlay, onOpen}: any) => {
  return (
    <>
      <Td width="100%">
        <Fade in={true}>
          <HStack spacing="3">
            <IconButton
              variant="ghost"
              icon={<LogoSmall fontSize="1.25rem" />}
              aria-label="formula-info"
              onClick={() => {
                setOverlay(<Overlay />)
                onOpen()
              }}
            />
            <Box>
              <Text fontWeight="medium" fontSize={{sm: 'inherit', md: 'md'}}>
                {data[index].full_name}
              </Text>
              <Text color="muted" fontSize={{sm: 'inherit', md: 'md'}}>
                {data[index].versions?.stable}
              </Text>
            </Box>
          </HStack>
        </Fade>
      </Td>
      <Td
        style={{
          textAlign: 'end',
        }}
      >
        <Fade in={true}>
          <ChakraNextLink href={data[index].homepage ?? ''} isExternal>
            <Box>
              <Text color="muted" fontSize={{sm: 'inherit', md: 'md'}}>
                {data[index].desc}
              </Text>
            </Box>
          </ChakraNextLink>
        </Fade>
      </Td>
    </>
  )
}

export default Row
