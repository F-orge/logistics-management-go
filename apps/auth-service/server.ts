import { db } from "./db";
import type { Resolvers as GraphqlResolver } from "./graphql/resolver-types";
import { ApolloServer } from "apollo-server";

export type Resolvers = GraphqlResolver<{ db: typeof db }>;

const typeDefs = await Bun.file(`${import.meta.dir}/graphql/schema.graphql`)
  .text();

const resolvers: Resolvers = {
  Query: {
    hello: () => "hello world",
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return { db };
  },
});

server.listen().then(({ url }) => console.log(`Server ready at ${url}`));
