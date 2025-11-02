import { describe, expect, it, beforeAll } from "bun:test";
import "../../setup";
import { graphQLQueryExecutor } from "../../helpers";
import type {
	CreateClientAccountMutation as CreateClientAccountMutationType,
	CreateClientAccountMutationVariables,
	UpdateClientAccountMutation as UpdateClientAccountMutationType,
	UpdateClientAccountMutationVariables,
	RemoveClientAccountMutation as RemoveClientAccountMutationType,
	RemoveClientAccountMutationVariables,
	TableClientAccountQuery as TableClientAccountQueryType,
	TableClientAccountQueryVariables,
	SearchClientAccountsQuery as SearchClientAccountsQueryType,
	SearchClientAccountsQueryVariables,
	AnalyticsClientAccountsQuery as AnalyticsClientAccountsQueryType,
	AnalyticsClientAccountsQueryVariables,
} from "../../../src/client/generated/graphql";
import type {
	CreateClientAccountInput,
	UpdateClientAccountInput,
} from "../../../src/client/generated/graphql";
import {
	CreateClientAccountMutation,
	UpdateClientAccountMutation,
	RemoveClientAccountMutation,
	TableClientAccountQuery,
	SearchClientAccountsQuery,
	AnalyticsClientAccountsQuery,
} from "../../../src/client";
import type { GraphQLTestCase } from "../../inputs/helpers";
// ============================================
// Type Definitions
// ============================================

type CreateClientAccountTestCase = GraphQLTestCase<
	CreateClientAccountMutationVariables,
	CreateClientAccountMutationType
>;

type UpdateClientAccountTestCase = GraphQLTestCase<
	UpdateClientAccountMutationVariables,
	UpdateClientAccountMutationType
> & {
	createData: CreateClientAccountInput;
	updateData: UpdateClientAccountInput;
	validate?: (response: UpdateClientAccountMutationType, createdClientAccount: any) => void;
};

type RemoveClientAccountTestCase = GraphQLTestCase<
	RemoveClientAccountMutationVariables,
	RemoveClientAccountMutationType
> & {
	createData: CreateClientAccountInput;
	shouldCreate?: boolean;
	validate?: (response: RemoveClientAccountMutationType) => void;
};

type TableClientAccountTestCase = GraphQLTestCase<
	TableClientAccountQueryVariables,
	TableClientAccountQueryType
> & {
	validate: (response: TableClientAccountQueryType) => void;
};

type SearchClientAccountsTestCase = GraphQLTestCase<
	SearchClientAccountsQueryVariables,
	SearchClientAccountsQueryType
> & {
	validate: (response: SearchClientAccountsQueryType) => void;
};

type AnalyticsClientAccountsTestCase = GraphQLTestCase<
	AnalyticsClientAccountsQueryVariables,
	AnalyticsClientAccountsQueryType
> & {
	validate: (response: AnalyticsClientAccountsQueryType) => void;
};
// ============================================
// Test Suite: Create ClientAccount
// ============================================

describe("Graphql Create ClientAccount", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreateClientAccountTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(CreateClientAccountMutation, testCase.variables);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.billing?.createClientAccount).toBeDefined();
			expect(response.data?.billing?.createClientAccount?.id).toBeDefined();
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
// Test Suite: Update ClientAccount
// ============================================

describe("Graphql Update ClientAccount", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: UpdateClientAccountTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		// Create initial ClientAccount
		const createResponse = await executor(CreateClientAccountMutation, {
			clientAccount: testCase.createData,
		});

		expect(createResponse.data?.billing?.createClientAccount?.id).toBeDefined();
		const clientAccountId = createResponse.data!.billing!.createClientAccount!.id!;
		const createdClientAccount = createResponse.data!.billing!.createClientAccount!;

		// Update ClientAccount
		const updateResponse = await executor(UpdateClientAccountMutation, {
			id: testCase.variables.id,
			clientAccount: testCase.updateData,
		});

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(updateResponse.data?.billing?.updateClientAccount).toBeDefined();
			if (testCase.validate) {
				testCase.validate(
					updateResponse.data as UpdateClientAccountMutationType,
					createdClientAccount,
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
// Test Suite: Remove ClientAccount
// ============================================

describe("Graphql Remove ClientAccount", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: RemoveClientAccountTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		let clientAccountId: string;

		if (testCase.shouldCreate) {
			const createResponse = await executor(CreateClientAccountMutation, {
				clientAccount: {
					// Add minimal required fields
				} as unknown as CreateClientAccountInput,
			});
			clientAccountId = createResponse.data!.billing!.createClientAccount!.id!;
		} else {
			clientAccountId = "00000000-0000-0000-0000-000000000000";
		}

		const deleteResponse = await executor(RemoveClientAccountMutation, {
			id: clientAccountId,
		});

		if (testCase.success) {
			expect(deleteResponse.errors).toBeUndefined();
			expect(deleteResponse.data?.billing?.removeClientAccount).toBeDefined();
		} else {
			if (deleteResponse.errors) {
				expect(Array.isArray(deleteResponse.errors)).toBe(true);
			} else {
				expect(deleteResponse.data?.billing?.removeClientAccount?.success).toBe(false);
			}
		}

		if (testCase.validate) {
			testCase.validate(deleteResponse.data as RemoveClientAccountMutationType);
		}
	});
});

// ============================================
// Test Suite: Table ClientAccounts Query
// ============================================

describe("Graphql Table ClientAccounts Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: TableClientAccountTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(TableClientAccountQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.billing?.clientAccounts).toBeDefined();
			testCase.validate(response.data as TableClientAccountQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});

// ============================================
// Test Suite: Search ClientAccounts Query
// ============================================

describe("Graphql Search ClientAccounts Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: SearchClientAccountsTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(SearchClientAccountsQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.billing?.clientAccounts).toBeDefined();
			testCase.validate(response.data as SearchClientAccountsQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});

// ============================================
// Test Suite: Analytics ClientAccounts Query
// ============================================

describe("Graphql Analytics ClientAccounts Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: AnalyticsClientAccountsTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(AnalyticsClientAccountsQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.billing?.clientAccounts).toBeDefined();
			testCase.validate(response.data as AnalyticsClientAccountsQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});
