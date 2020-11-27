import { Flex, Box, Image, Button, Stack, Link } from "@chakra-ui/core";
import React from "react";
import {
  useUserQuery,
  useLatestMessageSubscription,
} from "../generated/graphql";
import { useHistory } from "react-router-dom";
import { capitalizer } from "../utils/useCapitalizer";

interface InboxProps {}

export const Inbox: React.FC<InboxProps> = () => {
  const history = useHistory();

  const [matchOrMessage, changeMatchOrMessage] = React.useState<
    "matches" | "messages"
  >("matches");

  const { data, loading } = useUserQuery({
    notifyOnNetworkStatusChange: true,
  });

  // const {
  //   data: lastMessageData,
  //   loading: lastMessageLoading,
  // } = useLatestMessageSubscription();

  // mount subscription data to state
  // update subsciption array
  // React.useEffect(() => {
  //   if (!newMessageLoading && newMessageData) {
  //     setNewMessage(newMessageData);
  //     setNewMessagesArray([...newMessagesArray, newMessageData]);
  //   }
  // }, [newMessageLoading, newMessageData]);
  let body;
  if (!data && loading) {
    body = <div>loading...</div>;
  } else if (!data) {
    body = <Box></Box>;
  } else {
    body = (
      <Box overflowY="scroll" h="100%" overflowX="hidden">
        <Stack spacing={0}>
          {data!.user.inbox?.map((match) =>
            !match ? null : (
              <Flex
                as={Link}
                _hover={{
                  bg: "tinder.secondaryBg",
                  textDecoration: "none",
                }}
                key={`${match.id}-match`}
                align="center"
                direction="row"
                onClick={() => {
                  history.push(`/home/message/${data.user.id}/${match.id}`);
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
                    {capitalizer(match.username)}
                  </Box>
                  <Box color="grey" font="san-serif" fontSize="12px">
                    {match.latestMessage}
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
    <Flex direction="column" w="40%" h="100%" maxH="100vh">
      <Flex
        bg="linear-gradient(to right, #FE3C72, #FF655B)"
        align="center"
        w="100%"
      >
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
            borderColor: "tinder.primary",
          }}
          _focus={{
            outline: "solid",
            outlineColor: "tinder.secondary",
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
