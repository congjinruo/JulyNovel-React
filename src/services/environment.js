import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';
import RelayQueryResponseCache from 'relay-runtime/lib/RelayQueryResponseCache';
const twelveMinute = 720 * 1000;
const cache = new RelayQueryResponseCache({ size: 250, ttl: twelveMinute });
// Define a function that fetches the results of an operation (query/mutation/etc)
// and returns its results as a Promise:
function fetchQuery(
  operation,
  variables,
  cacheConfig,
  uploadables,
) {
  const queryID = operation.text;
  const isMutation = operation.operationKind === 'mutation';
  const isQuery = operation.operationKind === 'query';
  const forceFetch = cacheConfig && cacheConfig.force;
// Try to get data from cache on queries
 const fromCache = cache.get(queryID, variables);
if (
  isQuery &&
  fromCache !== null &&
  !forceFetch
) {
  console.log('fromCache');
  return fromCache;
}
  return fetch('https://api.kuaijiajin.club:4433/graphql', {
    method: 'POST',
    headers: {
      // Add authentication and other headers here
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      query: operation.text, // GraphQL text from input
      variables,
    }),
  }).then(response => {
    return response.json();
  }).then(json => {
    // Update cache on queries
    if (isQuery && json) {
      cache.set(queryID, variables, json);
    }
    // Clear cache on mutations
    if (isMutation) {
      cache.clear();
    }

    return json;
  });
}

// Create a network layer from the fetch function
const network = Network.create(fetchQuery);
const store = new Store(new RecordSource())

const environment = new Environment({
  network,
  store
  // ... other options
});

export default environment;