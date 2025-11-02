import type { S3Client } from "bun";
import { CamelCasePlugin, Kysely, PostgresDialect } from "kysely";
import type { Transporter } from "nodemailer";
import type { Pool, PoolClient } from "pg";
import type { GraphqlResponse } from "../src/client";
import type { TypedDocumentString } from "../src/client/generated/graphql";
import { DB } from "../src/db.types";
import { pubsubFactory } from "../src/events";
import { createGraphQLYoga } from "../src/yoga";

declare global {
	var __testPool: Pool;
	var __testClient: PoolClient;
	var __testS3Client: S3Client;
	var __testMailer: Transporter;
}

/**
 * Get the test database client
 * @throws Error if test database not initialized
 */
export const getTestClient = (): PoolClient => {
	if (!globalThis.__testClient) {
		throw new Error(
			"Test database not initialized. Make sure setup.ts is imported before tests run.",
		);
	}
	return globalThis.__testClient;
};

/**
 * Get the test database pool
 * @throws Error if test pool not initialized
 */
export const getTestPool = (): Pool => {
	if (!globalThis.__testPool) {
		throw new Error(
			"Test pool not initialized. Make sure setup.ts is imported before tests run.",
		);
	}
	return globalThis.__testPool;
};

/**
 * Get the test S3 client (MinIO)
 * @throws Error if S3 client not initialized
 */
export const getTestS3Client = (): S3Client => {
	if (!globalThis.__testS3Client) {
		throw new Error(
			"Test S3 client not initialized. Make sure setup.ts is imported before tests run.",
		);
	}
	return globalThis.__testS3Client;
};

/**
 * Get the test Nodemailer transporter (MailHog)
 * @throws Error if mailer not initialized
 */
export const getTestMailer = (): Transporter => {
	if (!globalThis.__testMailer) {
		throw new Error(
			"Test mailer not initialized. Make sure setup.ts is imported before tests run.",
		);
	}
	return globalThis.__testMailer;
};

/**
 * Interface for MailHog message
 */
interface MailHogMessage {
	id: string;
	from: {
		relays: string[];
		mailbox: string;
		domain: string;
		params: string;
	};
	to: Array<{
		relays: string[];
		mailbox: string;
		domain: string;
		params: string;
	}>;
	headers: Record<string, string | string[]>;
	size: number;
	created: string;
}

/**
 * Interface for MailHog messages response
 */
interface MailHogMessagesResponse {
	total: number;
	start: number;
	count: number;
	messages: MailHogMessage[];
}

const MAILHOG_API_URL = process.env.MAILHOG_API_URL || "http://localhost:8025";

/**
 * Get all messages from MailHog
 * @param start - Start index (default: 0)
 * @param limit - Number of messages to retrieve (default: 50)
 * @throws Error if MailHog API is unavailable
 */
export const getMailHogMessages = async (
	start: number = 0,
	limit: number = 50,
): Promise<MailHogMessage[]> => {
	try {
		const response = await fetch(
			`${MAILHOG_API_URL}/api/v2/messages?start=${start}&limit=${limit}`,
		);

		if (!response.ok) {
			throw new Error(`MailHog API returned status ${response.status}`);
		}

		const data = (await response.json()) as MailHogMessagesResponse;
		return data.messages || [];
	} catch (error) {
		throw new Error(`Failed to fetch MailHog messages: ${error}`);
	}
};

/**
 * Search for emails in MailHog by recipient
 * @param recipient - Email address to search for
 * @throws Error if MailHog API is unavailable
 */
export const findEmailTo = async (
	recipient: string,
): Promise<MailHogMessage | null> => {
	try {
		const response = await fetch(
			`${MAILHOG_API_URL}/api/v2/search?kind=to&query=${encodeURIComponent(
				recipient,
			)}`,
		);

		if (!response.ok) {
			throw new Error(`MailHog API returned status ${response.status}`);
		}

		const data = (await response.json()) as MailHogMessagesResponse;
		return data.messages && data.messages.length > 0 ? data.messages[0]! : null;
	} catch (error) {
		throw new Error(`Failed to search MailHog messages by recipient: ${error}`);
	}
};

/**
 * Search for emails in MailHog by sender
 * @param sender - Email address to search for
 * @throws Error if MailHog API is unavailable
 */
export const findEmailFrom = async (
	sender: string,
): Promise<MailHogMessage | null> => {
	try {
		const response = await fetch(
			`${MAILHOG_API_URL}/api/v2/search?kind=from&query=${encodeURIComponent(
				sender,
			)}`,
		);

		if (!response.ok) {
			throw new Error(`MailHog API returned status ${response.status}`);
		}

		const data = (await response.json()) as MailHogMessagesResponse;
		return data.messages && data.messages.length > 0 ? data.messages[0]! : null;
	} catch (error) {
		throw new Error(`Failed to search MailHog messages by sender: ${error}`);
	}
};

/**
 * Search for emails in MailHog by content
 * @param query - Content to search for
 * @throws Error if MailHog API is unavailable
 */
export const findEmailContaining = async (
	query: string,
): Promise<MailHogMessage | null> => {
	try {
		const response = await fetch(
			`${MAILHOG_API_URL}/api/v2/search?kind=containing&query=${encodeURIComponent(
				query,
			)}`,
		);

		if (!response.ok) {
			throw new Error(`MailHog API returned status ${response.status}`);
		}

		const data = (await response.json()) as MailHogMessagesResponse;
		return data.messages && data.messages.length > 0 ? data.messages[0]! : null;
	} catch (error) {
		throw new Error(`Failed to search MailHog messages by content: ${error}`);
	}
};

/**
 * Clear all messages from MailHog
 * @throws Error if MailHog API is unavailable
 */
export const clearMailHog = async (): Promise<void> => {
	try {
		const response = await fetch(`${MAILHOG_API_URL}/api/v2/messages`, {
			method: "DELETE",
		});

		if (!response.ok) {
			throw new Error(`MailHog API returned status ${response.status}`);
		}
	} catch (error) {
		throw new Error(`Failed to clear MailHog messages: ${error}`);
	}
};

// GraphQL test helpers

export const kyselyInstance = () => {
	const pool = getTestPool();

	return new Kysely<DB>({
		dialect: new PostgresDialect({ pool }),
		plugins: [new CamelCasePlugin()],
	});
};

/**
 * Creates a GraphQL query executor function for testing purposes.
 *
 * This function initializes all required test services, including a database pool,
 * S3 client, mailer, pubsub instance, and a Kysely database instance. It also
 * creates a Yoga GraphQL server instance configured for a test environment.
 *
 * The returned function accepts a `Request` object and executes it against the
 * Yoga GraphQL server, injecting the initialized test services into the context.
 *
 * @returns A function that takes a `Request` and returns a `Promise<Response>` from the Yoga GraphQL server.
 */
export const graphQLQueryExecutor = ({
	enableJWT,
}: {
	enableJWT: boolean;
}): (<TResult, TVariables>(
	query: TypedDocumentString<TResult, TVariables>,
	...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
) => Promise<GraphqlResponse<TResult>>) => {
	// Validate all required services are initialized
	const pool = getTestPool();
	const s3Client = getTestS3Client();
	const mailer = getTestMailer();

	// Create pubsub instance for this test execution
	const pubsub = pubsubFactory();

	// Create Kysely instance for this test execution
	const db = new Kysely<any>({
		dialect: new PostgresDialect({ pool }),
		plugins: [new CamelCasePlugin()],
	});

	// Create Yoga instance
	const yoga = createGraphQLYoga({
		pool,
		jwtSigningKey: process.env.JWT_SIGNING_KEY || "test-secret-key",
		jwtIssuer: process.env.JWT_ISSUER || "http://localhost:3001",
		jwtAudience: process.env.JWT_AUDIENCE || "http://localhost:3000",
		environment: "development",
		enableJWT: enableJWT,
	});

	return async <TResult, TVariables>(
		query: TypedDocumentString<TResult, TVariables>,
		...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
	): Promise<GraphqlResponse<TResult>> => {
		const request = new Request("http://localhost:3000/api/graphql", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/graphql-response+json",
			},
			body: JSON.stringify({
				query,
				variables,
			}),
		});

		const response = await yoga.fetch(request, {
			db,
			s3Client,
			pubsub,
			mailer,
		});

		const jsonResponse = (await response.json()) as GraphqlResponse<TResult>;

		// If response has GraphQL errors (even with non-200 status), return them as-is
		// This handles GraphQL validation errors which may return non-200 status
		if (jsonResponse.errors && jsonResponse.errors.length > 0) {
			return jsonResponse;
		}

		// Only add network error if response is not ok AND no GraphQL errors
		if (!response.ok) {
			return {
				...jsonResponse,
				errors: [{ message: `Network error: ${response.statusText}` }],
			} as GraphqlResponse<TResult>;
		}

		return jsonResponse;
	};
};
