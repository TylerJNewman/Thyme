import {
  Avatar,
  Badge,
  Box,
  Checkbox,
  Flex,
  HStack,
  Icon,
  IconButton,
  Table,
  TableProps,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import useSWR from 'swr'
import * as React from 'react'
import {FiEdit2, FiTrash2, FiLink} from 'react-icons/fi'
import {IoArrowDown} from 'react-icons/io5'
import Link from 'next/link'
import {Link as ChakraLink} from '@chakra-ui/react'
import {LogoSmall} from './LogoSmall'

function ChakraNextLink({href, children, ...props}) {
  return (
    <Link href={href} passHref>
      <ChakraLink {...props}>{children}</ChakraLink>
    </Link>
  )
}

const url = 'https://formulae.brew.sh/api/formula.json'

export const MemberTable = (props: TableProps) => {
  const {data, error} = useSWR(url)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  const {full_name, desc, homepage, versions, deprecated} = data[0]

  console.log(data[0])

  let firstPage = data.slice(0, 100)

  return (
    <Table {...props}>
      <Thead>
        <Tr>
          {/* <Th>
          <HStack spacing="3">
            <Checkbox />
            <HStack spacing="1">
              <Text>Name</Text>
              <Icon as={IoArrowDown} color="muted" boxSize="4" />
            </HStack>
          </HStack>
        </Th>
        <Th>Status</Th>
        <Th>Email</Th>
        <Th>Role</Th>
        <Th>Rating</Th>
        <Th></Th> */}
        </Tr>
      </Thead>
      <Tbody>
        {firstPage.map(data => (
          <Tr key={data.name}>
            <Td>
              <HStack spacing="3">
                {/* <Avatar
                  name={data.name}
                  src={data.avatarUrl}
                  boxSize="10"
                /> */}
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
            {/* <Td>
              <Badge
                size="sm"
                colorScheme={data.deprecated === false ? 'green' : 'red'}
              >
                {data.deprecated === false ? 'Active' : 'Deprecated'}
              </Badge>
            </Td> */}
            {/* <Td>
              <Text color="muted">{desc}</Text>
            </Td> */}
            {/* <Td>
              <ChakraNextLink href={homepage} isExternal color="red">
                <IconButton
                  variant="ghost"
                  icon={<FiHome fontSize="1.25rem" />}
                  aria-label="Homepage"
                />
              </ChakraNextLink>
            </Td> */}
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
