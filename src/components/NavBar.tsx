import React from "react";
import { Box, Link, Flex, Button, Heading } from "@chakra-ui/core";
import { Link as ReactLink } from "react-router-dom";
import { useMeQuery } from "../generated/graphql";
// import NextLink from "next/link";
// import { isServer } from '../utilities/isServer';
// import { useRouter } from 'next/router';
// import { useApolloClient } from '@apollo/client';

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  //    const router = useRouter();
  //    const apolloClient = useApolloClient();
  const { data, loading } = useMeQuery({
    skip: typeof window === "undefined",
  });
  let body = null;
  // loading
  if (loading) {
  } else if (!data?.me) {
    body = (
      <>
        <ReactLink to="/login">
          <Link mr={2}>login</Link>
        </ReactLink>
      </>
    );
  } else {
    body = (
      <Flex align="center">
        <Box mr={2}>{data.me.username}</Box>
        <Button onClick={async () => {}} variant="link">
          logout
        </Button>
      </Flex>
    );
  }
  return (
    <Flex
      zIndex={1}
      top={0}
      position="sticky"
      bg="tan"
      p={4}
      ml={"auto"}
      align="center"
      backgroundColor="rgba(0,0,0,0.5)"
    >
      <Flex flex={1} m="auto" align="center" maxW={800}>
        <Box ml={"auto"}>HEllos</Box>
      </Flex>
    </Flex>
  );
};
