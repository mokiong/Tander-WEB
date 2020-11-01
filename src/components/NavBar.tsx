import React from "react";
import { Box, Link, Flex, Button, Image } from "@chakra-ui/core";
import { Link as ReactLink } from "react-router-dom";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

interface NavBarProps {
  isLoginPage?: Boolean;
}

export const NavBar: React.FC<NavBarProps> = ({ isLoginPage }) => {
  const { data, loading } = useMeQuery({
    skip: typeof window === "undefined",
  });
  const [logout, { loading: fetchingLogout }] = useLogoutMutation();

  let body = null;

  // loading
  if (loading) {
  } else if (!data?.me?.username) {
    body = (
      <>
        <ReactLink to={isLoginPage ? "/register" : "/login"}>
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
          >
            {isLoginPage ? "REGISTER" : "LOG IN"}
          </Button>
        </ReactLink>
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
            <Image src="/images/logo.png" alt="logo" maxH="50px" ml={4} />
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
