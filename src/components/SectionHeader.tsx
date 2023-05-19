import React from "react";
import {
  Box,
  Container,
  Heading,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaAngleUp } from "react-icons/fa";
import { useScrollTable } from "context/ScrollTableContext";
import { FiSearch } from "react-icons/fi";

const SectionHeader = () => {
  const { goToTop } = useScrollTable();

  return (
    <Box
      as="section"
      bg="bg-surface"
      pt={{ base: "4", md: "8" }}
      pb={{ base: "12", md: "24" }}
    >
      <Container>
        <Stack
          spacing="4"
          direction={{ base: "column", md: "row" }}
          justify="space-between"
        >
          <Stack spacing="1">
            <Heading size={{ base: "xs", md: "sm" }} fontWeight="medium">
              Thyme Explorer
            </Heading>
            <Text color="muted">
              Search for npm packages and get their github repo info
            </Text>
          </Stack>
          <InputGroup maxW={{ sm: "xs" }}>
            <InputLeftElement pointerEvents="none">
              <Icon as={FiSearch} color="muted" boxSize="5" />
            </InputLeftElement>
            <Input placeholder="Search" />
          </InputGroup>
        </Stack>
      </Container>
    </Box>
  );
};

export default SectionHeader;
