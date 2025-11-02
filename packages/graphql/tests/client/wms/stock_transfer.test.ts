import { beforeAll, describe, expect, it } from "bun:test";
import "../../setup";
import {
	AnalyticsStockTransfersQuery,
	CreateStockTransferMutation,
	RemoveStockTransferMutation,
	TableStockTransferQuery,
	UpdateStockTransferMutation,
} from "../../../src/client";
import type {
	AnalyticsStockTransfersQuery as AnalyticsStockTransfersQueryType,
	AnalyticsStockTransfersQueryVariables,
	CreateStockTransferInput,
	CreateStockTransferMutation as CreateStockTransferMutationType,
	CreateStockTransferMutationVariables,
	RemoveStockTransferMutation as RemoveStockTransferMutationType,
	RemoveStockTransferMutationVariables,
	TableStockTransferQuery as TableStockTransferQueryType,
	TableStockTransferQueryVariables,
	UpdateStockTransferInput,
	UpdateStockTransferMutation as UpdateStockTransferMutationType,
	UpdateStockTransferMutationVariables,
} from "../../../src/client/generated/graphql";
import { graphQLQueryExecutor } from "../../helpers";
import type { GraphQLTestCase } from "../../inputs/helpers";

// ============================================
// Type Definitions
// ============================================

type CreateStockTransferTestCase = GraphQLTestCase<
	CreateStockTransferMutationVariables,
	CreateStockTransferMutationType
>;

type UpdateStockTransferTestCase = GraphQLTestCase<
	UpdateStockTransferMutationVariables,
	UpdateStockTransferMutationType
> & {
	createData: CreateStockTransferInput;
	updateData: UpdateStockTransferInput;
	validate?: (
		response: UpdateStockTransferMutationType,
		createdStockTransfer: any,
	) => void;
};

type RemoveStockTransferTestCase = GraphQLTestCase<
	RemoveStockTransferMutationVariables,
	RemoveStockTransferMutationType
> & {
	createData: CreateStockTransferInput;
	shouldCreate?: boolean;
	validate?: (response: RemoveStockTransferMutationType) => void;
};

type TableStockTransferTestCase = GraphQLTestCase<
	TableStockTransferQueryVariables,
	TableStockTransferQueryType
> & {
	validate: (response: TableStockTransferQueryType) => void;
};

type AnalyticsStockTransfersTestCase = GraphQLTestCase<
	AnalyticsStockTransfersQueryVariables,
	AnalyticsStockTransfersQueryType
> & {
	validate: (response: AnalyticsStockTransfersQueryType) => void;
};
// ============================================
// Test Suite: Create StockTransfer
// ============================================

describe("Graphql Create StockTransfer", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreateStockTransferTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			CreateStockTransferMutation,
			testCase.variables,
		);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.createStockTransfer).toBeDefined();
			expect(response.data?.wms?.createStockTransfer?.id).toBeDefined();
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
// Test Suite: Update StockTransfer
// ============================================

describe("Graphql Update StockTransfer", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: UpdateStockTransferTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		// Create initial StockTransfer
		const createResponse = await executor(CreateStockTransferMutation, {
			stockTransfer: testCase.createData,
		});

		expect(createResponse.data?.wms?.createStockTransfer?.id).toBeDefined();
		const stockTransferId = createResponse.data!.wms!.createStockTransfer!.id!;
		const createdStockTransfer = createResponse.data!.wms!.createStockTransfer!;

		// Update StockTransfer
		const updateResponse = await executor(UpdateStockTransferMutation, {
			id: testCase.variables.id,
			stockTransfer: testCase.updateData,
		});

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(updateResponse.data?.wms?.updateStockTransfer).toBeDefined();
			if (testCase.validate) {
				testCase.validate(
					updateResponse.data as UpdateStockTransferMutationType,
					createdStockTransfer,
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
// Test Suite: Remove StockTransfer
// ============================================

describe("Graphql Remove StockTransfer", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: RemoveStockTransferTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		let stockTransferId: string;

		if (testCase.shouldCreate) {
			const createResponse = await executor(CreateStockTransferMutation, {
				stockTransfer: {
					// Add minimal required fields
				} as unknown as CreateStockTransferInput,
			});
			stockTransferId = createResponse.data!.wms!.createStockTransfer!.id!;
		} else {
			stockTransferId = "00000000-0000-0000-0000-000000000000";
		}

		const deleteResponse = await executor(RemoveStockTransferMutation, {
			id: stockTransferId,
		});

		if (testCase.success) {
			expect(deleteResponse.errors).toBeUndefined();
			expect(deleteResponse.data?.wms?.removeStockTransfer).toBeDefined();
		} else {
			if (deleteResponse.errors) {
				expect(Array.isArray(deleteResponse.errors)).toBe(true);
			} else {
				expect(deleteResponse.data?.wms?.removeStockTransfer?.success).toBe(
					false,
				);
			}
		}

		if (testCase.validate) {
			testCase.validate(deleteResponse.data as RemoveStockTransferMutationType);
		}
	});
});

// ============================================
// Test Suite: Table StockTransfers Query
// ============================================

describe("Graphql Table StockTransfers Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: TableStockTransferTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			TableStockTransferQuery,
			testCase.variables,
		);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.stockTransfers).toBeDefined();
			testCase.validate(response.data as TableStockTransferQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});

// ============================================
// Test Suite: Analytics StockTransfers Query
// ============================================

describe("Graphql Analytics StockTransfers Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: AnalyticsStockTransfersTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			AnalyticsStockTransfersQuery,
			testCase.variables,
		);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.stockTransfers).toBeDefined();
			testCase.validate(response.data as AnalyticsStockTransfersQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});
