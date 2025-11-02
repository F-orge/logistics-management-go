import {
	createInlineSigningKeyProvider,
	extractFromHeader,
	useJWT,
} from "@graphql-yoga/plugin-jwt";
import { createSchema, createYoga, useReadinessCheck } from "graphql-yoga";
import type { Pool } from "pg";
import { resolvers } from "./schema/resolvers.generated";
import { typeDefs } from "./schema/typeDefs.generated";

/**
 * Configuration for creating a GraphQL Yoga instance
 */
export interface GraphQLYogaConfig {
	pool: Pool;
	jwtSigningKey: string;
	jwtIssuer: string;
	jwtAudience: string;
	environment?: "development" | "production";
	graphqlEndpoint?: string;
	healthCheckEndpoint?: string;
	enableJWT: boolean;
}

/**
 * Create a configured GraphQL Yoga instance
 * @param config - Configuration for Yoga instance
 * @returns Configured Yoga instance
 */
export const createGraphQLYoga = (config: GraphQLYogaConfig) => {
	const {
		pool,
		jwtSigningKey,
		jwtIssuer,
		jwtAudience,
		environment = process.env.NODE_ENV || "development",
		graphqlEndpoint = "/api/graphql",
		healthCheckEndpoint = "/api/graphql/health",
	} = config;

	const graphqlSchema = createSchema({ typeDefs, resolvers });

	const yoga = createYoga({
		schema: graphqlSchema,
		graphiql: environment !== "production",
		graphqlEndpoint,
		plugins: [
			useJWT({
				signingKeyProviders: [createInlineSigningKeyProvider(jwtSigningKey)],
				tokenLookupLocations: [
					extractFromHeader({ name: "authorization", prefix: "Bearer" }),
				],
				tokenVerification: {
					issuer: jwtIssuer,
					audience: jwtAudience,
					algorithms: ["HS256"],
				},
				reject: {
					invalidToken: true,
					missingToken: config.enableJWT,
				},
			}),
			useReadinessCheck({
				endpoint: healthCheckEndpoint,
				check: async () => {
					try {
						await pool.query("SELECT 1");
						return true;
					} catch (error) {
						console.error("Health check failed:", error);
						return false;
					}
				},
			}),
		],
		logging: environment !== "production" ? "debug" : "error",
		healthCheckEndpoint,
	});

	return yoga;
};
