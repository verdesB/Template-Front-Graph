import {
  ApolloClient, InMemoryCache, makeVar, NormalizedCacheObject,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { createUploadLink } from 'apollo-upload-client'

let client: ApolloClient<NormalizedCacheObject> | null = null;
let cachedToken: null | string = null;

export const userConnected = makeVar<any|null>(null);
export const loggedIn = makeVar<boolean>(false);

export const getApolloClient = (token?: string | null, forceNewClient = false): ApolloClient<NormalizedCacheObject>|null => {
  if (client && !forceNewClient && (token === null || token === cachedToken)) {
    return client;
  }

  if (token) {
    cachedToken = token;
  }

  if (client && forceNewClient) {
    client?.stop();
    client = null;
  }

  const cache = new InMemoryCache({
    addTypename: false,
    typePolicies: {
      Query: {
        fields: {
          project: {
            merge: true,
          },
          userConnected: {
            read() {
              return userConnected();
            },
          },
          loggedIn: {
            read() {
              return loggedIn();
            },
          },
        },
      },
    },
  });

  const authLink = setContext(async (_, { headers }) => {
    console.log('auth link', localStorage.getItem('website-manager-app:bearer-token'));
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${ localStorage.getItem('website-manager-app:bearer-token') }`,
      },
    }
  });

  client = new ApolloClient({
    cache,
    name: 'apollo-client',
    version: '1.3',
    link: authLink.concat(createUploadLink({
      uri: import.meta.env.VITE_API_BASE_GRAPHQL_URL,
      headers: {
        authorization: `Bearer ${token}`,
      },
    })),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'network-only',
      },
      query: {
        fetchPolicy: 'network-only',
      },
      mutate: {
        fetchPolicy: 'no-cache',
      },
    },
  });

  return client
}
