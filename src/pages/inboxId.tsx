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
} from "../generated/graphql";

interface inboxIdProps {}

const InboxId: React.FC<inboxIdProps> = () => {
  const { id: paramId } = useParams<{ id: string }>();

  const { data: meData } = useMeQuery({
    skip: typeof window === "undefined",
  });
  const { data, loading } = useConversationQuery({
    variables: {
      receiverId: parseInt(paramId),
    },
  });
  const [message, { error }] = useMessageMutation();

  let body;

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
              {!data && loading ? (
                <div>loading</div>
              ) : (
                <Stack spacing={0}>
                  {data.conversation.map((message) =>
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
                </Stack>
              )}
            </Box>
            <Box h="25%" align="center" p={5}>
              <Formik
                initialValues={{ message: "" }}
                onSubmit={async (values) => {
                  console.log(values);
                  await message({
                    variables: {
                      message: values.message,
                      userId: parseInt(paramId),
                    },
                  });
                }}
              >
                {({ isSubmitting }) => (
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
                          isLoading={isSubmitting}
                          mt={5}
                          mr={3}
                          h="2rem"
                          size="sm"
                          w="100%"
                          type="submit"
                          background="tinder.secondary"
                          color="white"
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
