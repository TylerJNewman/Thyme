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
  Icon,
  Link,
  SimpleGrid,
  Stack,
  useBreakpointValue,
  Heading,
} from '@chakra-ui/react'
import {Octokit} from '@octokit/rest'
import {useEffect, useState} from 'react'
import {FaGithub, FaLinkedin, FaTwitter} from 'react-icons/fa'
import {getTwitterDate} from 'utils/getTwitterDate'
import Header from './Header'

const octokit = new Octokit({auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN})

interface FormulaModalProps {
  isOpen: boolean
  onClose: () => void
  overlay: any
  formula: any
}

export const members = [
  {
    role: 'Co-Founder / CEO',
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzN8fGxhZHklMjBzbWlsaW5nfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    name: 'Camila West',

    description:
      ' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
  },
  {
    role: 'Co-Founder / CTO',
    image:
      'https://images.unsplash.com/photo-1573007974656-b958089e9f7b?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Nnx8Z3V5JTIwc21pbGluZ3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    name: 'Mark Linhsorg',

    description:
      'Habitant morbi tristique senectus et netus et malesuada fames vestibulum.',
  },
  {
    role: 'Marketing Manager',
    image:
      'https://images.unsplash.com/photo-1521296797187-726205347ca9?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NTd8fGxhZHklMjBzbWlsaW5nfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    name: 'Kim Yung',

    description:
      'Quis risus sed vulputate odio ut enim blandit volutpat. Amet cursus sit amet.',
  },
  {
    role: 'Manager, Business Relations',
    image:
      'https://images.unsplash.com/photo-1524660988542-c440de9c0fde?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTYwfHxibGFjayUyMGd1eXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    name: 'Morgan Adebayo',

    description:
      'Consectetur libero id faucibus nisl tincidunt eget nullam fringilla urna.',
  },
  {
    role: 'Chief Operating Officer',
    image:
      'https://images.unsplash.com/photo-1522938974444-f12497b69347?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NzJ8fGJsYWNrJTIwbGFkeXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    name: 'Bimbo Akintola',

    description:
      'Mi eget mauris pharetra et ultrices neque ornare aenean massa eget egestas.',
  },
  {
    role: 'Head of Human Resources',
    image:
      'https://images.unsplash.com/photo-1574034589502-9f8a1ed46fa7?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTMxfHxsYWR5JTIwc21pbGluZ3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    name: 'Yasmine Jones',

    description:
      'Diam maecenas sed enim ut sem viverra aliquet eget magna ac placerat.',
  },
]

const Members = ({members}) => {
  return (
    <SimpleGrid
      columns={{base: 1, md: 2}}
      columnGap="8"
      rowGap={{base: '10', lg: '12'}}
      flex="1"
    >
      {members.map(member => (
        <Stack key={member.name} spacing={{base: '4', md: '5'}} direction="row">
          <Avatar src={member.image} boxSize={{base: '12', md: '16'}} />
          <Stack spacing="4">
            <Stack>
              <Box>
                <Text fontWeight="medium" fontSize="lg">
                  {member.name}
                </Text>
                <Text color="accent">{member.role}</Text>
              </Box>
              <Text color="muted">{member.description}</Text>
            </Stack>
            <HStack spacing="4" color="subtle">
              {[FaGithub, FaLinkedin, FaTwitter].map((item, id) => (
                <Link href="#" key={id}>
                  <Icon as={item} boxSize="5" />
                </Link>
              ))}
            </HStack>
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

  const size = useBreakpointValue({base: 'xs', md: 'sm'})

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
          <Stack spacing={{base: '4', md: '8'}}>
            <Stack spacing={{base: '1', md: '2'}}>
              <HStack mb={{base: '1', md: '2'}}>
                {repoData?.updated_at ? (
                  <>
                    <Text fontSize={size}>
                      Latest Commit: {getTwitterDate(repoData?.updated_at)}
                    </Text>
                    <Text fontSize={size}>·</Text>
                  </>
                ) : null}
                {openIssues ? (
                  <>
                    <Text fontSize={size}>Open issues: {openIssues}</Text>
                    <Text fontSize={size}>·</Text>
                  </>
                ) : null}
                {closedIssues ? (
                  <Text fontSize={size}>Closed issues: {closedIssues}</Text>
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
              Team
            </Text>
            <Members members={members} />
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
