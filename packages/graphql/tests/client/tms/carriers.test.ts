import { beforeAll, describe, expect, it } from "bun:test";
import "../../setup";
import {
	CreateCarrierMutation,
	RemoveCarrierMutation,
	SearchCarriersQuery,
	TableCarrierQuery,
	UpdateCarrierMutation,
} from "../../../src/client";
import type {
	CreateCarrierInput,
	CreateCarrierMutation as CreateCarrierMutationType,
	CreateCarrierMutationVariables,
	RemoveCarrierMutation as RemoveCarrierMutationType,
	RemoveCarrierMutationVariables,
	SearchCarriersQuery as SearchCarriersQueryType,
	SearchCarriersQueryVariables,
	TableCarrierQueryQueryVariables,
	TableCarrierQueryQuery as TableCarrierQueryType,
	UpdateCarrierInput,
	UpdateCarrierMutation as UpdateCarrierMutationType,
	UpdateCarrierMutationVariables,
} from "../../../src/client/generated/graphql";
import { graphQLQueryExecutor } from "../../helpers";
import type { GraphQLTestCase } from "../../inputs/helpers";

// ============================================
// Type Definitions
// ============================================

type CreateCarrierTestCase = GraphQLTestCase<
	CreateCarrierMutationVariables,
	CreateCarrierMutationType
>;

type UpdateCarrierTestCase = GraphQLTestCase<
	UpdateCarrierMutationVariables,
	UpdateCarrierMutationType
> & {
	createData: CreateCarrierInput;
	updateData: UpdateCarrierInput;
	validate?: (response: UpdateCarrierMutationType) => void;
};

type RemoveCarrierTestCase = GraphQLTestCase<
	RemoveCarrierMutationVariables,
	RemoveCarrierMutationType
> & {
	createData: CreateCarrierInput;
	shouldCreate?: boolean;
	validate?: (response: RemoveCarrierMutationType) => void;
};

type TableCarrierTestCase = GraphQLTestCase<
	TableCarrierQueryQueryVariables,
	TableCarrierQueryType
> & {
	validate: (response: TableCarrierQueryType) => void;
};

type SearchCarrierTestCase = GraphQLTestCase<
	SearchCarriersQueryVariables,
	SearchCarriersQueryType
> & {
	validate: (response: SearchCarriersQueryType) => void;
};

// ============================================
// Test Suite: Create Carrier
// ============================================

describe("Graphql TMS Create Carrier", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreateCarrierTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(CreateCarrierMutation, testCase.variables);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.tms?.createCarrier).toBeDefined();
			expect(response.data?.tms?.createCarrier?.id).toBeDefined();
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
// Test Suite: Update Carrier
// ============================================

describe("Graphql TMS Update Carrier", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: UpdateCarrierTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		// Create initial carrier
		const createResponse = await executor(CreateCarrierMutation, {
			carrier: testCase.createData,
		});

		expect(createResponse.data?.tms?.createCarrier?.id).toBeDefined();
		const carrierId = createResponse.data!.tms!.createCarrier!.id!;
		const createdCarrier = createResponse.data!.tms!.createCarrier!;

		// Update carrier
		const updateResponse = await executor(UpdateCarrierMutation, {
			id: carrierId,
			carrier: testCase.updateData,
		});

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(updateResponse.data?.tms?.updateCarrier).toBeDefined();
			if (testCase.validate) {
				testCase.validate(updateResponse.data as UpdateCarrierMutationType);
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
// Test Suite: Remove Carrier
// ============================================

describe("Graphql TMS Remove Carrier", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: RemoveCarrierTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		let carrierId: string;

		if (testCase.shouldCreate) {
			const createResponse = await executor(CreateCarrierMutation, {
				carrier: {
					// Add minimal required fields
				} as unknown as CreateCarrierInput,
			});
			carrierId = createResponse.data!.tms!.createCarrier!.id!;
		} else {
			carrierId = "00000000-0000-0000-0000-000000000000";
		}

		const deleteResponse = await executor(RemoveCarrierMutation, {
			id: carrierId,
		});

		if (testCase.success) {
			expect(deleteResponse.errors).toBeUndefined();
			expect(deleteResponse.data?.tms?.removeCarrier).toBeDefined();
		} else {
			if (deleteResponse.errors) {
				expect(Array.isArray(deleteResponse.errors)).toBe(true);
			} else {
				expect(deleteResponse.data?.tms?.removeCarrier?.success).toBe(false);
			}
		}

		if (testCase.validate) {
			testCase.validate(deleteResponse.data as RemoveCarrierMutationType);
		}
	});
});

// ============================================
// Test Suite: Table Carriers Query
// ============================================

describe("Graphql TMS Table Carriers Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: TableCarrierTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(TableCarrierQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.tms?.carriers).toBeDefined();
			testCase.validate(response.data as TableCarrierQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});

// ============================================
// Test Suite: Search Carriers Query
// ============================================

describe("Graphql TMS Search Carriers Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: SearchCarrierTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(SearchCarriersQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.tms?.carriers).toBeDefined();
			testCase.validate(response.data as SearchCarriersQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});
