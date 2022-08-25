import {Container} from '../components/Container'
import Nav from '../components/Nav'
import {Table} from '../components/Table'

const Index = () => (
  <>
    <Nav />
    <Container py={{base: '4', md: '8'}} px={{base: '0', md: 8}}>
      <Table />
    </Container>
  </>
)

export default Index
