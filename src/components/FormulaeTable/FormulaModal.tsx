import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
} from '@chakra-ui/react'

interface FormulaModalProps {
  isOpen: boolean
  onClose: () => void
  overlay: any
}

const FormulaModal = ({isOpen, onClose, overlay}: FormulaModalProps) => (
  <Modal isCentered isOpen={isOpen} onClose={onClose}>
    {overlay}
    <ModalContent>
      <ModalHeader>Modal Title</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Text>Custom backdrop filters!</Text>
      </ModalBody>
      <ModalFooter>
        <Button onClick={onClose}>Close</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
)

export default FormulaModal
