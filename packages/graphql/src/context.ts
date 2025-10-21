import { Kysely } from "kysely";

export interface GraphQLContext {
  db: Kysely<any>;
}
