import {
  Box,
  Skeleton,
  Table,
  Tbody,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { forwardRef, useState } from "react";
import { TableVirtuoso } from "react-virtuoso";

import { useNpmPackages } from "context/NpmPackageContext";
import { useScrollTable } from "context/ScrollTableContext";

import FormulaModal from "./Modal";
import Overlay from "./Overlay";
import Row from "./Row";

export const NpmPackageTable = () => {
  const { ref } = useScrollTable();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentFormula, setCurrentFormula] = useState(null);
  const clearCurrentFormula = () => setCurrentFormula(null);

  const handleClose = () => {
    clearCurrentFormula();
    onClose();
  };

  const [overlay, setOverlay] = useState(<Overlay />);
  const { data, error, loading } = useNpmPackages();

  if (error) return <div>failed to load</div>;

  return (
    <>
      {loading
        ? <Skeleton height="70vh" />
        : data?.length === 0
        ? <Box p="5">No results found</Box>
        : (
          <TableVirtuoso
            ref={ref}
            style={{
              height: "70vh",
            }}
            components={{
              Table: (props) => <Table {...props} />,
              TableRow: (props) => <Tr {...props} />,
              TableBody: forwardRef((props, ref) => (
                <Tbody {...props} ref={ref} />
              )),
            }}
            data={data}
            overscan={100}
            itemContent={(index) => (
              <Row
                index={index}
                data={data}
                setOverlay={setOverlay}
                onOpen={onOpen}
                setCurrentFormula={setCurrentFormula}
              />
            )}
          />
        )}
      <FormulaModal
        isOpen={isOpen}
        onClose={handleClose}
        overlay={overlay}
        formula={currentFormula}
      />
    </>
  );
};
