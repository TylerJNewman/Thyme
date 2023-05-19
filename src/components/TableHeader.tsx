import React from "react";
import { Box, IconButton, Stack, Text } from "@chakra-ui/react";
import { FaAngleUp } from "react-icons/fa";
import { useScrollTable } from "context/ScrollTableContext";

const TableHeader = () => {
  const { goToTop } = useScrollTable();

  return (
    <Box as="section" pt={{ base: "2", md: "4" }} pb={{ base: "3", md: "6" }}>
      <Stack spacing="5">
        <Stack
          spacing="4"
          direction={{ base: "column", md: "row" }}
          justify="space-between"
        >
          <Box>
            <Text fontSize="3xl" fontWeight="medium">
            </Text>
          </Box>
          <IconButton
            icon={<FaAngleUp fontSize="1.25rem" />}
            variant="ghost"
            aria-label="Scroll to top"
            onClick={goToTop}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default TableHeader;
