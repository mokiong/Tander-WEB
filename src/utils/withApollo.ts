import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

export const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: createHttpLink({
      uri: "http://localhost:4000/graphql",
      // home test
      // "http://192.168.254.110:4000/graphql",
      credentials: "include"
    }),
    // headers: {
    //   cookie: (typeof window === 'undefined' ? ctx.req.headers.cookie : undefined) || ""
    // },
    cache: new InMemoryCache()
  });
};
