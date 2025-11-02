import { beforeAll, describe, expect, it } from "bun:test";
import "../../setup";
import {
	CreateCarrierRateMutation,
	RemoveCarrierRateMutation,
	UpdateCarrierRateMutation,
} from "../../../src/client";
import type {
	CreateCarrierRateInput,
	CreateCarrierRateMutation as CreateCarrierRateMutationType,
	CreateCarrierRateMutationVariables,
	RemoveCarrierRateMutation as RemoveCarrierRateMutationType,
	RemoveCarrierRateMutationVariables,
	UpdateCarrierRateInput,
	UpdateCarrierRateMutation as UpdateCarrierRateMutationType,
	UpdateCarrierRateMutationVariables,
} from "../../../src/client/generated/graphql";
import { graphQLQueryExecutor } from "../../helpers";
import type { GraphQLTestCase } from "../../inputs/helpers";

// ============================================
// Type Definitions
// ============================================

type CreateCarrierRateTestCase = GraphQLTestCase<
	CreateCarrierRateMutationVariables,
	CreateCarrierRateMutationType
>;

type UpdateCarrierRateTestCase = GraphQLTestCase<
	UpdateCarrierRateMutationVariables,
	UpdateCarrierRateMutationType
> & {
	createData: CreateCarrierRateInput;
	updateData: UpdateCarrierRateInput;
	validate?: (response: UpdateCarrierRateMutationType) => void;
};

type RemoveCarrierRateTestCase = GraphQLTestCase<
	RemoveCarrierRateMutationVariables,
	RemoveCarrierRateMutationType
> & {
	createData: CreateCarrierRateInput;
	shouldCreate?: boolean;
	validate?: (response: RemoveCarrierRateMutationType) => void;
};

// ============================================
// Test Suite: Create Carrier Rate
// ============================================

describe("Graphql TMS Create Carrier Rate", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreateCarrierRateTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			CreateCarrierRateMutation,
			testCase.variables,
		);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.tms?.createCarrierRate).toBeDefined();
			expect(response.data?.tms?.createCarrierRate?.id).toBeDefined();
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
// Test Suite: Update Carrier Rate
// ============================================

describe("Graphql TMS Update Carrier Rate", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: UpdateCarrierRateTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		// Create initial rate
		const createResponse = await executor(CreateCarrierRateMutation, {
			carrierRate: testCase.createData,
		});

		expect(createResponse.data?.tms?.createCarrierRate?.id).toBeDefined();
		const rateId = createResponse.data!.tms!.createCarrierRate!.id!;
		const createdRate = createResponse.data!.tms!.createCarrierRate!;

		// Update rate
		const updateResponse = await executor(UpdateCarrierRateMutation, {
			id: rateId,
			carrierRate: testCase.updateData,
		});

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(updateResponse.data?.tms?.updateCarrierRate).toBeDefined();
			if (testCase.validate) {
				testCase.validate(updateResponse.data as UpdateCarrierRateMutationType);
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
// Test Suite: Remove Carrier Rate
// ============================================

describe("Graphql TMS Remove Carrier Rate", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: RemoveCarrierRateTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		let rateId: string;

		if (testCase.shouldCreate) {
			const createResponse = await executor(CreateCarrierRateMutation, {
				carrierRate: {
					// Add minimal required fields
				} as unknown as CreateCarrierRateInput,
			});
			rateId = createResponse.data!.tms!.createCarrierRate!.id!;
		} else {
			rateId = "00000000-0000-0000-0000-000000000000";
		}

		const deleteResponse = await executor(RemoveCarrierRateMutation, {
			id: rateId,
		});

		if (testCase.success) {
			expect(deleteResponse.errors).toBeUndefined();
			expect(deleteResponse.data?.tms?.removeCarrierRate).toBeDefined();
		} else {
			if (deleteResponse.errors) {
				expect(Array.isArray(deleteResponse.errors)).toBe(true);
			} else {
				expect(deleteResponse.data?.tms?.removeCarrierRate?.success).toBe(
					false,
				);
			}
		}

		if (testCase.validate) {
			testCase.validate(deleteResponse.data as RemoveCarrierRateMutationType);
		}
	});
});
