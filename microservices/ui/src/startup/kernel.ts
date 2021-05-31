import { Kernel } from "@kaviar/core";
import { XUIBundle } from "@kaviar/x-ui";
import { UIAppBundle } from "../bundles/UIAppBundle/UIAppBundle";

// All UI bundles need to be prefixed with UI
// All X-Framework bundles have the first prefix X
export const kernel = new Kernel({
  bundles: [
    new XUIBundle({
      graphql: {
        // ApolloClient Options
        // https://www.apollographql.com/docs/react/api/core/ApolloClient/#ApolloClientOptions
        uri: process.env.REACT_APP_GRAPHQL_URI,
      },
    }),
    new UIAppBundle(),
  ],
});
