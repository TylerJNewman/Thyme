import { Flex } from "@chakra-ui/react";
import { Main } from "./Main";
import { Navbar } from "./Navbar";
import { ScrollTableContextProvider } from "context/ScrollTableContext";

export const Layout = ({ children }) => {
  return (
    <ScrollTableContextProvider>
      <Flex direction="column" flex="1">
        <Navbar />
        <Main>{children}</Main>
      </Flex>
    </ScrollTableContextProvider>
  );
};
