import { Box, BoxProps, Container } from "@chakra-ui/react";
import { Placeholder } from "./Placeholder";

export const Footer = (props: BoxProps) => {
  return (
    <Box as="footer" role="contentinfo" bg="bg-accent" {...props}>
      <Container>
        <Placeholder minH="20">Footer</Placeholder>
      </Container>
    </Box>
  );
};
