import { Kysely } from "kysely";
import { DB } from "./db.types";

export interface GraphQLContext {
  db: Kysely<DB>;
}
