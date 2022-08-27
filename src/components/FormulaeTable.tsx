import {
  Box,
  HStack,
  IconButton,
  Fade,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
  Skeleton,
  ModalOverlay,
  useDisclosure,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@chakra-ui/react'
import {useContext, useState, forwardRef} from 'react'
import {TableVirtuoso} from 'react-virtuoso'

import {LogoSmall} from './LogoSmall'
import {FormulaeContext} from '../context/FormulaaContext'
import ChakraNextLink from './ChakraNextLink'
import {useScrollTable} from '../context/ScrollTableContext'

const OverlayOne = () => (
  <ModalOverlay
    bg="blackAlpha.300"
    backdropFilter="blur(10px) hue-rotate(90deg)"
  />
)

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
                setOverlay(<OverlayOne />)
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

interface FormulaInfoModalProps {
  isOpen: boolean
  onClose: () => void
  overlay: any
}

const FormulaInfoModal = ({
  isOpen,
  onClose,
  overlay,
}: FormulaInfoModalProps) => (
  <Modal isCentered isOpen={isOpen} onClose={onClose}>
    {overlay}
    <ModalContent>
      <ModalHeader>Modal Title</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Text>Custom backdrop filters!</Text>
      </ModalBody>
      <ModalFooter>
        <Button onClick={onClose}>Close</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
)

export const FormulaeTable = () => {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const [overlay, setOverlay] = useState(<OverlayOne />)
  const {data, error} = useContext(FormulaeContext)

  if (error) return <div>failed to load</div>

  const {ref} = useScrollTable()

  console.log(data.slice(0, 10))

  return (
    <>
      {!data ? (
        <Skeleton height="70vh" />
      ) : data?.length === 0 ? (
        <Box p="5">No results found</Box>
      ) : (
        <TableVirtuoso
          ref={ref}
          style={{
            height: '70vh',
          }}
          components={{
            Table: props => <Table {...props} />,
            TableRow: props => <Tr {...props} />,
            TableBody: forwardRef((props, ref) => (
              <Tbody {...props} ref={ref} />
            )),
          }}
          data={data}
          overscan={100}
          itemContent={index => (
            <Row
              index={index}
              data={data}
              setOverlay={setOverlay}
              onOpen={onOpen}
            />
          )}
        />
      )}
      <FormulaInfoModal isOpen={isOpen} onClose={onClose} overlay={overlay} />
    </>
  )
}
