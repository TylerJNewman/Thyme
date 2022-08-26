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
import {Virtuoso} from 'react-virtuoso'

import {LogoSmall} from './LogoSmall'
import {FormulaeContext} from '../context/FormulaaContext'
import {FiLink} from 'react-icons/fi'
import ChakraNextLink from './ChakraNextLink'

const Row = ({index, data}: {index: number; data: any}) => (
  <ScaleFade initialScale={0} in={true}>
    <Tr key={data[index].name}>
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

      <Td>
        <ChakraNextLink href={data[index].homepage ?? ''} isExternal>
          <Text color="muted">{data[index].desc}</Text>
        </ChakraNextLink>
      </Td>
    </Tr>
  </ScaleFade>
)

export const FormulaeTable = (props: TableProps) => {
  const {data, error} = useContext(FormulaeContext)

  if (error) return <div>failed to load</div>

  return (
    <Table {...props}>
      <Tbody>
        {!data ? (
          <Skeleton height="70vh" />
        ) : (
          <Virtuoso
            style={{height: '70vh'}}
            data={data}
            overscan={0}
            itemContent={index => <Row index={index} data={data} />}
          />
        )}
      </Tbody>
    </Table>
  )
}
