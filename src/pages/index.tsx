import {useEffect, useRef, useState} from 'react'
import {Container} from '@chakra-ui/react'
import Nav from '../components/Nav'
import {Table} from '../components/Table'
import SectionHeader from '../components/SectionHeader'
import {ScrollTableContextProvider} from '../context/ScrollTableContext'

const Index = () => {
  return (
    <ScrollTableContextProvider>
      <Nav />
      <Container py={{base: '4', md: '8'}}>
        <SectionHeader />
        <Table />
      </Container>
    </ScrollTableContextProvider>
  )
}

export default Index
