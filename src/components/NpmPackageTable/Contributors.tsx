import {useState, useEffect} from 'react'
import {
  Skeleton,
  SimpleGrid,
  Stack,
  Avatar,
  Badge,
  Text,
  Box,
} from '@chakra-ui/react'
import ChakraNextLink from 'components/ChakraNextLink'
import {Octokit} from '@octokit/rest'

const octokit = new Octokit({auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN})

const Contributors = ({owner, repo}) => {
  const [contributors, setContributors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getContributors = async () => {
      const {data} = await octokit.repos.listContributors({
        owner,
        repo,
      })
      setContributors(data)
      setLoading(false)
    }
    getContributors()
  }, [owner, repo])

  if (loading) return <Skeleton height="400px" />

  if (!contributors.length) return null

  return (
    <SimpleGrid
      columns={{base: 1, md: 2}}
      columnGap="8"
      rowGap={{base: '10', lg: '12'}}
      flex="1"
    >
      {contributors?.map(contributor => (
        <Stack
          key={contributor.login}
          spacing={{base: '4', md: '5'}}
          direction="row"
        >
          <Avatar
            src={contributor.avatar_url}
            name={contributor.login}
            boxSize={{base: '12', md: '16'}}
          />
          <Stack spacing="4">
            <Stack>
              <Box>
                <ChakraNextLink href={contributor.html_url ?? ''} isExternal>
                  <Text fontWeight="medium" fontSize="lg">
                    {contributor.login}
                  </Text>
                </ChakraNextLink>
                {contributor?.site_admin ? (
                  <Badge colorScheme={'blue'}>Admin</Badge>
                ) : null}
              </Box>
              <Text color="muted" fontSize={{base: 'sm'}}>
                #commits: {contributor?.contributions.toLocaleString('en-US')}
              </Text>
            </Stack>
          </Stack>
        </Stack>
      ))}
    </SimpleGrid>
  )
}

export default Contributors
