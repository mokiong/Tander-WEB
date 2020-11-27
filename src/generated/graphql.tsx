import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  me: Me;
  users: Array<User>;
  user: User;
  getAllMatches: Array<Match>;
  conversation: Array<Message>;
  getAllMessage: Array<Message>;
};


export type QueryConversationArgs = {
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
  receiverId: Scalars['Int'];
  loggedUserId: Scalars['Int'];
};

export type Me = {
  __typename?: 'Me';
  username?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Float']>;
  email?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  username: Scalars['String'];
  email: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  inbox: Array<InboxOutput>;
};

export type InboxOutput = {
  __typename?: 'InboxOutput';
  id: Scalars['Float'];
  username: Scalars['String'];
  latestMessage?: Maybe<Scalars['String']>;
};

export type Match = {
  __typename?: 'Match';
  id: Scalars['Float'];
  userResponse1: Scalars['Float'];
  userResponse2: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  user1: User;
  user2: User;
};

export type Message = {
  __typename?: 'Message';
  id: Scalars['Float'];
  text: Scalars['String'];
  userId: Scalars['Float'];
  receiverId: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  user: User;
  receiver: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  logout: Scalars['Boolean'];
  login: UserResponse;
  register: UserResponse;
  match: MatchOutput;
  message: Scalars['Boolean'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationRegisterArgs = {
  args: UserInput;
};


export type MutationMatchArgs = {
  matchUserId: Scalars['Int'];
};


export type MutationMessageArgs = {
  userId: Scalars['Int'];
  message: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type UserInput = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type MatchOutput = {
  __typename?: 'MatchOutput';
  error?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  latestMessage: InboxOutput;
  newMessage: Message;
};


export type SubscriptionNewMessageArgs = {
  receiverId: Scalars['Int'];
  loggedUserId: Scalars['Int'];
};

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'email'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'message' | 'field'>
    )>> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type MessageMutationVariables = Exact<{
  message: Scalars['String'];
  userId: Scalars['Int'];
}>;


export type MessageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'message'>
);

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type ConversationQueryVariables = Exact<{
  loggedUserId: Scalars['Int'];
  limit: Scalars['Int'];
  receiverId: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type ConversationQuery = (
  { __typename?: 'Query' }
  & { conversation: Array<(
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'text' | 'createdAt'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ), receiver: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ) }
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'Me' }
    & Pick<Me, 'id' | 'username'>
  ) }
);

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
    & { inbox: Array<(
      { __typename?: 'InboxOutput' }
      & Pick<InboxOutput, 'id' | 'username' | 'latestMessage'>
    )> }
  ) }
);

export type LatestMessageSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type LatestMessageSubscription = (
  { __typename?: 'Subscription' }
  & { latestMessage: (
    { __typename?: 'InboxOutput' }
    & Pick<InboxOutput, 'username' | 'id' | 'latestMessage'>
  ) }
);

export type NewMessageSubscriptionVariables = Exact<{
  loggedUserId: Scalars['Int'];
  receiverId: Scalars['Int'];
}>;


export type NewMessageSubscription = (
  { __typename?: 'Subscription' }
  & { newMessage: (
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'text' | 'createdAt'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ), receiver: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ) }
  ) }
);


export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    user {
      id
      username
      email
    }
    errors {
      message
      field
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MessageDocument = gql`
    mutation Message($message: String!, $userId: Int!) {
  message(userId: $userId, message: $message)
}
    `;
export type MessageMutationFn = Apollo.MutationFunction<MessageMutation, MessageMutationVariables>;

/**
 * __useMessageMutation__
 *
 * To run a mutation, you first call `useMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [messageMutation, { data, loading, error }] = useMessageMutation({
 *   variables: {
 *      message: // value for 'message'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useMessageMutation(baseOptions?: Apollo.MutationHookOptions<MessageMutation, MessageMutationVariables>) {
        return Apollo.useMutation<MessageMutation, MessageMutationVariables>(MessageDocument, baseOptions);
      }
export type MessageMutationHookResult = ReturnType<typeof useMessageMutation>;
export type MessageMutationResult = Apollo.MutationResult<MessageMutation>;
export type MessageMutationOptions = Apollo.BaseMutationOptions<MessageMutation, MessageMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($username: String!, $email: String!, $password: String!) {
  register(args: {email: $email, username: $username, password: $password}) {
    user {
      id
      username
    }
    errors {
      field
      message
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const ConversationDocument = gql`
    query Conversation($loggedUserId: Int!, $limit: Int!, $receiverId: Int!, $cursor: String) {
  conversation(
    loggedUserId: $loggedUserId
    limit: $limit
    receiverId: $receiverId
    cursor: $cursor
  ) {
    id
    text
    user {
      id
      username
    }
    receiver {
      id
      username
    }
    createdAt
  }
}
    `;

/**
 * __useConversationQuery__
 *
 * To run a query within a React component, call `useConversationQuery` and pass it any options that fit your needs.
 * When your component renders, `useConversationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConversationQuery({
 *   variables: {
 *      loggedUserId: // value for 'loggedUserId'
 *      limit: // value for 'limit'
 *      receiverId: // value for 'receiverId'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useConversationQuery(baseOptions?: Apollo.QueryHookOptions<ConversationQuery, ConversationQueryVariables>) {
        return Apollo.useQuery<ConversationQuery, ConversationQueryVariables>(ConversationDocument, baseOptions);
      }
export function useConversationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ConversationQuery, ConversationQueryVariables>) {
          return Apollo.useLazyQuery<ConversationQuery, ConversationQueryVariables>(ConversationDocument, baseOptions);
        }
export type ConversationQueryHookResult = ReturnType<typeof useConversationQuery>;
export type ConversationLazyQueryHookResult = ReturnType<typeof useConversationLazyQuery>;
export type ConversationQueryResult = Apollo.QueryResult<ConversationQuery, ConversationQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    username
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const UserDocument = gql`
    query User {
  user {
    id
    username
    inbox {
      id
      username
      latestMessage
    }
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserQuery(baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const LatestMessageDocument = gql`
    subscription LatestMessage {
  latestMessage {
    username
    id
    latestMessage
  }
}
    `;

/**
 * __useLatestMessageSubscription__
 *
 * To run a query within a React component, call `useLatestMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useLatestMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLatestMessageSubscription({
 *   variables: {
 *   },
 * });
 */
export function useLatestMessageSubscription(baseOptions?: Apollo.SubscriptionHookOptions<LatestMessageSubscription, LatestMessageSubscriptionVariables>) {
        return Apollo.useSubscription<LatestMessageSubscription, LatestMessageSubscriptionVariables>(LatestMessageDocument, baseOptions);
      }
export type LatestMessageSubscriptionHookResult = ReturnType<typeof useLatestMessageSubscription>;
export type LatestMessageSubscriptionResult = Apollo.SubscriptionResult<LatestMessageSubscription>;
export const NewMessageDocument = gql`
    subscription NewMessage($loggedUserId: Int!, $receiverId: Int!) {
  newMessage(loggedUserId: $loggedUserId, receiverId: $receiverId) {
    id
    text
    user {
      id
      username
    }
    receiver {
      id
      username
    }
    createdAt
  }
}
    `;

/**
 * __useNewMessageSubscription__
 *
 * To run a query within a React component, call `useNewMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewMessageSubscription({
 *   variables: {
 *      loggedUserId: // value for 'loggedUserId'
 *      receiverId: // value for 'receiverId'
 *   },
 * });
 */
export function useNewMessageSubscription(baseOptions?: Apollo.SubscriptionHookOptions<NewMessageSubscription, NewMessageSubscriptionVariables>) {
        return Apollo.useSubscription<NewMessageSubscription, NewMessageSubscriptionVariables>(NewMessageDocument, baseOptions);
      }
export type NewMessageSubscriptionHookResult = ReturnType<typeof useNewMessageSubscription>;
export type NewMessageSubscriptionResult = Apollo.SubscriptionResult<NewMessageSubscription>;