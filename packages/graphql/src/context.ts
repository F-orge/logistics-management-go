import { Kysely } from "kysely";
import { DB } from "./db.types";
import { JWTExtendContextFields } from "@graphql-yoga/plugin-jwt";

export interface GraphQLContext {
  db: Kysely<DB>;
  jwt?: JWTExtendContextFields;
}
