import { Box, IconButton, Icon, Flex, Heading, Button } from "@chakra-ui/core";
import React from "react";
import { BackImage } from "../components/BackImage";
import { NavBar } from "../components/NavBar";
import { Wrapper } from "../components/Wrapper";
import { Link as ReactLink } from "react-router-dom";

const Home: React.FC = () => {
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
          >
            Swipe Right
          </Heading>
          <ReactLink to="/register">
            <Button
              mt={15}
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
            >
              CREATE ACCOUNT
            </Button>
          </ReactLink>
        </Flex>
      </Wrapper>
    </BackImage>
  );
};

export default Home;
