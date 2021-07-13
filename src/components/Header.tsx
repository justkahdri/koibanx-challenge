import React from "react";
import { Box, Heading, Image } from "@chakra-ui/react";

const Header: React.FC = () => {
  return (
    <Box
      bgColor="blackAlpha.800"
      color="orange.500"
      alignItems="center"
      p={3}
      width="100%"
    >
      <Image
        src="https://static.wixstatic.com/media/8974d4_1a120064e09245c09fec8d379f4e3b3c~mv2.png/v1/fill/w_360,h_70,al_c,q_85,usm_0.66_1.00_0.01/Productos_KOIBANX-05.webp"
        fallback={<Heading>KOIBANX</Heading>}
        height="60px"
        objectFit="contain"
      />
    </Box>
  );
};

export default Header;
