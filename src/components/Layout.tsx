import { Box } from "@chakra-ui/core";
import React from "react";

export const Layout: React.FC = ({ children }) => {
  return (
    <Box
      w="100%"
      minH="100vh"
      padding="30px"
      border="1px solid black"
      mx="auto"
      textAlign="center"
      bg="tinder.bg"
    >
      {children}
    </Box>
  );
};
