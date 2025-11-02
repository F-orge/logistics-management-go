import { beforeAll, describe, expect, it } from "bun:test";
import "../../setup";
import {
	AnalyticsPutawayRulesQuery,
	CreatePutawayRuleMutation,
	RemovePutawayRuleMutation,
	TablePutawayRuleQuery,
	UpdatePutawayRuleMutation,
} from "../../../src/client";
import type {
	AnalyticsPutawayRulesQuery as AnalyticsPutawayRulesQueryType,
	AnalyticsPutawayRulesQueryVariables,
	CreatePutawayRuleInput,
	CreatePutawayRuleMutation as CreatePutawayRuleMutationType,
	CreatePutawayRuleMutationVariables,
	RemovePutawayRuleMutation as RemovePutawayRuleMutationType,
	RemovePutawayRuleMutationVariables,
	TablePutawayRuleQuery as TablePutawayRuleQueryType,
	TablePutawayRuleQueryVariables,
	UpdatePutawayRuleInput,
	UpdatePutawayRuleMutation as UpdatePutawayRuleMutationType,
	UpdatePutawayRuleMutationVariables,
} from "../../../src/client/generated/graphql";
import { graphQLQueryExecutor } from "../../helpers";
import type { GraphQLTestCase } from "../../inputs/helpers";

// ============================================
// Type Definitions
// ============================================

type CreatePutawayRuleTestCase = GraphQLTestCase<
	CreatePutawayRuleMutationVariables,
	CreatePutawayRuleMutationType
>;

type UpdatePutawayRuleTestCase = GraphQLTestCase<
	UpdatePutawayRuleMutationVariables,
	UpdatePutawayRuleMutationType
> & {
	createData: CreatePutawayRuleInput;
	updateData: UpdatePutawayRuleInput;
	validate?: (
		response: UpdatePutawayRuleMutationType,
		createdPutawayRule: any,
	) => void;
};

type RemovePutawayRuleTestCase = GraphQLTestCase<
	RemovePutawayRuleMutationVariables,
	RemovePutawayRuleMutationType
> & {
	createData: CreatePutawayRuleInput;
	shouldCreate?: boolean;
	validate?: (response: RemovePutawayRuleMutationType) => void;
};

type TablePutawayRuleTestCase = GraphQLTestCase<
	TablePutawayRuleQueryVariables,
	TablePutawayRuleQueryType
> & {
	validate: (response: TablePutawayRuleQueryType) => void;
};

type AnalyticsPutawayRulesTestCase = GraphQLTestCase<
	AnalyticsPutawayRulesQueryVariables,
	AnalyticsPutawayRulesQueryType
> & {
	validate: (response: AnalyticsPutawayRulesQueryType) => void;
};
// ============================================
// Test Suite: Create PutawayRule
// ============================================

describe("Graphql Create PutawayRule", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreatePutawayRuleTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			CreatePutawayRuleMutation,
			testCase.variables,
		);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.createPutawayRule).toBeDefined();
			expect(response.data?.wms?.createPutawayRule?.id).toBeDefined();
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
// Test Suite: Update PutawayRule
// ============================================

describe("Graphql Update PutawayRule", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: UpdatePutawayRuleTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		// Create initial PutawayRule
		const createResponse = await executor(CreatePutawayRuleMutation, {
			putawayRule: testCase.createData,
		});

		expect(createResponse.data?.wms?.createPutawayRule?.id).toBeDefined();
		const putawayRuleId = createResponse.data!.wms!.createPutawayRule!.id!;
		const createdPutawayRule = createResponse.data!.wms!.createPutawayRule!;

		// Update PutawayRule
		const updateResponse = await executor(UpdatePutawayRuleMutation, {
			id: testCase.variables.id,
			putawayRule: testCase.updateData,
		});

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(updateResponse.data?.wms?.updatePutawayRule).toBeDefined();
			if (testCase.validate) {
				testCase.validate(
					updateResponse.data as UpdatePutawayRuleMutationType,
					createdPutawayRule,
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
// Test Suite: Remove PutawayRule
// ============================================

describe("Graphql Remove PutawayRule", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: RemovePutawayRuleTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		let putawayRuleId: string;

		if (testCase.shouldCreate) {
			const createResponse = await executor(CreatePutawayRuleMutation, {
				putawayRule: {
					// Add minimal required fields
				} as unknown as CreatePutawayRuleInput,
			});
			putawayRuleId = createResponse.data!.wms!.createPutawayRule!.id!;
		} else {
			putawayRuleId = "00000000-0000-0000-0000-000000000000";
		}

		const deleteResponse = await executor(RemovePutawayRuleMutation, {
			id: putawayRuleId,
		});

		if (testCase.success) {
			expect(deleteResponse.errors).toBeUndefined();
			expect(deleteResponse.data?.wms?.removePutawayRule).toBeDefined();
		} else {
			if (deleteResponse.errors) {
				expect(Array.isArray(deleteResponse.errors)).toBe(true);
			} else {
				expect(deleteResponse.data?.wms?.removePutawayRule?.success).toBe(
					false,
				);
			}
		}

		if (testCase.validate) {
			testCase.validate(deleteResponse.data as RemovePutawayRuleMutationType);
		}
	});
});

// ============================================
// Test Suite: Table PutawayRules Query
// ============================================

describe("Graphql Table PutawayRules Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: TablePutawayRuleTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(TablePutawayRuleQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.putawayRules).toBeDefined();
			testCase.validate(response.data as TablePutawayRuleQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});

// ============================================
// Test Suite: Analytics PutawayRules Query
// ============================================

describe("Graphql Analytics PutawayRules Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: AnalyticsPutawayRulesTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			AnalyticsPutawayRulesQuery,
			testCase.variables,
		);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.putawayRules).toBeDefined();
			testCase.validate(response.data as AnalyticsPutawayRulesQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});
