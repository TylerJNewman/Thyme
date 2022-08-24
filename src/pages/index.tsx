import {Container} from '../components/Container'
import {DarkModeSwitch} from '../components/DarkModeSwitch'
import Nav from '../components/Nav'
import {Table} from '../components/Table'

const Index = () => (
  <>
    <Nav />
    <Container py={{base: '4', md: '8'}} px={{base: '0', md: 8}}>
      <Table />
      {/* <DarkModeSwitch /> */}
    </Container>
  </>
)

export default Index
