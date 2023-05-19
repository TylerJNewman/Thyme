import { Box, Flex, Heading, HStack, IconButton } from "@chakra-ui/react";
import { FiUser } from "react-icons/fi";
import { Logo } from "./Logo";
import SearchBar from "./SearchBar";
import MyContainer from "./MyContainer";

export const Navbar = () => {
  return (
    <Box as="section">
      <Box as="nav" bg="yellow.400" boxShadow="sm">
        <MyContainer py={{ base: "3", lg: "4" }}>
          <Flex justify="space-between">
            <HStack spacing="4">
              <Logo />
              <Heading
                size={{ base: "xs", md: "sm" }}
                fontWeight="medium"
              >
                Thyme
              </Heading>
            </HStack>
            <HStack spacing="4">
              <SearchBar />
              <IconButton
                variant="ghost"
                icon={<FiUser fontSize="1.25rem" />}
                aria-label="Open Menu"
              />
            </HStack>
          </Flex>
        </MyContainer>
      </Box>
    </Box>
  );
};
