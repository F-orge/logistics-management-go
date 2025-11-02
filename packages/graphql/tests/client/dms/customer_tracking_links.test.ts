import { beforeAll, describe, expect, it } from "bun:test";
import "../../setup";
import {
	AnalyticsCustomerTrackingLinksQuery,
	CreateCustomerTrackingLinkMutation,
	CustomerTrackingLinkQuery,
	SearchCustomerTrackingLinksQuery,
	UpdateCustomerTrackingLinkMutation,
} from "../../../src/client";
import type {
	AnalyticsCustomerTrackingLinksQuery as AnalyticsCustomerTrackingLinksQueryType,
	AnalyticsCustomerTrackingLinksQueryVariables,
	CreateCustomerTrackingLinkInput,
	CreateCustomerTrackingLinkMutation as CreateCustomerTrackingLinkMutationType,
	CreateCustomerTrackingLinkMutationVariables,
	SearchCustomerTrackingLinksQuery as SearchCustomerTrackingLinksQueryType,
	SearchCustomerTrackingLinksQueryVariables,
	TableCustomerTrackingLinkQuery as TableCustomerTrackingLinkQueryType,
	TableCustomerTrackingLinkQueryVariables,
	UpdateCustomerTrackingLinkInput,
	UpdateCustomerTrackingLinkMutation as UpdateCustomerTrackingLinkMutationType,
	UpdateCustomerTrackingLinkMutationVariables,
} from "../../../src/client/generated/graphql";
import { graphQLQueryExecutor } from "../../helpers";
import type { GraphQLTestCase } from "../../inputs/helpers";

// ============================================
// Type Definitions
// ============================================

type CreateCustomerTrackingLinkTestCase = GraphQLTestCase<
	CreateCustomerTrackingLinkMutationVariables,
	CreateCustomerTrackingLinkMutationType
>;

type UpdateCustomerTrackingLinkTestCase = GraphQLTestCase<
	UpdateCustomerTrackingLinkMutationVariables,
	UpdateCustomerTrackingLinkMutationType
> & {
	createData: CreateCustomerTrackingLinkInput;
	updateData: UpdateCustomerTrackingLinkInput;
	validate?: (
		response: UpdateCustomerTrackingLinkMutationType,
		createdLink: any,
	) => void;
};

type TableCustomerTrackingLinkTestCase = GraphQLTestCase<
	TableCustomerTrackingLinkQueryVariables,
	TableCustomerTrackingLinkQueryType
> & {
	validate: (response: TableCustomerTrackingLinkQueryType) => void;
};

type SearchCustomerTrackingLinkTestCase = GraphQLTestCase<
	SearchCustomerTrackingLinksQueryVariables,
	SearchCustomerTrackingLinksQueryType
> & {
	validate: (response: SearchCustomerTrackingLinksQueryType) => void;
};

type AnalyticsCustomerTrackingLinkTestCase = GraphQLTestCase<
	AnalyticsCustomerTrackingLinksQueryVariables,
	AnalyticsCustomerTrackingLinksQueryType
> & {
	validate: (response: AnalyticsCustomerTrackingLinksQueryType) => void;
};

// ============================================
// Helper Functions
// ============================================

// Add helper functions as needed

// ============================================
// Test Suite: Create Customer Tracking Link
// ============================================

describe("Graphql DMS Create Customer Tracking Link", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreateCustomerTrackingLinkTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			CreateCustomerTrackingLinkMutation,
			testCase.variables,
		);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.dms?.createCustomerTrackingLink).toBeDefined();
			expect(response.data?.dms?.createCustomerTrackingLink?.id).toBeDefined();
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
// Test Suite: Update Customer Tracking Link
// ============================================

describe("Graphql DMS Update Customer Tracking Link", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: UpdateCustomerTrackingLinkTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		// Create initial link
		const createResponse = await executor(CreateCustomerTrackingLinkMutation, {
			customerTrackingLink: testCase.createData,
		});

		expect(
			createResponse.data?.dms?.createCustomerTrackingLink?.id,
		).toBeDefined();
		const linkId = createResponse.data!.dms!.createCustomerTrackingLink!.id!;
		const createdLink = createResponse.data!.dms!.createCustomerTrackingLink!;

		// Update link
		const updateResponse = await executor(UpdateCustomerTrackingLinkMutation, {
			id: linkId,
			customerTrackingLink: testCase.updateData,
		});

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(
				updateResponse.data?.dms?.updateCustomerTrackingLink,
			).toBeDefined();
			if (testCase.validate) {
				testCase.validate(
					updateResponse.data as UpdateCustomerTrackingLinkMutationType,
					createdLink,
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
// Test Suite: Table Customer Tracking Link Query
// ============================================

describe("Graphql DMS Table Customer Tracking Link Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	const createdLinks: Array<{
		id: string;
		trackingToken: string;
	}> = [];

	beforeAll(async () => {
		executor = graphQLQueryExecutor({ enableJWT: false });
		// Create sample links for table queries if needed
	});

	const cases: TableCustomerTrackingLinkTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			CustomerTrackingLinkQuery,
			testCase.variables,
		);
		testCase.validate(response.data as TableCustomerTrackingLinkQueryType);
	});
});

// ============================================
// Test Suite: Search Customer Tracking Links Query
// ============================================

describe("Graphql DMS Search Customer Tracking Links Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	const createdLinks: Array<{ id: string; trackingToken: string }> = [];

	beforeAll(async () => {
		executor = graphQLQueryExecutor({ enableJWT: false });
		// Create sample links for search if needed
	});

	const cases: SearchCustomerTrackingLinkTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			SearchCustomerTrackingLinksQuery,
			testCase.variables,
		);
		testCase.validate(response.data as SearchCustomerTrackingLinksQueryType);
	});
});

// ============================================
// Test Suite: Analytics Customer Tracking Links Query
// ============================================

describe("Graphql DMS Analytics Customer Tracking Links Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: AnalyticsCustomerTrackingLinkTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			AnalyticsCustomerTrackingLinksQuery,
			testCase.variables,
		);
		testCase.validate(response.data as AnalyticsCustomerTrackingLinksQueryType);
	});
});
