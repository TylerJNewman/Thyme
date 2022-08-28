import {
  ModalHeader,
  HStack,
  Avatar,
  Icon,
  Wrap,
  useColorModeValue,
  Tag,
  Text,
  Box,
} from '@chakra-ui/react'
import {Octokit} from '@octokit/rest'
import ChakraNextLink from 'components/ChakraNextLink'
import {useState, useEffect} from 'react'
import {FaCloudDownloadAlt, FaStar} from 'react-icons/fa'
import getDownloadCount from 'utils/getDownloadCount'

const octokit = new Octokit({auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN})

const Header = ({repoData, owner, repo, version, homepage}) => {
  const [downloadCount, setDownloadCount] = useState(null)

  useEffect(() => {
    if (!repoData) return

    const getDownloads = async () => {
      const {data: releases} = await octokit.request(
        `GET /repos/${owner}/${repo}/releases/latest`,
        {
          owner,
          repo,
        },
      )

      const count = getDownloadCount(releases)
      setDownloadCount(count)
    }
    getDownloads()
  }, [repoData, owner, repo])

  return (
    <ModalHeader>
      <HStack spacing="4">
        <Avatar
          src={repoData?.owner?.avatar_url}
          name={repoData?.owner?.login}
          boxSize={{base: '12', sm: '14'}}
        />
        <Box>
          <HStack spacing={3}>
            <ChakraNextLink href={homepage ?? ''} isExternal>
              <Text fontSize="lg" fontWeight="medium">
                {repoData?.name}
              </Text>
            </ChakraNextLink>
            {downloadCount !== null ? (
              <HStack spacing={1}>
                <Icon as={FaCloudDownloadAlt} fontSize="sm" />
                <Text color="muted" fontSize="sm">
                  {downloadCount}
                </Text>
              </HStack>
            ) : null}
            {repoData?.stargazers_count ? (
              <HStack spacing={1}>
                <Icon as={FaStar} fontSize="sm" />
                <Text color="muted" fontSize="sm">
                  {repoData?.stargazers_count}
                </Text>
              </HStack>
            ) : null}
          </HStack>
          <Text color="muted" fontSize="sm">
            v{version}
          </Text>
        </Box>
      </HStack>
      {repoData?.topics?.length ? (
        <Wrap
          shouldWrapChildren
          mt="5"
          color={useColorModeValue('gray.600', 'gray.300')}
        >
          {repoData?.topics?.map(tag => (
            <Tag key={tag} color="inherit" px="3">
              {tag}
            </Tag>
          ))}
        </Wrap>
      ) : null}
    </ModalHeader>
  )
}

export default Header
