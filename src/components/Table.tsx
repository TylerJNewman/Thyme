import {
  Box,
  Stack,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import { NpmPackageTable } from "./NpmPackageTable";

export const Table = () => {
  return (
    <Box
      bg="bg-surface"
      boxShadow={{ base: "none", md: useColorModeValue("sm", "sm-dark") }}
      borderRadius={useBreakpointValue({ base: "none", md: "lg" })}
      width={{ base: "full", md: "auto" }}
    >
      <Stack spacing="5">
        <Box overflowX="auto">
          <NpmPackageTable />
        </Box>
      </Stack>
    </Box>
  );
};
