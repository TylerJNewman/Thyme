import {Box, Table, Tbody, Tr, Skeleton, useDisclosure} from '@chakra-ui/react'
import {useState, forwardRef} from 'react'
import {TableVirtuoso} from 'react-virtuoso'

import {useFormulae} from 'context/FormulaeContext'
import {useScrollTable} from 'context/ScrollTableContext'

import FormulaModal from './FormulaModal'
import Overlay from './Overlay'
import Row from './Row'

export const FormulaeTable = () => {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const [overlay, setOverlay] = useState(<Overlay />)
  const {data, error, loading} = useFormulae()

  if (error) return <div>failed to load</div>

  const {ref} = useScrollTable()

  console.log(data.slice(0, 10))

  return (
    <>
      {loading ? (
        <Skeleton height="70vh" />
      ) : data?.length === 0 ? (
        <Box p="5">No results found</Box>
      ) : (
        <TableVirtuoso
          ref={ref}
          style={{
            height: '70vh',
          }}
          components={{
            Table: props => <Table {...props} />,
            TableRow: props => <Tr {...props} />,
            TableBody: forwardRef((props, ref) => (
              <Tbody {...props} ref={ref} />
            )),
          }}
          data={data}
          overscan={100}
          itemContent={index => (
            <Row
              index={index}
              data={data}
              setOverlay={setOverlay}
              onOpen={onOpen}
            />
          )}
        />
      )}
      <FormulaModal isOpen={isOpen} onClose={onClose} overlay={overlay} />
    </>
  )
}
