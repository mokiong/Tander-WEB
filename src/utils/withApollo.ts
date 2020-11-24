import {
  ApolloClient,
  createHttpLink,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import {
  getMainDefinition,
  offsetLimitPagination,
} from "@apollo/client/utilities";
import { Message } from "../generated/graphql";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true,
  },
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

export const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link,
    // headers: {
    //   cookie: (typeof window === 'undefined' ? ctx.req.headers.cookie : undefined) || ""
    // },
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            conversation: {
              keyArgs: ["receiverId"],
              merge(existing = [], incoming: any[], { args }) {
                return [...(existing || []), ...incoming];
              },
            },
          },
        },
      },
    }),
  });
};
