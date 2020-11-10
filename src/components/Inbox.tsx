import { Flex, Box, Image, Button, Stack } from "@chakra-ui/core";
import React from "react";
import { useConversationQuery } from "../generated/graphql";
import { useHistory } from "react-router-dom";

interface InboxProps {}

export const Inbox: React.FC<InboxProps> = () => {
  const [matchOrMessage, changeMatchOrMessage] = React.useState<
    "matches" | "messages"
  >("matches");

  const history = useHistory();
  const { data, loading } = useConversationQuery();

  let body;

  if (!data) {
    body = <Box></Box>;
  } else if (!data && loading) {
    <div>loading...</div>;
  } else {
    body = (
      <Box overflowY="scroll" h="100%">
        <Stack spacing={0}>
          {data!.conversation.map((message) =>
            !message ? null : (
              <Flex
                as={Button}
                align="center"
                direction="row"
                onClick={() => {
                  history.push(`/home/message/${message.receiver.id}`);
                }}
              >
                <Image
                  mt={3}
                  ml={3}
                  mb={3}
                  mr={5}
                  src="/images/homepage.jpg"
                  borderRadius="full"
                  boxSize="65px"
                  objectFit="cover"
                  alt="profile picture"
                  ignoreFallback
                />
                <Flex mr="auto" direction="column">
                  <Box mb={3} font="san-serif" fontWeight="bold">
                    {message.receiver.username}
                  </Box>
                  <Box color="grey" font="san-serif" fontSize="12px">
                    {message.text}
                  </Box>
                </Flex>
              </Flex>
            )
          )}
        </Stack>
      </Box>
    );
  }

  return (
    <Flex direction="column" w="40%" h="100vh">
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
      <Flex>
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
      {body}
    </Flex>
  );
};
