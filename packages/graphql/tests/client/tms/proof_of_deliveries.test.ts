import { describe, expect, it, beforeAll } from "bun:test";
import "../../setup";
import { graphQLQueryExecutor } from "../../helpers";
import type {
	CreateProofOfDeliveryMutation as CreateProofOfDeliveryMutationType,
	CreateProofOfDeliveryMutationVariables,
	UpdateProofOfDeliveryMutation as UpdateProofOfDeliveryMutationType,
	UpdateProofOfDeliveryMutationVariables,
	TableTmsProofOfDeliveryQuery as TableProofOfDeliveryQueryType,
	TableTmsProofOfDeliveryQueryVariables,
} from "../../../src/client/generated/graphql";
import type {
	CreateProofOfDeliveryInput,
	UpdateProofOfDeliveryInput,
} from "../../../src/client/generated/graphql";
import {
	CreateProofOfDeliveryMutation,
	UpdateProofOfDeliveryMutation,
	TableTmsProofOfDeliveryQuery,
} from "../../../src/client";
import type { GraphQLTestCase } from "../../inputs/helpers";

// ============================================
// Type Definitions
// ============================================

type CreateProofOfDeliveryTestCase = GraphQLTestCase<
	CreateProofOfDeliveryMutationVariables,
	CreateProofOfDeliveryMutationType
>;

type UpdateProofOfDeliveryTestCase = GraphQLTestCase<
	UpdateProofOfDeliveryMutationVariables,
	UpdateProofOfDeliveryMutationType
> & {
	createData: CreateProofOfDeliveryInput;
	updateData: UpdateProofOfDeliveryInput;
	validate?: (
		response: UpdateProofOfDeliveryMutationType,
		createdProofOfDelivery: any,
	) => void;
};

type TableProofOfDeliveryTestCase = GraphQLTestCase<
	TableTmsProofOfDeliveryQueryVariables,
	TableProofOfDeliveryQueryType
> & {
	validate: (response: TableProofOfDeliveryQueryType) => void;
};

// ============================================
// Test Suite: Create Proof Of Delivery
// ============================================

describe("Graphql TMS Create Proof Of Delivery", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreateProofOfDeliveryTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			CreateProofOfDeliveryMutation,
			testCase.variables,
		);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.tms?.createProofOfDelivery).toBeDefined();
			expect(response.data?.tms?.createProofOfDelivery?.id).toBeDefined();
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
// Test Suite: Update Proof Of Delivery
// ============================================

describe("Graphql TMS Update Proof Of Delivery", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: UpdateProofOfDeliveryTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		// Create initial proof of delivery
		const createResponse = await executor(CreateProofOfDeliveryMutation, {
			proofOfDelivery: testCase.createData,
		});

		expect(createResponse.data?.tms?.createProofOfDelivery?.id).toBeDefined();
		const proofOfDeliveryId =
			createResponse.data!.tms!.createProofOfDelivery!.id!;
		const createdProofOfDelivery =
			createResponse.data!.tms!.createProofOfDelivery!;

		// Update proof of delivery
		const updateResponse = await executor(UpdateProofOfDeliveryMutation, {
			id: proofOfDeliveryId,
			proofOfDelivery: testCase.updateData,
		});

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(updateResponse.data?.tms?.updateProofOfDelivery).toBeDefined();
			if (testCase.validate) {
				testCase.validate(
					updateResponse.data as UpdateProofOfDeliveryMutationType,
					createdProofOfDelivery,
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
// Test Suite: Table Proofs Of Delivery Query
// ============================================

describe("Graphql TMS Table Proofs Of Delivery Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: TableProofOfDeliveryTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			TableTmsProofOfDeliveryQuery,
			testCase.variables,
		);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.tms?.proofOfDeliveries).toBeDefined();
			testCase.validate(response.data as TableProofOfDeliveryQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});
