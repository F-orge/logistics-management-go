import { beforeAll, afterAll } from "bun:test";
import { Pool, PoolClient } from "pg";
import { S3Client } from "bun";
import nodemailer, { Transporter } from "nodemailer";

const TEST_DB_NAME = `test_db_${Date.now()}`;
const TEST_BUCKET_NAME = `test_bucket_${Date.now()}`;
const MAILHOG_SMTP_HOST = process.env.MAILHOG_SMTP_HOST || "localhost";
const MAILHOG_SMTP_PORT = parseInt(process.env.MAILHOG_SMTP_PORT || "1025");
const MAILHOG_API_URL = process.env.MAILHOG_API_URL || "http://localhost:8025";

// Declare globalThis types for type safety
declare global {
	var __testPool: Pool;
	var __testClient: PoolClient;
	var __testS3Client: S3Client;
	var __testMailer: Transporter;
}

beforeAll(async () => {
	try {
		// Connect to default postgres database to create test database
		const pool = new Pool({
			connectionString:
				process.env.DATABASE_URL || "postgresql://localhost/postgres",
		});

		const client = await pool.connect();

		// Drop test database if it exists (for clean slate)
		await client.query(
			`DROP DATABASE IF EXISTS "${TEST_DB_NAME}" WITH (FORCE);`,
		);

		// Create new test database
		await client.query(`CREATE DATABASE "${TEST_DB_NAME}";`);

		// Expose to globalThis for other test files
		globalThis.__testPool = pool;
		globalThis.__testClient = client;

		console.log(`✓ Test database created: ${TEST_DB_NAME}`);

		// Setup S3Client for MinIO
		const s3Client = new S3Client({
			accessKeyId: process.env.DOCKER_MINIO_ROOT_USER || "minioadmin",
			secretAccessKey: process.env.DOCKER_MINIO_ROOT_PASSWORD || "minioadmin",
			endpoint: process.env.DOCKER_MINIO_ENDPOINT || "http://localhost:9000",
			bucket: TEST_BUCKET_NAME,
		});

		// Expose S3Client to globalThis
		globalThis.__testS3Client = s3Client;

		console.log(`✓ S3 client configured: ${TEST_BUCKET_NAME}`);

		// Setup Nodemailer transporter for MailHog
		const mailer = nodemailer.createTransport({
			host: MAILHOG_SMTP_HOST,
			port: MAILHOG_SMTP_PORT,
			secure: false, // MailHog doesn't use TLS by default
		});

		// Verify MailHog connection
		try {
			await mailer.verify();
			console.log(
				`✓ MailHog SMTP connected: ${MAILHOG_SMTP_HOST}:${MAILHOG_SMTP_PORT}`,
			);
		} catch (error) {
			console.warn(
				`⚠ MailHog SMTP connection failed (tests may fail if email sending is tested):`,
			);
		}

		// Clear existing messages from MailHog
		try {
			await fetch(`${MAILHOG_API_URL}/api/v2/messages`, {
				method: "DELETE",
			});
			console.log(`✓ MailHog messages cleared`);
		} catch (error) {
			console.warn(`⚠ Failed to clear MailHog messages:`, error);
		}

		// Expose mailer to globalThis
		globalThis.__testMailer = mailer;
	} catch (error) {
		console.error("Failed to setup test environment:", error);
		throw error;
	}
});

afterAll(async () => {
	const pool = globalThis.__testPool;
	const client = globalThis.__testClient;
	const s3Client = globalThis.__testS3Client;

	try {
		// Cleanup PostgreSQL database
		if (client) {
			// Terminate all connections to the test database before dropping it
			await client.query(
				`
        SELECT pg_terminate_backend(pg_stat_activity.pid)
        FROM pg_stat_activity
        WHERE pg_stat_activity.datname = $1
        AND pid <> pg_backend_pid();
      `,
				[TEST_DB_NAME],
			);

			// Drop the test database
			await client.query(
				`DROP DATABASE IF EXISTS "${TEST_DB_NAME}" WITH (FORCE);`,
			);

			client.release();
		}

		console.log(`✓ Test database dropped: ${TEST_DB_NAME}`);
	} catch (error) {
		console.error("Failed to cleanup test database:", error);
	}

	// Cleanup S3 bucket
	try {
		if (s3Client) {
			// List all objects in the bucket
			const listResult = await s3Client.list(null);

			// Delete all objects in the bucket
			if (listResult.contents && listResult.contents.length > 0) {
				for (const obj of listResult.contents) {
					await s3Client.delete(obj.key);
				}
				console.log(
					`✓ Deleted ${listResult.contents.length} objects from S3 bucket`,
				);
			}

			console.log(`✓ S3 bucket cleaned: ${TEST_BUCKET_NAME}`);
		}
	} catch (error) {
		console.error("Failed to cleanup S3 bucket:", error);
	}

	// Cleanup MailHog messages
	try {
		const response = await fetch(`${MAILHOG_API_URL}/api/v2/messages`, {
			method: "DELETE",
		});

		if (response.ok) {
			console.log(`✓ MailHog messages deleted`);
		}
	} catch (error) {
		console.warn(`⚠ Failed to cleanup MailHog messages:`, error);
	}

	// Close mailer connection
	try {
		const mailer = globalThis.__testMailer;
		if (mailer) {
			await mailer.close();
			console.log(`✓ MailHog transporter closed`);
		}
	} catch (error) {
		console.warn(`⚠ Failed to close mailer:`, error);
	} finally {
		// Close the pool
		if (pool) {
			await pool.end();
		}
	}
});
