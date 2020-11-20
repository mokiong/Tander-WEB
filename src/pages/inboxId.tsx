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
} from "../generated/graphql";
import { isMySubscriptions } from "../utils/isRightConvo";
import { capitalizer } from "../utils/useCapitalizer";

interface inboxIdProps {}

const InboxId: React.FC<inboxIdProps> = () => {
  const { id: paramId } = useParams<{ id: string }>();

  const [paramState, setParamState] = React.useState(paramId);

  const { data: meData } = useMeQuery({
    skip: typeof window === "undefined",
  });
  const { data, loading } = useConversationQuery({
    variables: {
      receiverId: parseInt(paramId),
    },
  });
  const [message, { error }] = useMessageMutation();
  const {
    data: newMessageData,
    error: newMessageError,
    loading: newMessageLoading,
  } = useNewMessageSubscription();

  const [newMessage, setNewMessage] = React.useState<NewMessageSubscription>(
    undefined
  );
  const [newMessagesArray, setNewMessagesArray] = React.useState<
    NewMessageSubscription[]
  >([]);

  // check wether subscriptions is yours
  // and the person youre having a chat with
  const isMySubscriptions = () => {
    if (
      newMessageData?.newMessage.user.id === meData?.me.id &&
      newMessageData?.newMessage.receiverId === parseInt(paramId)
    ) {
      return true;
    } else if (
      newMessageData?.newMessage.user.id === parseInt(paramId) &&
      newMessageData?.newMessage.receiverId === meData?.me.id
    ) {
      return true;
    } else {
      return false;
    }
  };

  // mount subscription data to state
  // update subsciption array
  React.useEffect(() => {
    if (!newMessageLoading && newMessageData) {
      setNewMessage(newMessageData);
      setNewMessagesArray([...newMessagesArray, newMessageData]);
    }
  }, [newMessageLoading, newMessageData]);

  React.useEffect(() => {
    if (paramState !== paramId) {
      setParamState(paramId);
      setNewMessagesArray([]);
      setNewMessage(undefined);
    }
  }, [paramState]);

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
              <Stack spacing={0}>
                {!data && loading ? (
                  <div>loading</div>
                ) : (
                  <Box>
                    {data?.conversation.map((message) =>
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
                    {/* {!isMySubscriptions(
                      meData?.me.id,
                      newMessageData?.newMessage.user.id,
                      parseInt(paramId),
                      newMessageData?.newMessage.receiverId
                    ) */}
                    {!isMySubscriptions()
                      ? null
                      : newMessagesArray.map((element) =>
                          !element ? null : (
                            <Flex
                              direction="row"
                              key={`${element.newMessage.id}-subscrip`}
                            >
                              {element.newMessage.user.id === meData?.me.id ? (
                                <Box ml="auto">
                                  <Box>
                                    {capitalizer(
                                      element.newMessage.user.username
                                    )}
                                  </Box>
                                  <Box>{element.newMessage.text}</Box>
                                </Box>
                              ) : (
                                <Box mr="auto">
                                  <Box>
                                    {capitalizer(
                                      element.newMessage.user.username
                                    )}
                                  </Box>
                                  <Box>{element.newMessage.text}</Box>
                                </Box>
                              )}
                            </Flex>
                          )
                        )}
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
