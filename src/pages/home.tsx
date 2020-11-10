import { Box, Flex, Image } from "@chakra-ui/core";
import React from "react";
import { Inbox } from "../components/Inbox";
import { Layout } from "../components/Layout";

interface homeProps {}

const Home: React.FC<homeProps> = ({}) => {
  return (
    <Layout inputBgColor="white">
      <Flex direction="row" border="solid">
        <Inbox />
        <Box
          mr="auto"
          w="100%"
          border="solid"
          direction="column"
          h="auto"
          align="center"
        >
          <Image
            src="/images/homepage.jpg"
            boxSize="40%"
            objectFit="cover"
            alt="profile picture"
            ignoreFallback
          />
        </Box>
      </Flex>
    </Layout>
  );
};

export default Home;
