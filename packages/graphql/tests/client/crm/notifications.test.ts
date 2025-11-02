import { beforeAll, describe, expect, it } from "bun:test";
import "../../setup";
import {
	CreateNotificationMutation,
	SearchNotificationsQuery,
	TableNotificationQuery,
	UpdateNotificationMutation,
} from "../../../src/client";
import type {
	CreateNotificationInput,
	CreateNotificationMutation as CreateNotificationMutationType,
	CreateNotificationMutationVariables,
	SearchNotificationsQuery as SearchNotificationsQueryType,
	SearchNotificationsQueryVariables,
	TableNotificationQuery as TableNotificationQueryType,
	TableNotificationQueryVariables,
	UpdateNotificationInput,
	UpdateNotificationMutation as UpdateNotificationMutationType,
	UpdateNotificationMutationVariables,
} from "../../../src/client/generated/graphql";
import { graphQLQueryExecutor } from "../../helpers";
import type { GraphQLTestCase } from "../../inputs/helpers";

// ============================================
// Type Definitions
// ============================================

type CreateNotificationTestCase = GraphQLTestCase<
	CreateNotificationMutationVariables,
	CreateNotificationMutationType
>;

type UpdateNotificationTestCase = GraphQLTestCase<
	UpdateNotificationMutationVariables,
	UpdateNotificationMutationType
> & {
	createData: CreateNotificationInput;
	updateData: UpdateNotificationInput;
	validate?: (
		response: UpdateNotificationMutationType,
		createdNotification: any,
	) => void;
};

type TableNotificationTestCase = GraphQLTestCase<
	TableNotificationQueryVariables,
	TableNotificationQueryType
> & {
	validate: (response: TableNotificationQueryType) => void;
};

type SearchNotificationTestCase = GraphQLTestCase<
	SearchNotificationsQueryVariables,
	SearchNotificationsQueryType
> & {
	validate: (response: SearchNotificationsQueryType) => void;
};

// ============================================
// Helper Functions
// ============================================

// ============================================
// Test Suite: Create Notification
// ============================================

describe("Graphql CRM Create Notification", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreateNotificationTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			CreateNotificationMutation,
			testCase.variables,
		);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.crm?.createNotification).toBeDefined();
			expect(response.data?.crm?.createNotification?.id).toBeDefined();
		} else {
			expect(response.errors).toBeDefined();
			expect(Array.isArray(response.errors)).toBe(true);
			expect(response.errors!.length).toBeGreaterThan(0);

			if (testCase.expectedError) {
				const errorMessage = response.errors![0]?.message || "";

				if (testCase.expectedError.messagePattern instanceof RegExp) {
					expect(errorMessage).toMatch(testCase.expectedError.messagePattern);
				} else {
					expect(errorMessage).toContain(testCase.expectedError.messagePattern);
				}
			}
		}
	});
});

// ============================================
// Test Suite: Update Notification
// ============================================

describe("Graphql CRM Update Notification", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: UpdateNotificationTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		// Create initial notification
		const createResponse = await executor(CreateNotificationMutation, {
			notification: testCase.createData,
		});

		expect(createResponse.data?.crm?.createNotification?.id).toBeDefined();
		const notificationId = createResponse.data!.crm!.createNotification!.id!;
		const createdNotification = createResponse.data!.crm!.createNotification!;

		// Update notification
		const updateResponse = await executor(UpdateNotificationMutation, {
			id: notificationId,
			notification: testCase.updateData,
		});

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(updateResponse.data?.crm?.updateNotification).toBeDefined();
			if (testCase.validate) {
				testCase.validate(
					updateResponse.data as UpdateNotificationMutationType,
					createdNotification,
				);
			}
		} else {
			expect(updateResponse.errors).toBeDefined();
			expect(updateResponse.errors!.length).toBeGreaterThan(0);

			if (testCase.expectedError) {
				const errorMessage = updateResponse.errors![0]?.message || "";
				if (testCase.expectedError.messagePattern instanceof RegExp) {
					expect(errorMessage).toMatch(testCase.expectedError.messagePattern);
				} else {
					expect(errorMessage).toContain(testCase.expectedError.messagePattern);
				}
			}
		}
	});
});

// ============================================
// Test Suite: Table Notification Query
// ============================================

describe("Graphql CRM Table Notification Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(async () => {
		executor = graphQLQueryExecutor({ enableJWT: false });
		// Setup notifications for table testing if needed
	});

	const cases: TableNotificationTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(TableNotificationQuery, testCase.variables);
		testCase.validate(response.data as TableNotificationQueryType);
	});
});

// ============================================
// Test Suite: Search Notifications Query
// ============================================

describe("Graphql CRM Search Notifications Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(async () => {
		executor = graphQLQueryExecutor({ enableJWT: false });
		// Setup notifications for search testing if needed
	});

	const cases: SearchNotificationTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			SearchNotificationsQuery,
			testCase.variables,
		);
		testCase.validate(response.data as SearchNotificationsQueryType);
	});
});
