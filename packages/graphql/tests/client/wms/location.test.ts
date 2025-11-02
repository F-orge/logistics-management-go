import { describe, expect, it, beforeAll } from "bun:test";
import "../../setup";
import { graphQLQueryExecutor } from "../../helpers";
import type {
	CreateLocationMutation as CreateLocationMutationType,
	CreateLocationMutationVariables,
	UpdateLocationMutation as UpdateLocationMutationType,
	UpdateLocationMutationVariables,
	RemoveLocationMutation as RemoveLocationMutationType,
	RemoveLocationMutationVariables,
	TableLocationQuery as TableLocationQueryType,
	TableLocationQueryVariables,
	SearchLocationsQuery as SearchLocationsQueryType,
	SearchLocationsQueryVariables,
	AnalyticsLocationsQuery as AnalyticsLocationsQueryType,
	AnalyticsLocationsQueryVariables,
} from "../../../src/client/generated/graphql";
import type {
	CreateLocationInput,
	UpdateLocationInput,
} from "../../../src/client/generated/graphql";
import {
	CreateLocationMutation,
	UpdateLocationMutation,
	RemoveLocationMutation,
	TableLocationQuery,
	SearchLocationsQuery,
	AnalyticsLocationsQuery,
} from "../../../src/client";
import type { GraphQLTestCase } from "../../inputs/helpers";
// ============================================
// Type Definitions
// ============================================

type CreateLocationTestCase = GraphQLTestCase<
	CreateLocationMutationVariables,
	CreateLocationMutationType
>;

type UpdateLocationTestCase = GraphQLTestCase<
	UpdateLocationMutationVariables,
	UpdateLocationMutationType
> & {
	createData: CreateLocationInput;
	updateData: UpdateLocationInput;
	validate?: (response: UpdateLocationMutationType, createdLocation: any) => void;
};

type RemoveLocationTestCase = GraphQLTestCase<
	RemoveLocationMutationVariables,
	RemoveLocationMutationType
> & {
	createData: CreateLocationInput;
	shouldCreate?: boolean;
	validate?: (response: RemoveLocationMutationType) => void;
};

type TableLocationTestCase = GraphQLTestCase<
	TableLocationQueryVariables,
	TableLocationQueryType
> & {
	validate: (response: TableLocationQueryType) => void;
};

type SearchLocationsTestCase = GraphQLTestCase<
	SearchLocationsQueryVariables,
	SearchLocationsQueryType
> & {
	validate: (response: SearchLocationsQueryType) => void;
};

type AnalyticsLocationsTestCase = GraphQLTestCase<
	AnalyticsLocationsQueryVariables,
	AnalyticsLocationsQueryType
> & {
	validate: (response: AnalyticsLocationsQueryType) => void;
};
// ============================================
// Test Suite: Create Location
// ============================================

describe("Graphql Create Location", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreateLocationTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(CreateLocationMutation, testCase.variables);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.createLocation).toBeDefined();
			expect(response.data?.wms?.createLocation?.id).toBeDefined();
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
// Test Suite: Update Location
// ============================================

describe("Graphql Update Location", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: UpdateLocationTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		// Create initial Location
		const createResponse = await executor(CreateLocationMutation, {
			location: testCase.createData,
		});

		expect(createResponse.data?.wms?.createLocation?.id).toBeDefined();
		const locationId = createResponse.data!.wms!.createLocation!.id!;
		const createdLocation = createResponse.data!.wms!.createLocation!;

		// Update Location
		const updateResponse = await executor(UpdateLocationMutation, {
			id: testCase.variables.id,
			location: testCase.updateData,
		});

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(updateResponse.data?.wms?.updateLocation).toBeDefined();
			if (testCase.validate) {
				testCase.validate(
					updateResponse.data as UpdateLocationMutationType,
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
// Test Suite: Remove Location
// ============================================

describe("Graphql Remove Location", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: RemoveLocationTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		let locationId: string;

		if (testCase.shouldCreate) {
			const createResponse = await executor(CreateLocationMutation, {
				location: {
					// Add minimal required fields
				} as unknown as CreateLocationInput,
			});
			locationId = createResponse.data!.wms!.createLocation!.id!;
		} else {
			locationId = "00000000-0000-0000-0000-000000000000";
		}

		const deleteResponse = await executor(RemoveLocationMutation, {
			id: locationId,
		});

		if (testCase.success) {
			expect(deleteResponse.errors).toBeUndefined();
			expect(deleteResponse.data?.wms?.removeLocation).toBeDefined();
		} else {
			if (deleteResponse.errors) {
				expect(Array.isArray(deleteResponse.errors)).toBe(true);
			} else {
				expect(deleteResponse.data?.wms?.removeLocation?.success).toBe(false);
			}
		}

		if (testCase.validate) {
			testCase.validate(deleteResponse.data as RemoveLocationMutationType);
		}
	});
});

// ============================================
// Test Suite: Table Locations Query
// ============================================

describe("Graphql Table Locations Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: TableLocationTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(TableLocationQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.locations).toBeDefined();
			testCase.validate(response.data as TableLocationQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});

// ============================================
// Test Suite: Search Locations Query
// ============================================

describe("Graphql Search Locations Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: SearchLocationsTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(SearchLocationsQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.locations).toBeDefined();
			testCase.validate(response.data as SearchLocationsQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});

// ============================================
// Test Suite: Analytics Locations Query
// ============================================

describe("Graphql Analytics Locations Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: AnalyticsLocationsTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(AnalyticsLocationsQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.locations).toBeDefined();
			testCase.validate(response.data as AnalyticsLocationsQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});
