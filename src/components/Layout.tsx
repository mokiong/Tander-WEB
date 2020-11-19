import { Box } from "@chakra-ui/core";
import React from "react";

interface layoutProps {
  inputBgColor?: string;
}

export const Layout: React.FC<layoutProps> = ({ children, inputBgColor }) => {
  return (
    <Box w="100%" maxH="100vh" bgColor={inputBgColor}>
      {children}
    </Box>
  );
};
