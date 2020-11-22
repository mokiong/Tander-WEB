import { useQuery } from "@apollo/client";
import {
  Flex,
  Box,
  Image,
  Stack,
  Button,
  InputRightElement,
  InputGroup,
  Input,
  FormControl,
  Textarea,
  FormLabel,
} from "@chakra-ui/core";
import { Field, Form, Formik } from "formik";
import { NoUndefinedVariablesRule } from "graphql";
import React from "react";
import { useParams } from "react-router-dom";
import { Inbox } from "../components/Inbox";
import { InputField } from "../components/inputField";
import { InputTextArea } from "../components/InputTextArea";
import { Layout } from "../components/Layout";
import {
  useMeQuery,
  useConversationQuery,
  useMessageMutation,
  useNewMessageSubscription,
  NewMessageSubscription,
  ConversationDocument,
} from "../generated/graphql";
import { isMySubscriptions } from "../utils/isRightConvo";
import { capitalizer } from "../utils/useCapitalizer";

interface inboxIdProps {}

const InboxId: React.FC<inboxIdProps> = () => {
  const { id: paramId } = useParams<{ id: string }>();

  const { data: meData } = useMeQuery({
    skip: typeof window === "undefined",
  });
  const { data, loading, fetchMore, variables } = useConversationQuery({
    variables: {
      receiverId: parseInt(paramId),
      limit: 2,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });
  const [message] = useMessageMutation({
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: ConversationDocument,
        variables: {
          receiverId: parseInt(paramId),
          limit: 1,
          cursor: null,
        },
      },
    ],
  });
  const {
    data: newMessageData,
    loading: newMessageLoading,
  } = useNewMessageSubscription();

  // React.useEffect(() => {
  //   console.log("use effect rendering");
  //   if (newMessageData) {
  //     console.log("renderinggggg");
  //     fetchMore({
  //       variables: {
  //         receiverId: variables?.receiverId,
  //         limit: 1,
  //         cursor: null,
  //       },
  //     });
  //   }
  // }, [newMessageData]);

  if (!data) {
  }

  return (
    <Layout inputBgColor="white">
      <Flex direction="row" maxH="100vh" h="100vh">
        <Inbox />
        <Box
          w="60%"
          direction="column"
          bg="#f2f2f2"
          h="100%"
          borderLeft="2px"
          borderColor="#C0C0C0"
        >
          <Flex direction="column" maxH="100vh" h="100%">
            <Box h="75%" overflowY="scroll" overflowX="hidden">
              <Box>
                <Button
                  onClick={() => {
                    fetchMore({
                      variables: {
                        receiverId: variables?.receiverId,
                        limit: variables?.limit,
                        cursor:
                          data?.conversation[data?.conversation.length - 1]
                            .createdAt,
                      },
                    });
                  }}
                >
                  load more
                </Button>
              </Box>
              <Stack spacing={0}>
                {!data && loading ? (
                  <div>loading</div>
                ) : (
                  <Box>
                    {data?.conversation
                      .slice(0)
                      .reverse()
                      .map((message) =>
                        !message ? null : (
                          <Flex direction="row" key={message.id}>
                            {message.user.id === meData?.me.id ? (
                              <Box ml="auto">
                                <Box>{message.user.username}</Box>
                                <Box>{message.text}</Box>
                              </Box>
                            ) : (
                              <Box mr="auto">
                                <Box>{message.user.username}</Box>
                                <Box>{message.text}</Box>
                              </Box>
                            )}
                          </Flex>
                        )
                      )}
                  </Box>
                )}
                {!newMessageData && newMessageLoading ? null : (
                  <Box>
                    <Flex
                      direction="row"
                      key={`${newMessageData.newMessage.id}-subscrip`}
                    >
                      {newMessageData.newMessage.user.id === meData?.me.id ? (
                        <Box ml="auto">
                          <Box>
                            {capitalizer(
                              newMessageData.newMessage.user.username
                            )}
                          </Box>
                          <Box>{newMessageData.newMessage.text}</Box>
                        </Box>
                      ) : (
                        <Box mr="auto">
                          <Box>
                            {capitalizer(
                              newMessageData.newMessage.user.username
                            )}
                          </Box>
                          <Box>{newMessageData.newMessage.text}</Box>
                        </Box>
                      )}
                    </Flex>
                  </Box>
                )}
              </Stack>
            </Box>
            <Box h="25%" align="center" p={5}>
              <Formik
                initialValues={{ message: "" }}
                onSubmit={async (values, { resetForm }) => {
                  await message({
                    variables: {
                      message: values.message,
                      userId: parseInt(paramId),
                    },
                  });

                  // await fetchMore({
                  //   variables: {
                  //     receiverId: variables?.receiverId,
                  //     limit: 1,
                  //     cursor: data?.conversation[0].createdAt,
                  //   },
                  // });
                  resetForm({
                    values: {
                      message: "",
                    },
                  });
                }}
              >
                {() => (
                  <Form>
                    <InputGroup size="lg">
                      <InputTextArea
                        pr="6rem"
                        placeholder="Type a message..."
                        name="message"
                        _focus={{
                          boxShadow: "0 0 0 1pt #FE3C72",
                        }}
                      />
                      <InputRightElement width="7rem">
                        <Button
                          mt={5}
                          mr={3}
                          h="2rem"
                          size="sm"
                          w="100%"
                          type="submit"
                          background="tinder.secondary"
                          color="white"
                          _hover={{
                            bg: "tinder.secondary",
                          }}
                        >
                          Send
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </Form>
                )}
              </Formik>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Layout>
  );
};

export default InboxId;
