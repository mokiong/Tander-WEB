import { Flex, Box, Image } from "@chakra-ui/core";
import React from "react";
import { Inbox } from "../components/Inbox";
import { Layout } from "../components/Layout";

interface inboxIdProps {}

const InboxId: React.FC<inboxIdProps> = () => {
  return (
    <Layout inputBgColor="white">
      <Flex direction="row">
        <Inbox />
        <Box mr="auto" w="60%" direction="column" align="center" bg="#f2f2f2">
          <Image
            src="/images/homepage.jpg"
            boxSize="40%"
            objectFit="cover"
            h="auto"
            alt="profile picture"
            ignoreFallback
          />
        </Box>
      </Flex>
    </Layout>
  );
};

export default InboxId;
