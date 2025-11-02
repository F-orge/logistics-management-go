import { describe, expect, it, beforeAll } from "bun:test";
import "../../setup";
import { graphQLQueryExecutor } from "../../helpers";
import type {
	CreateDriverLocationMutation as CreateDriverLocationMutationType,
	CreateDriverLocationMutationVariables,
	UpdateDriverLocationMutation as UpdateDriverLocationMutationType,
	UpdateDriverLocationMutationVariables,
	RemoveDriverLocationMutation as RemoveDriverLocationMutationType,
	RemoveDriverLocationMutationVariables,
	TableDriverLocationQuery as TableDriverLocationQueryType,
	TableDriverLocationQueryVariables,
	AnalyticsDriverLocationsQuery as AnalyticsDriverLocationsQueryType,
	AnalyticsDriverLocationsQueryVariables,
} from "../../../src/client/generated/graphql";
import type {
	CreateDriverLocationInput,
	UpdateDriverLocationInput,
} from "../../../src/client/generated/graphql";
import {
	CreateDriverLocationMutation,
	UpdateDriverLocationMutation,
	RemoveDriverLocationMutation,
	TableDriverLocationQuery,
	AnalyticsDriverLocationsQuery,
} from "../../../src/client";
import type { GraphQLTestCase } from "../../inputs/helpers";

// ============================================
// Type Definitions
// ============================================

type CreateDriverLocationTestCase = GraphQLTestCase<
	CreateDriverLocationMutationVariables,
	CreateDriverLocationMutationType
>;

type UpdateDriverLocationTestCase = GraphQLTestCase<
	UpdateDriverLocationMutationVariables,
	UpdateDriverLocationMutationType
> & {
	createData: CreateDriverLocationInput;
	updateData: UpdateDriverLocationInput;
	validate?: (
		response: UpdateDriverLocationMutationType,
		createdLocation: any,
	) => void;
};

type RemoveDriverLocationTestCase = GraphQLTestCase<
	RemoveDriverLocationMutationVariables,
	RemoveDriverLocationMutationType
> & {
	shouldCreate: boolean;
	validate?: (response: RemoveDriverLocationMutationType) => void;
};

type TableDriverLocationTestCase = GraphQLTestCase<
	TableDriverLocationQueryVariables,
	TableDriverLocationQueryType
> & {
	validate: (response: TableDriverLocationQueryType) => void;
};

type AnalyticsDriverLocationTestCase = GraphQLTestCase<
	AnalyticsDriverLocationsQueryVariables,
	AnalyticsDriverLocationsQueryType
> & {
	validate: (response: AnalyticsDriverLocationsQueryType) => void;
};

// ============================================
// Helper Functions
// ============================================

// Add helper functions as needed

// ============================================
// Test Suite: Create Driver Location
// ============================================

describe("Graphql DMS Create Driver Location", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreateDriverLocationTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			CreateDriverLocationMutation,
			testCase.variables,
		);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.dms?.createDriverLocation).toBeDefined();
			expect(response.data?.dms?.createDriverLocation?.id).toBeDefined();
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
// Test Suite: Update Driver Location
// ============================================

describe("Graphql DMS Update Driver Location", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: UpdateDriverLocationTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		// Create initial location
		const createResponse = await executor(CreateDriverLocationMutation, {
			driverLocation: testCase.createData,
		});

		expect(createResponse.data?.dms?.createDriverLocation?.id).toBeDefined();
		const locationId = createResponse.data!.dms!.createDriverLocation!.id!;
		const createdLocation = createResponse.data!.dms!.createDriverLocation!;

		// Update location
		const updateResponse = await executor(UpdateDriverLocationMutation, {
			id: locationId,
			driverLocation: testCase.updateData,
		});

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(updateResponse.data?.dms?.updateDriverLocation).toBeDefined();
			if (testCase.validate) {
				testCase.validate(
					updateResponse.data as UpdateDriverLocationMutationType,
					createdLocation,
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
// Test Suite: Remove Driver Location
// ============================================

describe("Graphql DMS Remove Driver Location", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: RemoveDriverLocationTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		let locationId: string;

		if (testCase.shouldCreate) {
			const createResponse = await executor(CreateDriverLocationMutation, {
				driverLocation: {
					// Add minimal required fields
				} as unknown as CreateDriverLocationInput,
			});
			locationId = createResponse.data!.dms!.createDriverLocation!.id!;
		} else {
			locationId = "00000000-0000-0000-0000-000000000000";
		}

		const deleteResponse = await executor(RemoveDriverLocationMutation, {
			id: locationId,
		});

		if (testCase.success) {
			expect(deleteResponse.errors).toBeUndefined();
			expect(deleteResponse.data?.dms?.removeDriverLocation).toBeDefined();
		} else {
			if (deleteResponse.errors) {
				expect(Array.isArray(deleteResponse.errors)).toBe(true);
			} else {
				expect(deleteResponse.data?.dms?.removeDriverLocation?.success).toBe(
					false,
				);
			}
		}

		if (testCase.validate) {
			testCase.validate(
				deleteResponse.data as RemoveDriverLocationMutationType,
			);
		}
	});
});

// ============================================
// Test Suite: Table Driver Location Query
// ============================================

describe("Graphql DMS Table Driver Location Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	let createdLocations: Array<{
		id: string;
	}> = [];

	beforeAll(async () => {
		executor = graphQLQueryExecutor({ enableJWT: false });
		// Create sample locations for table queries if needed
	});

	const cases: TableDriverLocationTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			TableDriverLocationQuery,
			testCase.variables,
		);
		testCase.validate(response.data as TableDriverLocationQueryType);
	});
});

// ============================================
// Test Suite: Analytics Driver Locations Query
// ============================================

describe("Graphql DMS Analytics Driver Locations Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: AnalyticsDriverLocationTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			AnalyticsDriverLocationsQuery,
			testCase.variables,
		);
		testCase.validate(response.data as AnalyticsDriverLocationsQueryType);
	});
});
