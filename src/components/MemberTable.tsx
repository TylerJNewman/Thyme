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
        <Text color="muted">{data[index].desc}</Text>
      </Td>
      <Td>
        <ChakraNextLink
          href={data[index].homepage ?? ''}
          isExternal
          color="red"
        >
          <IconButton
            variant="ghost"
            icon={<FiLink fontSize="1.25rem" />}
            aria-label="Homepage"
          />
        </ChakraNextLink>
      </Td>
    </Tr>
  </ScaleFade>
)

export const MemberTable = (props: TableProps) => {
  const {data, error} = useContext(FormulaeContext)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <Table {...props}>
      <Tbody>
        <Virtuoso
          style={{height: '70vh'}}
          data={data}
          overscan={0}
          itemContent={(index, user) => <Row index={index} data={data} />}
        />
      </Tbody>
    </Table>
  )
}
