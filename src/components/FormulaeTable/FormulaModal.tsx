import {
  Modal,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Avatar,
  Box,
  HStack,
  SimpleGrid,
  Stack,
  useBreakpointValue,
  Badge,
  useColorModeValue,
  Skeleton,
} from '@chakra-ui/react'
import {Octokit} from '@octokit/rest'
import ChakraNextLink from 'components/ChakraNextLink'
import {useEffect, useState} from 'react'
import {getTwitterDate} from 'utils/getTwitterDate'
import Header from './Header'

const octokit = new Octokit({auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN})

interface FormulaModalProps {
  isOpen: boolean
  onClose: () => void
  overlay: any
  formula: any
}

const Members = ({owner, repo}) => {
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

const FormulaModal = ({
  isOpen,
  onClose,
  overlay,
  formula,
}: FormulaModalProps) => {
  if (!formula) return null

  const {homepage} = formula
  const {pathname} = new URL(homepage)
  const [owner, repo] = pathname.split('/').slice(1)
  const [repoData, setRepoData] = useState(null)
  const [closedIssues, setClosedIssues] = useState(null)
  const [openIssues, setOpenIssues] = useState(null)

  useEffect(() => {
    if (!formula) return
    if (!homepage.includes('github.com')) return

    const getRepo = async () => {
      const {data} = await octokit.repos.get({
        owner,
        repo,
      })

      setRepoData(data)
    }

    getRepo()
  }, [formula])

  useEffect(() => {
    if (!formula) return
    const getIssues = async () => {
      const {data: issues} = await octokit.request(
        `GET /search/issues?q=repo:${owner}/${repo}+type:issue`,
      )
      const open = issues.items.filter(item => item.state === 'open').length
      const closed = issues.items.filter(item => item.state === 'closed').length
      setOpenIssues(open)
      setClosedIssues(closed)
    }

    getIssues()
  }, [formula])

  const textColor = useColorModeValue('gray.700', 'gray.400')

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior={'inside'}
    >
      {overlay}
      <ModalContent maxW="56rem">
        <Header
          repoData={repoData}
          owner={owner}
          repo={repo}
          version={formula.versions.stable}
          homepage={homepage}
        />
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={{base: '2', md: '4'}}>
            <Stack spacing={{base: '1', md: '2'}}>
              <HStack mb={{base: '1', md: '2'}}>
                {repoData?.updated_at ? (
                  <>
                    <Text fontWeight="medium" color={textColor}>
                      Updated: {getTwitterDate(repoData?.updated_at)}
                    </Text>
                    <Text fontWeight="medium" color={textColor}>
                      ·
                    </Text>
                  </>
                ) : null}
                {openIssues || closedIssues ? (
                  <>
                    <Text fontWeight="medium" color={textColor}>
                      Open issues: {openIssues ?? 0}
                    </Text>
                    <Text fontWeight="medium" color={textColor}>
                      ·
                    </Text>
                    <Text fontWeight="medium" color={textColor}>
                      Closed issues: {closedIssues ?? 0}
                    </Text>
                  </>
                ) : null}
              </HStack>
              <Text fontSize={{base: 'lg', md: 'xl'}} maxW="3xl">
                {formula.desc}
              </Text>
            </Stack>
            <Text
              fontSize={{base: 'lg', md: 'xl'}}
              color="accent"
              fontWeight="semibold"
            >
              Collaborators
            </Text>
            <Members owner={owner} repo={repo} />
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default FormulaModal
