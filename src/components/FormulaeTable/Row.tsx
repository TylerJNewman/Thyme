import {Text, Td, Fade, HStack, IconButton, Box} from '@chakra-ui/react'
import ChakraNextLink from 'components/ChakraNextLink'
import {LogoSmall} from 'components/LogoSmall'
import Overlay from './Overlay'

const isRepo = (homepage: string) => homepage.includes('github.com')

const Row = ({index, data, setOverlay, onOpen, setCurrentFormula}: any) => {
  const formula = data[index]
  const {full_name, versions, homepage, desc} = formula

  return (
    <>
      <Td width="100%">
        <Fade in={true}>
          <HStack spacing="3">
            {isRepo(homepage) ? (
              <IconButton
                variant="ghost"
                icon={<LogoSmall fontSize="1.25rem" />}
                aria-label="formula-info"
                onClick={() => {
                  setCurrentFormula(formula)
                  setOverlay(<Overlay />)
                  onOpen()
                }}
              />
            ) : (
              <Box width="40px" />
            )}

            <Box>
              <ChakraNextLink href={homepage ?? ''} isExternal>
                <Text fontWeight="medium" fontSize={{sm: 'inherit', md: 'md'}}>
                  {full_name}
                </Text>
              </ChakraNextLink>
              {/* Hack to suppress google translate */}
              {versions?.stable ? (
                <HStack spacing={0}>
                  <Text color="muted" fontSize={{sm: 'inherit', md: 'md'}}>
                    v
                  </Text>
                  <Text color="muted" fontSize={{sm: 'inherit', md: 'md'}}>
                    {versions?.stable}
                  </Text>
                </HStack>
              ) : null}
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
          <Box>
            <Text color="muted" fontSize={{sm: 'inherit', md: 'md'}}>
              {desc}
            </Text>
          </Box>
        </Fade>
      </Td>
    </>
  )
}

export default Row
