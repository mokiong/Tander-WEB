import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

export const createApolloClient = () => {
  console.log(process.env.NEXT_PUBLIC_API_URL);
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: createHttpLink({
      uri: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/graphql",
      credentials: "include",
    }),
    // headers: {
    //   cookie: (typeof window === 'undefined' ? ctx.req.headers.cookie : undefined) || ""
    // },
    cache: new InMemoryCache(),
  });
};
