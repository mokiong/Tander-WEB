import {
  Flex,
  Box,
  Image,
  Stack,
  Button,
  InputRightElement,
  InputGroup,
  Input,
  FormControl
} from "@chakra-ui/core";
import { Form, Formik } from "formik";
import React from "react";
import { useParams } from "react-router-dom";
import { Inbox } from "../components/Inbox";
import { InputField } from "../components/inputField";
import { Layout } from "../components/Layout";
import {
  useMeQuery,
  useConversationQuery,
  useMessageMutation
} from "../generated/graphql";

interface inboxIdProps {}

const InboxId: React.FC<inboxIdProps> = () => {
  const { id: paramId } = useParams<{ id: string }>();

  const { data: meData } = useMeQuery({
    skip: typeof window === "undefined"
  });
  const { data, loading } = useConversationQuery({
    variables: {
      receiverId: parseInt(paramId)
    }
  });
  const [message] = useMessageMutation();

  let body;

  if (!data) {
  }

  return (
    <Layout inputBgColor="white">
      <Flex direction="row">
        <Inbox />
        <Box w="60%" direction="column" bg="#f2f2f2" minH="100vh">
          <Flex direction="column" h="100%">
            <Box h="80%" overflowY="scroll">
              {!data && loading ? (
                <div>loading</div>
              ) : (
                <Stack spacing={0}>
                  {data.conversation.map(message =>
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
            <Box h="20%" align="center" p={5}>
              <Formik
                initialValues={{ message: "" }}
                onSubmit={async values => {
                  await message({
                    variables: {
                      message: values.message,
                      userId: parseInt(paramId)
                    }
                  });
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <InputGroup size="lg">
                      <InputField
                        pr="7rem"
                        placeholder="Type a message..."
                        name="message"
                        label=""
                        _focus={{
                          boxShadow: "0 0 0 1pt #FE3C72"
                        }}
                        size="lg"
                      />
                      <InputRightElement width="7rem">
                        <Button
                          h="2rem"
                          size="sm"
                          w="100%"
                          isLoading={isSubmitting}
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
