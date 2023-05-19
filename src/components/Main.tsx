import { Container, Flex, FlexProps } from "@chakra-ui/react";

interface MainProps extends FlexProps {
  children: React.ReactNode;
}

export const Main = (props: MainProps) => {
  const { children, ...flexProps } = props;
  return (
    <Flex
      as="main"
      role="main"
      direction="column"
      flex="1"
      {...flexProps}
    >
      <Container flex="1">
        {children}
      </Container>
    </Flex>
  );
};
