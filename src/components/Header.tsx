import React from "react";
import { Box, Heading } from "@chakra-ui/react";

const Header: React.FC = () => {
  return (
    <Box
      bgColor="blackAlpha.800"
      color="orange.500"
      alignItems="center"
      p={3}
      width="100%"
    >
      <Heading>KOIBANX</Heading>
    </Box>
  );
};

export default Header;
