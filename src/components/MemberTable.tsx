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
import axios from 'axios'
import useSWR from 'swr'
import * as React from 'react'
import {FiEdit2, FiTrash2, FiLink} from 'react-icons/fi'
import {IoArrowDown} from 'react-icons/io5'
import {members} from './data'
import Link from 'next/link'
import {Link as ChakraLink} from '@chakra-ui/react'

function ChakraNextLink({href, children, ...props}) {
  return (
    <Link href={href} passHref>
      <ChakraLink {...props}>{children}</ChakraLink>
    </Link>
  )
}

const fetcher = async url => await axios.get(url).then(res => res.data)
const url = 'https://formulae.brew.sh/api/formula.json'

export const MemberTable = (props: any) => {
  // const {data} = props

  // const {full_name, desc, homepage, versions, deprecated} = data[0]

  const {data, error} = useSWR(url, fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  const {full_name, desc, homepage, versions, deprecated} = data[0]

  console.log(data[0])

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
        {members.map(member => (
          <Tr key={member.id}>
            <Td width="100%">
              <HStack spacing="3">
                <Avatar
                  name={member.name}
                  src={member.avatarUrl}
                  boxSize="10"
                />
                <Box>
                  <Text fontWeight="medium">{full_name}</Text>
                  <Text color="muted">{versions.stable}</Text>
                </Box>
              </HStack>
            </Td>
            {/* <Td>
              <Badge
                size="sm"
                colorScheme={deprecated === false ? 'green' : 'red'}
              >
                {deprecated === false ? 'Active' : 'Deprecated'}
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
            <Td>
              <HStack spacing="1">
                <Text color="muted">{desc}</Text>
                <ChakraNextLink href={homepage} isExternal color="red">
                  <IconButton
                    variant="ghost"
                    icon={<FiLink fontSize="1.25rem" />}
                    aria-label="Homepage"
                  />
                </ChakraNextLink>
              </HStack>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}
