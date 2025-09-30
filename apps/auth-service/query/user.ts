import type { Resolvers } from "../graphql/resolver-types";

export default {
  me: () => "" as any,
} satisfies Resolvers["Query"];
