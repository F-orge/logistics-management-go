import { Kysely } from "kysely";
import { DB } from "./db.types";
import { JWTExtendContextFields } from "@graphql-yoga/plugin-jwt";
import { PubSub } from "graphql-subscriptions";
import { Events } from "./events";

export interface GraphQLContext {
  db: Kysely<DB>;
  jwt?: JWTExtendContextFields;
  pubsub: PubSub<Events>;
}
