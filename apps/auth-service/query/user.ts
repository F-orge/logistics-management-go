import type { Resolvers } from "../graphql/resolver-types";
import { userResolver } from "../models/user";

export default {
  me: async (_parent, _args, _context, _info) => {
    return userResolver({ name: "" } as any);
  },
} as Resolvers["Query"];
