import {
  Box,
  HStack,
  IconButton,
  Table,
  TableProps,
  Tbody,
  Td,
  Text,
  Tr,
} from '@chakra-ui/react'
import {useContext} from 'react'

import {LogoSmall} from './LogoSmall'
import {FormulaeContext} from '../context/FormulaaContext'
import {FiLink} from 'react-icons/fi'
import ChakraNextLink from './ChakraNextLink'

export const MemberTable = (props: TableProps) => {
  const {data, error} = useContext(FormulaeContext)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  let firstPage = data.slice(0, 100)

  return (
    <Table {...props}>
      <Tbody>
        {firstPage.map(data => (
          <Tr key={data.name}>
            <Td>
              <HStack spacing="3">
                <IconButton
                  variant="ghost"
                  icon={<LogoSmall fontSize="1.25rem" />}
                  aria-label="Homepage"
                />
                <Box>
                  <Text fontWeight="medium">{data.full_name}</Text>
                  <Text color="muted">{data.versions.stable}</Text>
                </Box>
              </HStack>
            </Td>

            <Td width="100%">
              <Text color="muted">{data.desc}</Text>
            </Td>
            <Td>
              <ChakraNextLink href={data.homepage} isExternal color="red">
                <IconButton
                  variant="ghost"
                  icon={<FiLink fontSize="1.25rem" />}
                  aria-label="Homepage"
                />
              </ChakraNextLink>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}
