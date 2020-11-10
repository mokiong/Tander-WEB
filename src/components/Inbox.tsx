import { Flex, Box, Image, Button, Stack } from "@chakra-ui/core";
import React from "react";
import { useGetMessagesQuery } from "../generated/graphql";

interface InboxProps {}

export const Inbox: React.FC<InboxProps> = () => {
  const [matchOrMessage, changeMatchOrMessage] = React.useState<
    "matches" | "messages"
  >("matches");

  const { data, loading } = useGetMessagesQuery();

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
      {!data && loading ? (
        <div>loading...</div>
      ) : (
        <Box overflowY="scroll" h="100%">
          <Stack spacing={0}>
            {/* {data!.getAllMessage.map((message) =>
              !message ? null : (
                <Flex align="center" direction="row">
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
                      {message.matchUsername}
                    </Box>
                    <Box color="grey" font="san-serif" fontSize="12px">
                      {message.text}
                    </Box>
                  </Flex>
                </Flex>
              )
            )} */}
            <Box>Hi</Box>
          </Stack>
        </Box>
      )}
    </Flex>
  );
};
