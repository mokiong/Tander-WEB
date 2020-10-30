import { Center, Flex, Heading, Box, Button } from "@chakra-ui/core";
import { Formik, Form } from "formik";
import React from "react";
import { InputField } from "../components/inputField";
import { Wrapper } from "../components/Wrapper";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useHistory } from "react-router-dom";
import { BackImage } from "../components/BackImage";
import { NavBar } from "../components/NavBar";

interface loginProps {}

const Login: React.FC<loginProps> = ({}) => {
  const history = useHistory();
  const [login] = useLoginMutation();

  return (
    <BackImage imagePath="url('/images/background3.jpg')">
      <NavBar />
      <Wrapper variant="small">
        <Center p={4} bg="white" textAlign="center">
          <Flex w="100%" direction="column">
            <Heading
              as="h1"
              size="2xl"
              w="100%"
              fontFamily="tinder.logo"
              color="tinder.primary"
            >
              tander
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
                    <Center>
                      <Button
                        mt={4}
                        isLoading={isSubmitting}
                        type="submit"
                        background="custom.primary"
                        color="custom.bg"
                      >
                        login
                      </Button>
                    </Center>
                  </Form>
                )}
              </Formik>
            </Box>
          </Flex>
        </Center>
      </Wrapper>
    </BackImage>
  );
};

export default Login;
