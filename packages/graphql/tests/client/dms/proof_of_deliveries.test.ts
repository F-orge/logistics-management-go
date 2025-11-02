import { describe, expect, it, beforeAll } from "bun:test";
import "../../setup";
import { graphQLQueryExecutor } from "../../helpers";
import type {
	CreateDmsProofOfDeliveryMutation as CreateDmsProofOfDeliveryMutationType,
	CreateDmsProofOfDeliveryMutationVariables,
	TableProofOfDeliveryQuery as TableProofOfDeliveryQueryType,
	TableProofOfDeliveryQueryVariables,
	SearchDmsProofOfDeliveriesQuery as SearchDmsProofOfDeliveriesQueryType,
	SearchDmsProofOfDeliveriesQueryVariables,
	AnalyticsProofOfDeliveriesQuery as AnalyticsProofOfDeliveriesQueryType,
	AnalyticsProofOfDeliveriesQueryVariables,
} from "../../../src/client/generated/graphql";
import type { CreateDmsProofOfDeliveryInput } from "../../../src/client/generated/graphql";
import {
	CreateDmsProofOfDeliveryMutation,
	TableProofOfDeliveryQuery,
	SearchDmsProofOfDeliveriesQuery,
	AnalyticsDmsProofOfDeliveriesQuery,
} from "../../../src/client";
import type { GraphQLTestCase } from "../../inputs/helpers";

// ============================================
// Type Definitions
// ============================================

type CreateDmsProofOfDeliveryTestCase = GraphQLTestCase<
	CreateDmsProofOfDeliveryMutationVariables,
	CreateDmsProofOfDeliveryMutationType
>;

type TableProofOfDeliveryTestCase = GraphQLTestCase<
	TableProofOfDeliveryQueryVariables,
	TableProofOfDeliveryQueryType
> & {
	validate: (response: TableProofOfDeliveryQueryType) => void;
};

type SearchDmsProofOfDeliveryTestCase = GraphQLTestCase<
	SearchDmsProofOfDeliveriesQueryVariables,
	SearchDmsProofOfDeliveriesQueryType
> & {
	validate: (response: SearchDmsProofOfDeliveriesQueryType) => void;
};

type AnalyticsProofOfDeliveryTestCase = GraphQLTestCase<
	AnalyticsProofOfDeliveriesQueryVariables,
	AnalyticsProofOfDeliveriesQueryType
> & {
	validate: (response: AnalyticsProofOfDeliveriesQueryType) => void;
};

// ============================================
// Helper Functions
// ============================================

// Add helper functions as needed

// ============================================
// Test Suite: Create DMS Proof of Delivery
// ============================================

describe("Graphql DMS Create DMS Proof of Delivery", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreateDmsProofOfDeliveryTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			CreateDmsProofOfDeliveryMutation,
			testCase.variables,
		);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.dms?.createDmsProofOfDelivery).toBeDefined();
			expect(response.data?.dms?.createDmsProofOfDelivery?.id).toBeDefined();
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
// Test Suite: Table Proof of Delivery Query
// ============================================

describe("Graphql DMS Table Proof of Delivery Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	let createdProofs: Array<{
		id: string;
	}> = [];

	beforeAll(async () => {
		executor = graphQLQueryExecutor({ enableJWT: false });
		// Create sample proofs for table queries if needed
	});

	const cases: TableProofOfDeliveryTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			TableProofOfDeliveryQuery,
			testCase.variables,
		);
		testCase.validate(response.data as TableProofOfDeliveryQueryType);
	});
});

// ============================================
// Test Suite: Search DMS Proof of Deliveries Query
// ============================================

describe("Graphql DMS Search DMS Proof of Deliveries Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	let createdProofs: Array<{ id: string }> = [];

	beforeAll(async () => {
		executor = graphQLQueryExecutor({ enableJWT: false });
		// Create sample proofs for search if needed
	});

	const cases: SearchDmsProofOfDeliveryTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			SearchDmsProofOfDeliveriesQuery,
			testCase.variables,
		);
		testCase.validate(response.data as SearchDmsProofOfDeliveriesQueryType);
	});
});

// ============================================
// Test Suite: Analytics DMS Proof of Deliveries Query
// ============================================

describe("Graphql DMS Analytics DMS Proof of Deliveries Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: AnalyticsProofOfDeliveryTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			AnalyticsDmsProofOfDeliveriesQuery,
			testCase.variables,
		);
		testCase.validate(response.data as AnalyticsProofOfDeliveriesQueryType);
	});
});
