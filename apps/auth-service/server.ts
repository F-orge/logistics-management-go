import type { Resolvers } from "./graphql/resolver-types";
import { ApolloServer } from "apollo-server";

const typeDefs = await Bun.file(`${import.meta.dir}/graphql/schema.graphql`)
  .text();

const resolvers: Resolvers = {
  Query: {
    hello: () => "hello world",
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log(`Server ready at ${url}`));
