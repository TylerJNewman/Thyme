import {Container} from '@chakra-ui/react'
import Nav from '../components/Nav'
import {Table} from '../components/Table'
import SectionHeader from '../components/SectionHeader'

const Index = () => (
  <>
    <Nav />
    <Container py={{base: '4', md: '8'}}>
      <SectionHeader />
      <Table />
    </Container>
  </>
)

export default Index
