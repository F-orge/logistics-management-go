import { describe, expect, it, beforeAll } from "bun:test";
import "../../setup";
import { graphQLQueryExecutor } from "../../helpers";
import type {
	CreateTripStopMutation as CreateTripStopMutationType,
	CreateTripStopMutationVariables,
	UpdateTripStopMutation as UpdateTripStopMutationType,
	UpdateTripStopMutationVariables,
	RemoveTripStopMutation as RemoveTripStopMutationType,
	RemoveTripStopMutationVariables,
} from "../../../src/client/generated/graphql";
import type {
	CreateTripStopInput,
	UpdateTripStopInput,
} from "../../../src/client/generated/graphql";
import {
	CreateTripStopMutation,
	UpdateTripStopMutation,
	RemoveTripStopMutation,
} from "../../../src/client";
import type { GraphQLTestCase } from "../../inputs/helpers";

// ============================================
// Type Definitions
// ============================================

type CreateTripStopTestCase = GraphQLTestCase<
	CreateTripStopMutationVariables,
	CreateTripStopMutationType
>;

type UpdateTripStopTestCase = GraphQLTestCase<
	UpdateTripStopMutationVariables,
	UpdateTripStopMutationType
> & {
	createData: CreateTripStopInput;
	updateData: UpdateTripStopInput;
	validate?: (
		response: UpdateTripStopMutationType,
		createdTripStop: any,
	) => void;
};

type RemoveTripStopTestCase = GraphQLTestCase<
	RemoveTripStopMutationVariables,
	RemoveTripStopMutationType
> & {
	createData: CreateTripStopInput;
	shouldCreate?: boolean;
	validate?: (response: RemoveTripStopMutationType) => void;
};

// ============================================
// Test Suite: Create Trip Stop
// ============================================

describe("Graphql TMS Create Trip Stop", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreateTripStopTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(CreateTripStopMutation, testCase.variables);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.tms?.createTripStop).toBeDefined();
			expect(response.data?.tms?.createTripStop?.id).toBeDefined();
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
// Test Suite: Update Trip Stop
// ============================================

describe("Graphql TMS Update Trip Stop", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: UpdateTripStopTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		// Create initial trip stop
		const createResponse = await executor(CreateTripStopMutation, {
			tripStop: testCase.createData,
		});

		expect(createResponse.data?.tms?.createTripStop?.id).toBeDefined();
		const tripStopId = createResponse.data!.tms!.createTripStop!.id!;
		const createdTripStop = createResponse.data!.tms!.createTripStop!;

		// Update trip stop
		const updateResponse = await executor(UpdateTripStopMutation, {
			id: tripStopId,
			tripStop: testCase.updateData,
		});

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(updateResponse.data?.tms?.updateTripStop).toBeDefined();
			if (testCase.validate) {
				testCase.validate(
					updateResponse.data as UpdateTripStopMutationType,
					createdTripStop,
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
// Test Suite: Remove Trip Stop
// ============================================

describe("Graphql TMS Remove Trip Stop", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: RemoveTripStopTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		let tripStopId: string;

		if (testCase.shouldCreate) {
			const createResponse = await executor(CreateTripStopMutation, {
				tripStop: {
					// Add minimal required fields
				} as unknown as CreateTripStopInput,
			});
			tripStopId = createResponse.data!.tms!.createTripStop!.id!;
		} else {
			tripStopId = "00000000-0000-0000-0000-000000000000";
		}

		const deleteResponse = await executor(RemoveTripStopMutation, {
			id: tripStopId,
		});

		if (testCase.success) {
			expect(deleteResponse.errors).toBeUndefined();
			expect(deleteResponse.data?.tms?.removeTripStop).toBeDefined();
		} else {
			if (deleteResponse.errors) {
				expect(Array.isArray(deleteResponse.errors)).toBe(true);
			} else {
				expect(deleteResponse.data?.tms?.removeTripStop?.success).toBe(false);
			}
		}

		if (testCase.validate) {
			testCase.validate(deleteResponse.data as RemoveTripStopMutationType);
		}
	});
});
