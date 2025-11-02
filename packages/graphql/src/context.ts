import type { JWTExtendContextFields } from "@graphql-yoga/plugin-jwt";
import type { S3Client } from "bun";
import type { PubSub } from "graphql-subscriptions";
import type { Kysely } from "kysely";
import type { DB } from "./db.types";
import type { Events } from "./events";

export interface GraphQLContext {
	db: Kysely<DB>;
	jwt?: JWTExtendContextFields;
	pubsub: PubSub<Events>;
	minio: S3Client;
}
