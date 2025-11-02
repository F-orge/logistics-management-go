import { beforeAll, describe, expect, it } from "bun:test";
import "../../setup";
import {
	AnalyticsCasesQuery,
	CreateCaseMutation,
	RemoveCaseMutation,
	SearchCasesQuery,
	TableCaseQuery,
	UpdateCaseMutation,
} from "../../../src/client";
import type {
	AnalyticsCasesQuery as AnalyticsCasesQueryType,
	AnalyticsCasesQueryVariables,
	CreateCaseInput,
	CreateCaseMutation as CreateCaseMutationType,
	CreateCaseMutationVariables,
	RemoveCaseMutation as RemoveCaseMutationType,
	RemoveCaseMutationVariables,
	SearchCasesQuery as SearchCasesQueryType,
	SearchCasesQueryVariables,
	TableCaseQuery as TableCaseQueryType,
	TableCaseQueryVariables,
	UpdateCaseInput,
	UpdateCaseMutation as UpdateCaseMutationType,
	UpdateCaseMutationVariables,
} from "../../../src/client/generated/graphql";
import { graphQLQueryExecutor } from "../../helpers";
import type { GraphQLTestCase } from "../../inputs/helpers";

// ============================================
// Type Definitions
// ============================================

type CreateCaseTestCase = GraphQLTestCase<
	CreateCaseMutationVariables,
	CreateCaseMutationType
>;

type UpdateCaseTestCase = GraphQLTestCase<
	UpdateCaseMutationVariables,
	UpdateCaseMutationType
> & {
	createData: CreateCaseInput;
	updateData: UpdateCaseInput;
	validate?: (response: UpdateCaseMutationType, createdCase: any) => void;
};

type RemoveCaseTestCase = GraphQLTestCase<
	RemoveCaseMutationVariables,
	RemoveCaseMutationType
> & {
	shouldCreate: boolean;
	validate?: (response: RemoveCaseMutationType) => void;
};

type TableCaseTestCase = GraphQLTestCase<
	TableCaseQueryVariables,
	TableCaseQueryType
> & {
	validate: (response: TableCaseQueryType) => void;
};

type SearchCaseTestCase = GraphQLTestCase<
	SearchCasesQueryVariables,
	SearchCasesQueryType
> & {
	validate: (response: SearchCasesQueryType) => void;
};

type AnalyticsCaseTestCase = GraphQLTestCase<
	AnalyticsCasesQueryVariables,
	AnalyticsCasesQueryType
> & {
	validate: (response: AnalyticsCasesQueryType) => void;
};

// ============================================
// Helper Functions
// ============================================

// TODO: Add helper functions as needed

// ============================================
// Test Suite: Create Case
// ============================================

describe("Graphql CRM Create Case", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreateCaseTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(CreateCaseMutation, testCase.variables);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.crm?.createCase).toBeDefined();
			expect(response.data?.crm?.createCase?.id).toBeDefined();
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
// Test Suite: Update Case
// ============================================

describe("Graphql CRM Update Case", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: UpdateCaseTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		// Create initial case
		const createResponse = await executor(CreateCaseMutation, {
			case: testCase.createData,
		});

		expect(createResponse.data?.crm?.createCase?.id).toBeDefined();
		const caseId = createResponse.data!.crm!.createCase!.id!;
		const createdCase = createResponse.data!.crm!.createCase!;

		// Update case
		const updateResponse = await executor(UpdateCaseMutation, {
			id: caseId,
			case: testCase.updateData,
		});

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(updateResponse.data?.crm?.updateCase).toBeDefined();
			if (testCase.validate) {
				testCase.validate(
					updateResponse.data as UpdateCaseMutationType,
					createdCase,
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
// Test Suite: Remove Case
// ============================================

describe("Graphql CRM Remove Case", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: RemoveCaseTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		let caseId: string;

		if (testCase.shouldCreate) {
			const createResponse = await executor(CreateCaseMutation, {
				case: {
					description: "Case to delete",
				} as CreateCaseInput,
			});
			caseId = createResponse.data!.crm!.createCase!.id!;
		} else {
			caseId = "00000000-0000-0000-0000-000000000000";
		}

		const deleteResponse = await executor(RemoveCaseMutation, {
			id: caseId,
		});

		if (testCase.success) {
			expect(deleteResponse.errors).toBeUndefined();
			expect(deleteResponse.data?.crm?.removeCase).toBeDefined();
		} else {
			if (deleteResponse.errors) {
				expect(Array.isArray(deleteResponse.errors)).toBe(true);
			} else {
				expect(deleteResponse.data?.crm?.removeCase?.success).toBe(false);
			}
		}

		if (testCase.validate) {
			testCase.validate(deleteResponse.data as RemoveCaseMutationType);
		}
	});
});

// ============================================
// Test Suite: Table Case Query
// ============================================

describe("Graphql CRM Table Case Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(async () => {
		executor = graphQLQueryExecutor({ enableJWT: false });
		// TODO: Setup test data in beforeAll if needed
	});

	const cases: TableCaseTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(TableCaseQuery, testCase.variables);
		testCase.validate(response.data as TableCaseQueryType);
	});
});

// ============================================
// Test Suite: Search Cases Query
// ============================================

describe("Graphql CRM Search Cases Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(async () => {
		executor = graphQLQueryExecutor({ enableJWT: false });
		// TODO: Setup test data in beforeAll if needed
	});

	const cases: SearchCaseTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(SearchCasesQuery, testCase.variables);
		testCase.validate(response.data as SearchCasesQueryType);
	});
});

// ============================================
// Test Suite: Analytics Cases Query
// ============================================

describe("Graphql CRM Analytics Cases Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(async () => {
		executor = graphQLQueryExecutor({ enableJWT: false });
		// TODO: Setup test data in beforeAll if needed
	});

	const cases: AnalyticsCaseTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(AnalyticsCasesQuery, testCase.variables);
		testCase.validate(response.data as AnalyticsCasesQueryType);
	});
});
