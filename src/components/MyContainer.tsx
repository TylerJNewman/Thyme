import { Container } from "@chakra-ui/react";

export default function NavContainer({ children, ...props }) {
  return (
    <Container {...props}>
      {children}
    </Container>
  );
}
