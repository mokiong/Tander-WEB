import { Box, Button, Flex, Heading } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";
import { BackImage } from "../components/BackImage";
import { InputField } from "../components/inputField";
import { NavBar } from "../components/NavBar";
import { Wrapper } from "../components/Wrapper";
import { MeDocument, useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useImageRandomizer } from "../utils/useImageRandomizer";

interface registerProps {}

const Register: React.FC<registerProps> = () => {
  const history = useHistory();
  const [register] = useRegisterMutation();

  return (
    <BackImage
      imagePath={`url('/images/background${useImageRandomizer()}.jpg')`}
    >
      <NavBar />

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
            Create Account
          </Heading>
          <Box mt={4} paddingLeft="50px" paddingRight="50px">
            <Formik
              initialValues={{ email: "", password: "", username: "" }}
              onSubmit={async (values, { setErrors }) => {
                const response = await register({
                  variables: { ...values },
                  update: (cache, { data }) => {
                    cache.writeQuery({
                      query: MeDocument,
                      data: {
                        __typename: "Query",
                        me: data?.register.user,
                      },
                    });
                  },
                });

                if (response.data?.register.errors) {
                  setErrors(toErrorMap(response.data.register.errors));
                } else if (response.data?.register.user) {
                  history.push("/home");
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <InputField
                    name="username"
                    placeholder="username"
                    label="Username"
                  />
                  <InputField name="email" placeholder="email" label="Email" />
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
                      Register
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

export default Register;
