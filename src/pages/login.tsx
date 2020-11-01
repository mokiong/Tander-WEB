import { Center, Flex, Heading, Box, Button } from "@chakra-ui/core";
import { Formik, Form } from "formik";
import React from "react";
import { InputField } from "../components/inputField";
import { Wrapper } from "../components/Wrapper";
import { useLoginMutation, useMeQuery } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useHistory } from "react-router-dom";
import { BackImage } from "../components/BackImage";
import { NavBar } from "../components/NavBar";
import { generator } from "random-number";

interface loginProps {}

const Login: React.FC<loginProps> = () => {
  const history = useHistory();
  const [login] = useLoginMutation();
  const { data, loading } = useMeQuery({
    skip: typeof window === "undefined",
  });

  const gen = generator({
    min: 1,
    max: 3,
    integer: true,
  });

  // if already logged in
  if (data?.me?.username) {
    history.push("/");
  }

  return (
    <BackImage imagePath={`url('/images/background${gen()}.jpg')`}>
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
            GO AHEAD
          </Heading>
          <Box mt={4} paddingLeft="50px" paddingRight="50px">
            <Formik
              initialValues={{ usernameOrEmail: "", password: "" }}
              onSubmit={async (values, { setErrors }) => {
                const response = await login({
                  variables: { ...values },
                });

                if (response.data?.login.errors) {
                  setErrors(toErrorMap(response.data.login.errors));
                } else if (response.data?.login.user) {
                  history.push("/");
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
