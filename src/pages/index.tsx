import { Button, Flex, Heading, Box } from "@chakra-ui/core";
import React from "react";
import { BackImage } from "../components/BackImage";
import { NavBar } from "../components/NavBar";
import { Wrapper } from "../components/Wrapper";
import { useHistory } from "react-router-dom";
import { useMeQuery } from "../generated/graphql";

const Index: React.FC = () => {
  const { data } = useMeQuery({
    skip: typeof window === "undefined",
  });
  const history = useHistory();

  if (data?.me?.username) {
    history.push("/home");
  }

  return (
    <BackImage imagePath={`url('/images/homePage.jpg')`}>
      <NavBar />
      <Wrapper variant="regular">
        <Flex w="100%" direction="column" p={5} textAlign="center" mt={20}>
          <Heading
            size="4xl"
            isTruncated
            font="san-serif"
            color="white"
            mt={20}
            mb={5}
          >
            Swipe Right
          </Heading>
          <Box>
            <Button
              mt={10}
              background="linear-gradient(to right, #FE3C72, rgb(231,86,56))"
              color="white"
              _hover={{
                bg: "linear-gradient(to right, rgb(231,86,56), #FE3C72)",
                color: "white",
              }}
              _active={{
                bg: "linear-gradient(to right, #FF655B , #FE3C72)",
                border: "none",
              }}
              borderRadius="25px"
              w="300px"
              h="55px"
              onClick={() => {
                history.push("/register");
              }}
            >
              CREATE ACCOUNT
            </Button>
          </Box>
        </Flex>
      </Wrapper>
    </BackImage>
  );
};

export default Index;
