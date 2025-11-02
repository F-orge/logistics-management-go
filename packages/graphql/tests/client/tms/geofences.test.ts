import { describe, expect, it, beforeAll } from "bun:test";
import "../../setup";
import { graphQLQueryExecutor } from "../../helpers";
import type {
	CreateGeofenceMutation as CreateGeofenceMutationType,
	CreateGeofenceMutationVariables,
	UpdateGeofenceMutation as UpdateGeofenceMutationType,
	UpdateGeofenceMutationVariables,
	TableGeofenceQuery as TableGeofenceQueryType,
	TableGeofenceQueryVariables,
	SearchGeofencesQuery as SearchGeofencesQueryType,
	SearchGeofencesQueryVariables,
} from "../../../src/client/generated/graphql";
import type {
	CreateGeofenceInput,
	UpdateGeofenceInput,
} from "../../../src/client/generated/graphql";
import {
	CreateGeofenceMutation,
	UpdateGeofenceMutation,
	TableGeofenceQuery,
	SearchGeofencesQuery,
} from "../../../src/client";
import type { GraphQLTestCase } from "../../inputs/helpers";

// ============================================
// Type Definitions
// ============================================

type CreateGeofenceTestCase = GraphQLTestCase<
	CreateGeofenceMutationVariables,
	CreateGeofenceMutationType
>;

type UpdateGeofenceTestCase = GraphQLTestCase<
	UpdateGeofenceMutationVariables,
	UpdateGeofenceMutationType
> & {
	createData: CreateGeofenceInput;
	updateData: UpdateGeofenceInput;
	validate?: (
		response: UpdateGeofenceMutationType,
		createdGeofence: any,
	) => void;
};

type TableGeofenceTestCase = GraphQLTestCase<
	TableGeofenceQueryVariables,
	TableGeofenceQueryType
> & {
	validate: (response: TableGeofenceQueryType) => void;
};

type SearchGeofenceTestCase = GraphQLTestCase<
	SearchGeofencesQueryVariables,
	SearchGeofencesQueryType
> & {
	validate: (response: SearchGeofencesQueryType) => void;
};

// ============================================
// Test Suite: Create Geofence
// ============================================

describe("Graphql TMS Create Geofence", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreateGeofenceTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(CreateGeofenceMutation, testCase.variables);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.tms?.createGeofence).toBeDefined();
			expect(response.data?.tms?.createGeofence?.id).toBeDefined();
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
// Test Suite: Update Geofence
// ============================================

describe("Graphql TMS Update Geofence", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: UpdateGeofenceTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		// Create initial geofence
		const createResponse = await executor(CreateGeofenceMutation, {
			geofence: testCase.createData,
		});

		expect(createResponse.data?.tms?.createGeofence?.id).toBeDefined();
		const geofenceId = createResponse.data!.tms!.createGeofence!.id!;
		const createdGeofence = createResponse.data!.tms!.createGeofence!;

		// Update geofence
		const updateResponse = await executor(UpdateGeofenceMutation, {
			id: geofenceId,
			geofence: testCase.updateData,
		});

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(updateResponse.data?.tms?.updateGeofence).toBeDefined();
			if (testCase.validate) {
				testCase.validate(
					updateResponse.data as UpdateGeofenceMutationType,
					createdGeofence,
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
// Test Suite: Table Geofences Query
// ============================================

describe("Graphql TMS Table Geofences Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: TableGeofenceTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(TableGeofenceQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.tms?.geofences).toBeDefined();
			testCase.validate(response.data as TableGeofenceQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});

// ============================================
// Test Suite: Search Geofences Query
// ============================================

describe("Graphql TMS Search Geofences Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: SearchGeofenceTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(SearchGeofencesQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.tms?.geofences).toBeDefined();
			testCase.validate(response.data as SearchGeofencesQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});
