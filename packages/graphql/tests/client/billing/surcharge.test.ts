import { beforeAll, describe, expect, it } from "bun:test";
import "../../setup";
import {
	AnalyticsSurchargesQuery,
	CreateSurchargeMutation,
	RemoveSurchargeMutation,
	SearchSurchargesQuery,
	TableSurchargeQuery,
	UpdateSurchargeMutation,
} from "../../../src/client";
import type {
	AnalyticsSurchargesQuery as AnalyticsSurchargesQueryType,
	AnalyticsSurchargesQueryVariables,
	CreateSurchargeInput,
	CreateSurchargeMutation as CreateSurchargeMutationType,
	CreateSurchargeMutationVariables,
	RemoveSurchargeMutation as RemoveSurchargeMutationType,
	RemoveSurchargeMutationVariables,
	SearchSurchargesQuery as SearchSurchargesQueryType,
	SearchSurchargesQueryVariables,
	TableSurchargeQuery as TableSurchargeQueryType,
	TableSurchargeQueryVariables,
	UpdateSurchargeInput,
	UpdateSurchargeMutation as UpdateSurchargeMutationType,
	UpdateSurchargeMutationVariables,
} from "../../../src/client/generated/graphql";
import { graphQLQueryExecutor } from "../../helpers";
import type { GraphQLTestCase } from "../../inputs/helpers";

// ============================================
// Type Definitions
// ============================================

type CreateSurchargeTestCase = GraphQLTestCase<
	CreateSurchargeMutationVariables,
	CreateSurchargeMutationType
>;

type UpdateSurchargeTestCase = GraphQLTestCase<
	UpdateSurchargeMutationVariables,
	UpdateSurchargeMutationType
> & {
	createData: CreateSurchargeInput;
	updateData: UpdateSurchargeInput;
	validate?: (
		response: UpdateSurchargeMutationType,
		createdSurcharge: any,
	) => void;
};

type RemoveSurchargeTestCase = GraphQLTestCase<
	RemoveSurchargeMutationVariables,
	RemoveSurchargeMutationType
> & {
	createData: CreateSurchargeInput;
	shouldCreate?: boolean;
	validate?: (response: RemoveSurchargeMutationType) => void;
};

type TableSurchargeTestCase = GraphQLTestCase<
	TableSurchargeQueryVariables,
	TableSurchargeQueryType
> & {
	validate: (response: TableSurchargeQueryType) => void;
};

type SearchSurchargesTestCase = GraphQLTestCase<
	SearchSurchargesQueryVariables,
	SearchSurchargesQueryType
> & {
	validate: (response: SearchSurchargesQueryType) => void;
};

type AnalyticsSurchargesTestCase = GraphQLTestCase<
	AnalyticsSurchargesQueryVariables,
	AnalyticsSurchargesQueryType
> & {
	validate: (response: AnalyticsSurchargesQueryType) => void;
};
// ============================================
// Test Suite: Create Surcharge
// ============================================

describe("Graphql Create Surcharge", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreateSurchargeTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			CreateSurchargeMutation,
			testCase.variables,
		);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.billing?.createSurcharge).toBeDefined();
			expect(response.data?.billing?.createSurcharge?.id).toBeDefined();
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
// Test Suite: Update Surcharge
// ============================================

describe("Graphql Update Surcharge", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: UpdateSurchargeTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		// Create initial Surcharge
		const createResponse = await executor(CreateSurchargeMutation, {
			surcharge: testCase.createData,
		});

		expect(createResponse.data?.billing?.createSurcharge?.id).toBeDefined();
		const surchargeId = createResponse.data!.billing!.createSurcharge!.id!;
		const createdSurcharge = createResponse.data!.billing!.createSurcharge!;

		// Update Surcharge
		const updateResponse = await executor(UpdateSurchargeMutation, {
			id: testCase.variables.id,
			surcharge: testCase.updateData,
		});

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(updateResponse.data?.billing?.updateSurcharge).toBeDefined();
			if (testCase.validate) {
				testCase.validate(
					updateResponse.data as UpdateSurchargeMutationType,
					createdSurcharge,
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
// Test Suite: Remove Surcharge
// ============================================

describe("Graphql Remove Surcharge", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: RemoveSurchargeTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		let surchargeId: string;

		if (testCase.shouldCreate) {
			const createResponse = await executor(CreateSurchargeMutation, {
				surcharge: {
					// Add minimal required fields
				} as unknown as CreateSurchargeInput,
			});
			surchargeId = createResponse.data!.billing!.createSurcharge!.id!;
		} else {
			surchargeId = "00000000-0000-0000-0000-000000000000";
		}

		const deleteResponse = await executor(RemoveSurchargeMutation, {
			id: surchargeId,
		});

		if (testCase.success) {
			expect(deleteResponse.errors).toBeUndefined();
			expect(deleteResponse.data?.billing?.removeSurcharge).toBeDefined();
		} else {
			if (deleteResponse.errors) {
				expect(Array.isArray(deleteResponse.errors)).toBe(true);
			} else {
				expect(deleteResponse.data?.billing?.removeSurcharge?.success).toBe(
					false,
				);
			}
		}

		if (testCase.validate) {
			testCase.validate(deleteResponse.data as RemoveSurchargeMutationType);
		}
	});
});

// ============================================
// Test Suite: Table Surcharges Query
// ============================================

describe("Graphql Table Surcharges Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: TableSurchargeTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(TableSurchargeQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.billing?.surcharges).toBeDefined();
			testCase.validate(response.data as TableSurchargeQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});

// ============================================
// Test Suite: Search Surcharges Query
// ============================================

describe("Graphql Search Surcharges Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: SearchSurchargesTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(SearchSurchargesQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.billing?.surcharges).toBeDefined();
			testCase.validate(response.data as SearchSurchargesQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});

// ============================================
// Test Suite: Analytics Surcharges Query
// ============================================

describe("Graphql Analytics Surcharges Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: AnalyticsSurchargesTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			AnalyticsSurchargesQuery,
			testCase.variables,
		);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.billing?.surcharges).toBeDefined();
			testCase.validate(response.data as AnalyticsSurchargesQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});
