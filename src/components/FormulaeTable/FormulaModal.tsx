import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Avatar,
  Badge,
  Box,
  HStack,
  Icon,
} from '@chakra-ui/react'
import ChakraNextLink from 'components/ChakraNextLink'
import {Octokit} from '@octokit/rest'
import {useEffect, useState} from 'react'
import getDownloadCount from 'utils/getDownloadCount'
import {FaCloudDownloadAlt, FaStar} from 'react-icons/fa'

const octokit = new Octokit({auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN})

interface FormulaModalProps {
  isOpen: boolean
  onClose: () => void
  overlay: any
  formula: any
}

const Header = ({repoData, owner, repo, version}) => {
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
            <Text fontSize="lg" fontWeight="medium">
              {repoData?.name}
            </Text>
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
            {version}
          </Text>
        </Box>
      </HStack>
    </ModalHeader>
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

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      {overlay}
      <ModalContent maxW="56rem">
        <Header
          repoData={repoData}
          owner={owner}
          repo={repo}
          version={formula.versions.stable}
        />
        <ModalCloseButton />
        <ModalBody>
          <Text>{/* <pre>{JSON.stringify(repoData, null, 2)}</pre> */}</Text>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default FormulaModal
