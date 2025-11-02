import { beforeAll, describe, expect, it } from "bun:test";
import "../../setup";
import {
	AnalyticsDeliveryRoutesQuery,
	CreateDeliveryRouteMutation,
	RemoveDeliveryRouteMutation,
	SearchDeliveryRoutesQuery,
	TableDeliveryRoute,
	UpdateDeliveryRouteMutation,
} from "../../../src/client";
import type {
	AnalyticsDeliveryRoutesQuery as AnalyticsDeliveryRoutesQueryType,
	AnalyticsDeliveryRoutesQueryVariables,
	CreateDeliveryRouteInput,
	CreateDeliveryRouteMutation as CreateDeliveryRouteMutationType,
	CreateDeliveryRouteMutationVariables,
	RemoveDeliveryRouteMutation as RemoveDeliveryRouteMutationType,
	RemoveDeliveryRouteMutationVariables,
	SearchDeliveryRoutesQuery as SearchDeliveryRoutesQueryType,
	SearchDeliveryRoutesQueryVariables,
	TableDeliveryQuery as TableDeliveryQueryType,
	TableDeliveryQueryVariables,
	UpdateDeliveryRouteInput,
	UpdateDeliveryRouteMutation as UpdateDeliveryRouteMutationType,
	UpdateDeliveryRouteMutationVariables,
} from "../../../src/client/generated/graphql";
import { graphQLQueryExecutor } from "../../helpers";
import type { GraphQLTestCase } from "../../inputs/helpers";

// ============================================
// Type Definitions
// ============================================

type CreateDeliveryRouteTestCase = GraphQLTestCase<
	CreateDeliveryRouteMutationVariables,
	CreateDeliveryRouteMutationType
>;

type UpdateDeliveryRouteTestCase = GraphQLTestCase<
	UpdateDeliveryRouteMutationVariables,
	UpdateDeliveryRouteMutationType
> & {
	createData: CreateDeliveryRouteInput;
	updateData: UpdateDeliveryRouteInput;
	validate?: (
		response: UpdateDeliveryRouteMutationType,
		createdRoute: any,
	) => void;
};

type RemoveDeliveryRouteTestCase = GraphQLTestCase<
	RemoveDeliveryRouteMutationVariables,
	RemoveDeliveryRouteMutationType
> & {
	shouldCreate: boolean;
	validate?: (response: RemoveDeliveryRouteMutationType) => void;
};

type TableDeliveryRouteTestCase = GraphQLTestCase<
	TableDeliveryQueryVariables,
	TableDeliveryQueryType
> & {
	validate: (response: TableDeliveryQueryType) => void;
};

type SearchDeliveryRouteTestCase = GraphQLTestCase<
	SearchDeliveryRoutesQueryVariables,
	SearchDeliveryRoutesQueryType
> & {
	validate: (response: SearchDeliveryRoutesQueryType) => void;
};

type AnalyticsDeliveryRouteTestCase = GraphQLTestCase<
	AnalyticsDeliveryRoutesQueryVariables,
	AnalyticsDeliveryRoutesQueryType
> & {
	validate: (response: AnalyticsDeliveryRoutesQueryType) => void;
};

// ============================================
// Helper Functions
// ============================================

// Add helper functions as needed

// ============================================
// Test Suite: Create Delivery Route
// ============================================

describe("Graphql DMS Create Delivery Route", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreateDeliveryRouteTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			CreateDeliveryRouteMutation,
			testCase.variables,
		);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.dms?.createDeliveryRoute).toBeDefined();
			expect(response.data?.dms?.createDeliveryRoute?.id).toBeDefined();
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
// Test Suite: Update Delivery Route
// ============================================

describe("Graphql DMS Update Delivery Route", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: UpdateDeliveryRouteTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		// Create initial route
		const createResponse = await executor(CreateDeliveryRouteMutation, {
			deliveryRoute: testCase.createData,
		});

		expect(createResponse.data?.dms?.createDeliveryRoute?.id).toBeDefined();
		const routeId = createResponse.data!.dms!.createDeliveryRoute!.id!;
		const createdRoute = createResponse.data!.dms!.createDeliveryRoute!;

		// Update route
		const updateResponse = await executor(UpdateDeliveryRouteMutation, {
			id: routeId,
			deliveryRoute: testCase.updateData,
		});

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(updateResponse.data?.dms?.updateDeliveryRoute).toBeDefined();
			if (testCase.validate) {
				testCase.validate(
					updateResponse.data as UpdateDeliveryRouteMutationType,
					createdRoute,
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
// Test Suite: Remove Delivery Route
// ============================================

describe("Graphql DMS Remove Delivery Route", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: RemoveDeliveryRouteTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		let routeId: string;

		if (testCase.shouldCreate) {
			const createResponse = await executor(CreateDeliveryRouteMutation, {
				deliveryRoute: {
					// Add minimal required fields
				} as unknown as CreateDeliveryRouteInput,
			});
			routeId = createResponse.data!.dms!.createDeliveryRoute!.id!;
		} else {
			routeId = "00000000-0000-0000-0000-000000000000";
		}

		const deleteResponse = await executor(RemoveDeliveryRouteMutation, {
			id: routeId,
		});

		if (testCase.success) {
			expect(deleteResponse.errors).toBeUndefined();
			expect(deleteResponse.data?.dms?.removeDeliveryRoute).toBeDefined();
		} else {
			if (deleteResponse.errors) {
				expect(Array.isArray(deleteResponse.errors)).toBe(true);
			} else {
				expect(deleteResponse.data?.dms?.removeDeliveryRoute?.success).toBe(
					false,
				);
			}
		}

		if (testCase.validate) {
			testCase.validate(deleteResponse.data as RemoveDeliveryRouteMutationType);
		}
	});
});

// ============================================
// Test Suite: Table Delivery Route Query
// ============================================

describe("Graphql DMS Table Delivery Route Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	const createdRoutes: Array<{
		id: string;
	}> = [];

	beforeAll(async () => {
		executor = graphQLQueryExecutor({ enableJWT: false });
		// Create sample routes for table queries if needed
	});

	const cases: TableDeliveryRouteTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(TableDeliveryRoute, testCase.variables);
		testCase.validate(response.data as TableDeliveryQueryType);
	});
});

// ============================================
// Test Suite: Search Delivery Routes Query
// ============================================

describe("Graphql DMS Search Delivery Routes Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	const createdRoutes: Array<{ id: string }> = [];

	beforeAll(async () => {
		executor = graphQLQueryExecutor({ enableJWT: false });
		// Create sample routes for search if needed
	});

	const cases: SearchDeliveryRouteTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			SearchDeliveryRoutesQuery,
			testCase.variables,
		);
		testCase.validate(response.data as SearchDeliveryRoutesQueryType);
	});
});

// ============================================
// Test Suite: Analytics Delivery Routes Query
// ============================================

describe("Graphql DMS Analytics Delivery Routes Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: AnalyticsDeliveryRouteTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			AnalyticsDeliveryRoutesQuery,
			testCase.variables,
		);
		testCase.validate(response.data as AnalyticsDeliveryRoutesQueryType);
	});
});
