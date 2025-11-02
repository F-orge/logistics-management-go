import { beforeAll, describe, expect, it } from "bun:test";
import "../../setup";
import {
	AnalyticsBinThresholdsQuery,
	CreateBinThresholdMutation,
	RemoveBinThresholdMutation,
	TableBinThresholdQuery,
	UpdateBinThresholdMutation,
} from "../../../src/client";
import type {
	AnalyticsBinThresholdsQuery as AnalyticsBinThresholdsQueryType,
	AnalyticsBinThresholdsQueryVariables,
	CreateBinThresholdInput,
	CreateBinThresholdMutation as CreateBinThresholdMutationType,
	CreateBinThresholdMutationVariables,
	RemoveBinThresholdMutation as RemoveBinThresholdMutationType,
	RemoveBinThresholdMutationVariables,
	TableBinThresholdQuery as TableBinThresholdQueryType,
	TableBinThresholdQueryVariables,
	UpdateBinThresholdInput,
	UpdateBinThresholdMutation as UpdateBinThresholdMutationType,
	UpdateBinThresholdMutationVariables,
} from "../../../src/client/generated/graphql";
import { graphQLQueryExecutor } from "../../helpers";
import type { GraphQLTestCase } from "../../inputs/helpers";

// ============================================
// Type Definitions
// ============================================

type CreateBinThresholdTestCase = GraphQLTestCase<
	CreateBinThresholdMutationVariables,
	CreateBinThresholdMutationType
>;

type UpdateBinThresholdTestCase = GraphQLTestCase<
	UpdateBinThresholdMutationVariables,
	UpdateBinThresholdMutationType
> & {
	createData: CreateBinThresholdInput;
	updateData: UpdateBinThresholdInput;
	validate?: (
		response: UpdateBinThresholdMutationType,
		createdBinThreshold: any,
	) => void;
};

type RemoveBinThresholdTestCase = GraphQLTestCase<
	RemoveBinThresholdMutationVariables,
	RemoveBinThresholdMutationType
> & {
	createData: CreateBinThresholdInput;
	shouldCreate?: boolean;
	validate?: (response: RemoveBinThresholdMutationType) => void;
};

type TableBinThresholdTestCase = GraphQLTestCase<
	TableBinThresholdQueryVariables,
	TableBinThresholdQueryType
> & {
	validate: (response: TableBinThresholdQueryType) => void;
};

type AnalyticsBinThresholdsTestCase = GraphQLTestCase<
	AnalyticsBinThresholdsQueryVariables,
	AnalyticsBinThresholdsQueryType
> & {
	validate: (response: AnalyticsBinThresholdsQueryType) => void;
};
// ============================================
// Test Suite: Create BinThreshold
// ============================================

describe("Graphql Create BinThreshold", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreateBinThresholdTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			CreateBinThresholdMutation,
			testCase.variables,
		);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.createBinThreshold).toBeDefined();
			expect(response.data?.wms?.createBinThreshold?.id).toBeDefined();
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
// Test Suite: Update BinThreshold
// ============================================

describe("Graphql Update BinThreshold", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: UpdateBinThresholdTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		// Create initial BinThreshold
		const createResponse = await executor(CreateBinThresholdMutation, {
			binThreshold: testCase.createData,
		});

		expect(createResponse.data?.wms?.createBinThreshold?.id).toBeDefined();
		const binThresholdId = createResponse.data!.wms!.createBinThreshold!.id!;
		const createdBinThreshold = createResponse.data!.wms!.createBinThreshold!;

		// Update BinThreshold
		const updateResponse = await executor(UpdateBinThresholdMutation, {
			id: testCase.variables.id,
			binThreshold: testCase.updateData,
		});

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(updateResponse.data?.wms?.updateBinThreshold).toBeDefined();
			if (testCase.validate) {
				testCase.validate(
					updateResponse.data as UpdateBinThresholdMutationType,
					createdBinThreshold,
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
// Test Suite: Remove BinThreshold
// ============================================

describe("Graphql Remove BinThreshold", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: RemoveBinThresholdTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		let binThresholdId: string;

		if (testCase.shouldCreate) {
			const createResponse = await executor(CreateBinThresholdMutation, {
				binThreshold: {
					// Add minimal required fields
				} as unknown as CreateBinThresholdInput,
			});
			binThresholdId = createResponse.data!.wms!.createBinThreshold!.id!;
		} else {
			binThresholdId = "00000000-0000-0000-0000-000000000000";
		}

		const deleteResponse = await executor(RemoveBinThresholdMutation, {
			id: binThresholdId,
		});

		if (testCase.success) {
			expect(deleteResponse.errors).toBeUndefined();
			expect(deleteResponse.data?.wms?.removeBinThreshold).toBeDefined();
		} else {
			if (deleteResponse.errors) {
				expect(Array.isArray(deleteResponse.errors)).toBe(true);
			} else {
				expect(deleteResponse.data?.wms?.removeBinThreshold?.success).toBe(
					false,
				);
			}
		}

		if (testCase.validate) {
			testCase.validate(deleteResponse.data as RemoveBinThresholdMutationType);
		}
	});
});

// ============================================
// Test Suite: Table BinThresholds Query
// ============================================

describe("Graphql Table BinThresholds Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: TableBinThresholdTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(TableBinThresholdQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.binThresholds).toBeDefined();
			testCase.validate(response.data as TableBinThresholdQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});

// ============================================
// Test Suite: Analytics BinThresholds Query
// ============================================

describe("Graphql Analytics BinThresholds Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: AnalyticsBinThresholdsTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			AnalyticsBinThresholdsQuery,
			testCase.variables,
		);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.binThresholds).toBeDefined();
			testCase.validate(response.data as AnalyticsBinThresholdsQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});
