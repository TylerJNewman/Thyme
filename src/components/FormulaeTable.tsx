import {
  Box,
  HStack,
  IconButton,
  ScaleFade,
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

{
  /* <ScaleFade initialScale={0} in={true}> */
}

const Row = ({index, data}: {index: number; data: any}) => (
  <>
    <Td width="100%">
      <HStack spacing="3">
        <IconButton
          variant="ghost"
          icon={<LogoSmall fontSize="1.25rem" />}
          aria-label="Homepage"
        />
        <Box>
          <Text fontWeight="medium">{data[index].full_name}</Text>
          <Text color="muted">{data[index].versions?.stable}</Text>
        </Box>
      </HStack>
    </Td>
    <Td
      style={{
        textAlign: 'end',
      }}
    >
      <ChakraNextLink href={data[index].homepage ?? ''} isExternal>
        <Box>
          <Text color="muted">{data[index].desc}</Text>
        </Box>
      </ChakraNextLink>
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
            TableRow: Tr,
            TableBody: React.forwardRef((props, ref) => (
              <Tbody {...props} ref={ref} />
            )),
          }}
          data={data}
          overscan={0}
          itemContent={index => <Row index={index} data={data} />}
        />
      )}
    </>
  )
}
