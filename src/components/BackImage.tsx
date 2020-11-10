import { Box } from "@chakra-ui/core";
import React from "react";

interface BackImageProps {
  imagePath?: string;
}

export const BackImage: React.FC<BackImageProps> = ({
  children,
  imagePath,
}) => {
  return (
    <Box
      mx="auto"
      w="100%"
      minH="100vh"
      paddingBottom="30px"
      backgroundImage={imagePath}
      backgroundRepeat="no-repeat"
      bgSize="cover"
      bgColor="black"
    >
      {children}
    </Box>
  );
};
