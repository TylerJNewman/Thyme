import {
  Box,
  HStack,
  IconButton,
  Fade,
  Table,
  TableProps,
  Tbody,
  Td,
  Text,
  Tr,
  Skeleton,
} from '@chakra-ui/react'
import {useContext} from 'react'
import {TableVirtuoso} from 'react-virtuoso'

import {LogoSmall} from './LogoSmall'
import {FormulaeContext} from '../context/FormulaaContext'
import {FiLink} from 'react-icons/fi'
import ChakraNextLink from './ChakraNextLink'
import React from 'react'

const Row = ({index, data}: {index: number; data: any}) => (
  <>
    <Td width="100%">
      <Fade in={true}>
        <HStack spacing="3">
          <IconButton
            variant="ghost"
            icon={<LogoSmall fontSize="1.25rem" />}
            aria-label="Homepage"
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

export const FormulaeTable = (props: TableProps) => {
  const {data, error} = useContext(FormulaeContext)

  if (error) return <div>failed to load</div>

  return (
    <>
      {!data ? (
        <Skeleton height="70vh" />
      ) : (
        <TableVirtuoso
          style={{
            height: '70vh',
          }}
          components={{
            Table: props => <Table {...props} />,
            TableRow: props => <Tr {...props} />,
            TableBody: React.forwardRef((props, ref) => (
              <Tbody {...props} ref={ref} />
            )),
          }}
          data={data}
          overscan={100}
          itemContent={index => <Row index={index} data={data} />}
        />
      )}
    </>
  )
}
