import { Box, Button, Flex, Heading } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";
import { BackImage } from "../components/BackImage";
import { InputField } from "../components/inputField";
import { NavBar } from "../components/NavBar";
import { Wrapper } from "../components/Wrapper";
import {
  MeDocument,
  useLoginMutation,
  useMeQuery,
  useConversationQuery,
} from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useImageRandomizer } from "../utils/useImageRandomizer";

interface loginProps {}

const Login: React.FC<loginProps> = () => {
  const history = useHistory();
  const [login] = useLoginMutation();
  const { data, loading } = useMeQuery({
    skip: typeof window === "undefined",
  });


    const { data: newData, loading: newLoad } = useConversationQuery({
      skip: !data,
      variables: {
        loggedUserId: data.me.id,
        receiverId: 10,
        limit: 2,
        cursor: null,
      },
      notifyOnNetworkStatusChange: true,
    });
  

  // if already logged in
  if (data?.me?.username) {
    history.push("/home");
  }

  return (
    <BackImage
      imagePath={`url('/images/background${useImageRandomizer()}.jpg')`}
    >
      <NavBar isLoginPage />

      <Wrapper variant="small">
        <Flex
          w="100%"
          direction="column"
          p={5}
          bg="white"
          textAlign="center"
          borderRadius="md"
        >
          <Heading as="h2" w="100%" color="tinder.secondary">
            Go Ahead
          </Heading>
          <Box mt={4} paddingLeft="50px" paddingRight="50px">
            <Formik
              initialValues={{ usernameOrEmail: "", password: "" }}
              onSubmit={async (values, { setErrors }) => {
                const response = await login({
                  variables: { ...values },
                  update: (cache, { data }) => {
                    cache.writeQuery({
                      query: MeDocument,
                      data: {
                        __typename: "Query",
                        me: data?.login.user,
                      },
                    });
                  },
                });

                if (response.data?.login.errors) {
                  setErrors(toErrorMap(response.data.login.errors));
                } else if (response.data?.login.user) {
                  history.push("/home");
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <InputField
                    name="usernameOrEmail"
                    placeholder="username or email"
                    label="Username or Email"
                  />
                  <Box mt={4}>
                    <InputField
                      name="password"
                      placeholder="password"
                      label="Password"
                      type="password"
                    />
                  </Box>
                  <Box alignContent="center">
                    <Button
                      mt={4}
                      isLoading={isSubmitting}
                      type="submit"
                      background="linear-gradient(to bottom right, #FE3C72, #FF655B)"
                      color="white"
                      _hover={{
                        bg:
                          "linear-gradient(to bottom right, #FF655B , #FE3C72)",
                        color: "white",
                      }}
                      _active={{
                        bg:
                          "linear-gradient(to bottom right, #FF655B , #FE3C72)",
                        border: "none",
                      }}
                    >
                      login
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Flex>
      </Wrapper>
    </BackImage>
  );
};

export default Login;
