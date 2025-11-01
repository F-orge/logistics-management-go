import { Pool, PoolClient } from "pg";
import { S3Client } from "bun";
import { Transporter } from "nodemailer";
import { Kysely, PostgresDialect, CamelCasePlugin } from "kysely";
import type { TypedDocumentString } from "../src/client/generated/graphql";
import { createGraphQLYoga } from "../src/yoga";
import { pubsubFactory } from "../src/events";

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

/**
 * Create a Request object for GraphQL queries (for testing purposes)
 * @param url - The GraphQL endpoint URL
 * @param query - The GraphQL query document
 * @param variables - Optional query variables
 * @returns A Request object ready to be sent
 */
export const createGraphQLRequest = <TResult, TVariables>(
	url: string,
	query: TypedDocumentString<TResult, TVariables>,
	...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
): Request => {
	return new Request(url, {
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
};

/**
 * Execute a GraphQL query using the Yoga instance without spinning up an HTTP server
 * Requires all test services to be initialized (database, S3, mailer, etc.)
 * @param request - The Request object containing the GraphQL query
 * @returns A Response object with the GraphQL result
 * @throws Error if any test service is not initialized
 */
export const executeGraphQLQuery = async (
	request: Request,
): Promise<Response> => {
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
	});

	// Execute the query
	const response = await yoga.fetch(request, {
		db,
		minio: s3Client,
		pubsub,
		mailer,
	});

	return response;
};
