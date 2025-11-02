import { beforeAll, describe, expect, it } from "bun:test";
import "../../setup";
import {
	CreateTripMutation,
	RemoveTripMutation,
	TableTripQuery,
	UpdateTripMutation,
} from "../../../src/client";
import type {
	CreateTripInput,
	CreateTripMutation as CreateTripMutationType,
	CreateTripMutationVariables,
	RemoveTripMutation as RemoveTripMutationType,
	RemoveTripMutationVariables,
	TableTripQuery as TableTripQueryType,
	TableTripQueryVariables,
	UpdateTripInput,
	UpdateTripMutation as UpdateTripMutationType,
	UpdateTripMutationVariables,
} from "../../../src/client/generated/graphql";
import { graphQLQueryExecutor } from "../../helpers";
import type { GraphQLTestCase } from "../../inputs/helpers";

// ============================================
// Type Definitions
// ============================================

type CreateTripTestCase = GraphQLTestCase<
	CreateTripMutationVariables,
	CreateTripMutationType
>;

type UpdateTripTestCase = GraphQLTestCase<
	UpdateTripMutationVariables,
	UpdateTripMutationType
> & {
	createData: CreateTripInput;
	updateData: UpdateTripInput;
	validate?: (response: UpdateTripMutationType, createdTrip: any) => void;
};

type RemoveTripTestCase = GraphQLTestCase<
	RemoveTripMutationVariables,
	RemoveTripMutationType
> & {
	createData: CreateTripInput;
	shouldCreate?: boolean;
	validate?: (response: RemoveTripMutationType) => void;
};

type TableTripTestCase = GraphQLTestCase<
	TableTripQueryVariables,
	TableTripQueryType
> & {
	validate: (response: TableTripQueryType) => void;
};

// ============================================
// Test Suite: Create Trip
// ============================================

describe("Graphql TMS Create Trip", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreateTripTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(CreateTripMutation, testCase.variables);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.tms?.createTrip).toBeDefined();
			expect(response.data?.tms?.createTrip?.id).toBeDefined();
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
// Test Suite: Update Trip
// ============================================

describe("Graphql TMS Update Trip", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: UpdateTripTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		// Create initial trip
		const createResponse = await executor(CreateTripMutation, {
			trip: testCase.createData,
		});

		expect(createResponse.data?.tms?.createTrip?.id).toBeDefined();
		const tripId = createResponse.data!.tms!.createTrip!.id!;
		const createdTrip = createResponse.data!.tms!.createTrip!;

		// Update trip
		const updateResponse = await executor(UpdateTripMutation, {
			id: tripId,
			trip: testCase.updateData,
		});

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(updateResponse.data?.tms?.updateTrip).toBeDefined();
			if (testCase.validate) {
				testCase.validate(
					updateResponse.data as UpdateTripMutationType,
					createdTrip,
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
// Test Suite: Remove Trip
// ============================================

describe("Graphql TMS Remove Trip", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: RemoveTripTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		let tripId: string;

		if (testCase.shouldCreate) {
			const createResponse = await executor(CreateTripMutation, {
				trip: {
					// Add minimal required fields
				} as unknown as CreateTripInput,
			});
			tripId = createResponse.data!.tms!.createTrip!.id!;
		} else {
			tripId = "00000000-0000-0000-0000-000000000000";
		}

		const deleteResponse = await executor(RemoveTripMutation, {
			id: tripId,
		});

		if (testCase.success) {
			expect(deleteResponse.errors).toBeUndefined();
			expect(deleteResponse.data?.tms?.removeTrip).toBeDefined();
		} else {
			if (deleteResponse.errors) {
				expect(Array.isArray(deleteResponse.errors)).toBe(true);
			} else {
				expect(deleteResponse.data?.tms?.removeTrip?.success).toBe(false);
			}
		}

		if (testCase.validate) {
			testCase.validate(deleteResponse.data as RemoveTripMutationType);
		}
	});
});

// ============================================
// Test Suite: Table Trips Query
// ============================================

describe("Graphql TMS Table Trips Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: TableTripTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(TableTripQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.tms?.trips).toBeDefined();
			testCase.validate(response.data as TableTripQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});
