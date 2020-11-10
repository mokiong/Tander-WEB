import { Flex, Box, Image, Button } from "@chakra-ui/core";
import React from "react";

interface InboxProps {}

export const Inbox: React.FC<InboxProps> = () => {
  const [matchOrMessage, changeMatchOrMessage] = React.useState<
    "matches" | "messages"
  >("matches");

  return (
    <Flex direction="column" w="40%" border="solid">
      <Flex bg="linear-gradient(to right, #FE3C72, #FF655B)" align="center">
        <Image
          mt={3}
          ml={3}
          mb={3}
          mr={2}
          src="/images/homepage.jpg"
          borderRadius="full"
          boxSize="35px"
          objectFit="cover"
          alt="profile picture"
          ignoreFallback
        />
        <Box mr="auto">My Profile</Box>
      </Flex>
      <Flex borderRight="1px" borderColor="grey">
        <Button
          bg="white"
          _hover={{
            bg: "white",
            borderBottom: "solid",
            borderColor: "#FE3C72",
          }}
          _focus={{
            outline: "solid",
            outlineColor: "#FE3C72",
          }}
          borderBottom={matchOrMessage === "matches" ? "solid" : ""}
          borderBottomColor={
            matchOrMessage === "matches" ? "tinder.secondary" : ""
          }
          borderRadius="0px"
          w="50%"
          textStyle="matchMessage"
          onClick={() => {
            changeMatchOrMessage("matches");
          }}
        >
          Matches
        </Button>
        <Button
          bg="white"
          _hover={{
            bg: "white",
            borderBottom: "solid",
            borderColor: "#FF655B",
          }}
          _focus={{
            outline: "solid",
            outlineColor: "#FF655B",
          }}
          borderBottom={matchOrMessage === "messages" ? "solid" : ""}
          borderBottomColor={
            matchOrMessage === "messages" ? "tinder.primary" : ""
          }
          borderRadius="0px"
          w="50%"
          textStyle="matchMessage"
          onClick={() => {
            changeMatchOrMessage("messages");
          }}
        >
          Messages
        </Button>
      </Flex>
      <Box h="350px" w="100%"></Box>
    </Flex>
  );
};
