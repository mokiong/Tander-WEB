import React from "react";
import { Box, Link, Flex, Button, Image } from "@chakra-ui/core";
import { Link as ReactLink } from "react-router-dom";
import { MeQuery, useLogoutMutation, useMeQuery } from "../generated/graphql";
import { useApolloClient } from "@apollo/client";
import { useHistory } from "react-router-dom";

interface NavBarProps {
  isLoginPage?: Boolean;
}

export const NavBar: React.FC<NavBarProps> = ({ isLoginPage }) => {
  const [logout, { loading: fetchingLogout }] = useLogoutMutation();
  const apolloClient = useApolloClient();
  const history = useHistory();
  const { data, loading } = useMeQuery({
    skip: typeof window === "undefined",
  });

  let body = null;

  // loading
  if (loading) {
  } else if (!data?.me?.username) {
    body = (
      <>
        <Button
          mr={3}
          color="tinder.secondary"
          _hover={{
            bg: "linear-gradient(to bottom right, #FE3C72, #FF655B)",
            color: "white",
          }}
          _active={{
            bg: "white",
            border: "none",
          }}
          onClick={() => {
            isLoginPage ? history.push("/register") : history.push("/login");
          }}
        >
          {isLoginPage ? "REGISTER" : "LOG IN"}
        </Button>
      </>
    );
  } else {
    body = (
      <Flex align="center">
        <Box mr={4} color="tinder.secondary">
          {data.me.username}
        </Box>
        <Button
          onClick={async () => {
            await logout();
            await apolloClient.resetStore();
          }}
          isLoading={fetchingLogout}
          mr={3}
          color="tinder.secondary"
          _hover={{
            bg: "linear-gradient(to bottom right, #FE3C72, #FF655B)",
            color: "white",
          }}
          _active={{
            bg: "white",
            border: "none",
          }}
        >
          LOG OUT
        </Button>
      </Flex>
    );
  }
  return (
    <Flex zIndex={1} top={0} position="sticky" p={4} ml={"auto"} align="center">
      <Flex flex={1} m="auto" align="center" maxW="100%">
        <ReactLink to="/">
          <Flex direction="row" align="center">
            <Image
              src="/images/logo.png"
              maxH="50px"
              ml={4}
              ignoreFallback
              alt="logo"
            />
            <Box ml={"auto"} textStyle="logo" fontWeight="550">
              tander
            </Box>
          </Flex>
        </ReactLink>
        <Box ml={"auto"} mr={4}>
          {body}
        </Box>
      </Flex>
    </Flex>
  );
};
