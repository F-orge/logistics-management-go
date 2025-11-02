import { describe, expect, it, beforeAll } from "bun:test";
import "../../setup";
import { graphQLQueryExecutor } from "../../helpers";
import type {
	CreateRateRuleMutation as CreateRateRuleMutationType,
	CreateRateRuleMutationVariables,
	UpdateRateRuleMutation as UpdateRateRuleMutationType,
	UpdateRateRuleMutationVariables,
	RemoveRateRuleMutation as RemoveRateRuleMutationType,
	RemoveRateRuleMutationVariables,
	TableRateRuleQuery as TableRateRuleQueryType,
	TableRateRuleQueryVariables,
	SearchRateRulesQuery as SearchRateRulesQueryType,
	SearchRateRulesQueryVariables,
	AnalyticsRateRulesQuery as AnalyticsRateRulesQueryType,
	AnalyticsRateRulesQueryVariables,
} from "../../../src/client/generated/graphql";
import type {
	CreateRateRuleInput,
	UpdateRateRuleInput,
} from "../../../src/client/generated/graphql";
import {
	CreateRateRuleMutation,
	UpdateRateRuleMutation,
	RemoveRateRuleMutation,
	TableRateRuleQuery,
	SearchRateRulesQuery,
	AnalyticsRateRulesQuery,
} from "../../../src/client";
import type { GraphQLTestCase } from "../../inputs/helpers";
// ============================================
// Type Definitions
// ============================================

type CreateRateRuleTestCase = GraphQLTestCase<
	CreateRateRuleMutationVariables,
	CreateRateRuleMutationType
>;

type UpdateRateRuleTestCase = GraphQLTestCase<
	UpdateRateRuleMutationVariables,
	UpdateRateRuleMutationType
> & {
	createData: CreateRateRuleInput;
	updateData: UpdateRateRuleInput;
	validate?: (response: UpdateRateRuleMutationType, createdRateRule: any) => void;
};

type RemoveRateRuleTestCase = GraphQLTestCase<
	RemoveRateRuleMutationVariables,
	RemoveRateRuleMutationType
> & {
	createData: CreateRateRuleInput;
	shouldCreate?: boolean;
	validate?: (response: RemoveRateRuleMutationType) => void;
};

type TableRateRuleTestCase = GraphQLTestCase<
	TableRateRuleQueryVariables,
	TableRateRuleQueryType
> & {
	validate: (response: TableRateRuleQueryType) => void;
};

type SearchRateRulesTestCase = GraphQLTestCase<
	SearchRateRulesQueryVariables,
	SearchRateRulesQueryType
> & {
	validate: (response: SearchRateRulesQueryType) => void;
};

type AnalyticsRateRulesTestCase = GraphQLTestCase<
	AnalyticsRateRulesQueryVariables,
	AnalyticsRateRulesQueryType
> & {
	validate: (response: AnalyticsRateRulesQueryType) => void;
};
// ============================================
// Test Suite: Create RateRule
// ============================================

describe("Graphql Create RateRule", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreateRateRuleTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(CreateRateRuleMutation, testCase.variables);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.billing?.createRateRule).toBeDefined();
			expect(response.data?.billing?.createRateRule?.id).toBeDefined();
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
// Test Suite: Update RateRule
// ============================================

describe("Graphql Update RateRule", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: UpdateRateRuleTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		// Create initial RateRule
		const createResponse = await executor(CreateRateRuleMutation, {
			rateRule: testCase.createData,
		});

		expect(createResponse.data?.billing?.createRateRule?.id).toBeDefined();
		const rateRuleId = createResponse.data!.billing!.createRateRule!.id!;
		const createdRateRule = createResponse.data!.billing!.createRateRule!;

		// Update RateRule
		const updateResponse = await executor(UpdateRateRuleMutation, {
			id: testCase.variables.id,
			rateRule: testCase.updateData,
		});

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(updateResponse.data?.billing?.updateRateRule).toBeDefined();
			if (testCase.validate) {
				testCase.validate(
					updateResponse.data as UpdateRateRuleMutationType,
					createdRateRule,
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
// Test Suite: Remove RateRule
// ============================================

describe("Graphql Remove RateRule", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: RemoveRateRuleTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		let rateRuleId: string;

		if (testCase.shouldCreate) {
			const createResponse = await executor(CreateRateRuleMutation, {
				rateRule: {
					// Add minimal required fields
				} as unknown as CreateRateRuleInput,
			});
			rateRuleId = createResponse.data!.billing!.createRateRule!.id!;
		} else {
			rateRuleId = "00000000-0000-0000-0000-000000000000";
		}

		const deleteResponse = await executor(RemoveRateRuleMutation, {
			id: rateRuleId,
		});

		if (testCase.success) {
			expect(deleteResponse.errors).toBeUndefined();
			expect(deleteResponse.data?.billing?.removeRateRule).toBeDefined();
		} else {
			if (deleteResponse.errors) {
				expect(Array.isArray(deleteResponse.errors)).toBe(true);
			} else {
				expect(deleteResponse.data?.billing?.removeRateRule?.success).toBe(false);
			}
		}

		if (testCase.validate) {
			testCase.validate(deleteResponse.data as RemoveRateRuleMutationType);
		}
	});
});

// ============================================
// Test Suite: Table RateRules Query
// ============================================

describe("Graphql Table RateRules Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: TableRateRuleTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(TableRateRuleQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.billing?.rateRules).toBeDefined();
			testCase.validate(response.data as TableRateRuleQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});

// ============================================
// Test Suite: Search RateRules Query
// ============================================

describe("Graphql Search RateRules Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: SearchRateRulesTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(SearchRateRulesQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.billing?.rateRules).toBeDefined();
			testCase.validate(response.data as SearchRateRulesQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});

// ============================================
// Test Suite: Analytics RateRules Query
// ============================================

describe("Graphql Analytics RateRules Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: AnalyticsRateRulesTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(AnalyticsRateRulesQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.billing?.rateRules).toBeDefined();
			testCase.validate(response.data as AnalyticsRateRulesQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});
