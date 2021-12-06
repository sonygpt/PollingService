import { ApolloClient, InMemoryCache } from "@apollo/client";
import { useQuery } from "@apollo/client";

class PollingService {
  pollingData = (url, query, variables, pollInterval, onCompleted, onError) => {
    const client = new ApolloClient({
      cache: new InMemoryCache(),
      uri: url, //http://localhost:3001/graphql
    });

    const { data, loading, error, startPolling, stopPolling } = useQuery(
      query,
      {
        client: client,
        variables: variables,
        notifyOnNetworkStatusChange: true,
        pollInterval: pollInterval || 0,
        onCompleted: onCompleted,
        onError: onError,
      }
    );

    return { data, loading, error, startPolling, stopPolling };
  };
}

const __PollingService = new PollingService();
(window).__PollingService = __PollingService;
export { __PollingService };

//window.pollingService = __PollingService;
