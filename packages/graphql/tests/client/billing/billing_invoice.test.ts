import { describe, expect, it, beforeAll } from "bun:test";
import "../../setup";
import { graphQLQueryExecutor } from "../../helpers";
import type {
	CreateBillingInvoiceMutation as CreateBillingInvoiceMutationType,
	CreateBillingInvoiceMutationVariables,
	UpdateBillingInvoiceMutation as UpdateBillingInvoiceMutationType,
	UpdateBillingInvoiceMutationVariables,
	RemoveBillingInvoiceMutation as RemoveBillingInvoiceMutationType,
	RemoveBillingInvoiceMutationVariables,
	TableBillingInvoiceQuery as TableBillingInvoiceQueryType,
	TableBillingInvoiceQueryVariables,
	SearchBillingInvoicesQuery as SearchBillingInvoicesQueryType,
	SearchBillingInvoicesQueryVariables,
	AnalyticsBillingInvoicesQuery as AnalyticsBillingInvoicesQueryType,
	AnalyticsBillingInvoicesQueryVariables,
} from "../../../src/client/generated/graphql";
import type {
	CreateBillingInvoiceInput,
	UpdateBillingInvoiceInput,
} from "../../../src/client/generated/graphql";
import {
	CreateBillingInvoiceMutation,
	UpdateBillingInvoiceMutation,
	RemoveBillingInvoiceMutation,
	TableBillingInvoiceQuery,
	SearchBillingInvoicesQuery,
	AnalyticsBillingInvoicesQuery,
} from "../../../src/client";
import type { GraphQLTestCase } from "../../inputs/helpers";
// ============================================
// Type Definitions
// ============================================

type CreateBillingInvoiceTestCase = GraphQLTestCase<
	CreateBillingInvoiceMutationVariables,
	CreateBillingInvoiceMutationType
>;

type UpdateBillingInvoiceTestCase = GraphQLTestCase<
	UpdateBillingInvoiceMutationVariables,
	UpdateBillingInvoiceMutationType
> & {
	createData: CreateBillingInvoiceInput;
	updateData: UpdateBillingInvoiceInput;
	validate?: (response: UpdateBillingInvoiceMutationType, createdBillingInvoice: any) => void;
};

type RemoveBillingInvoiceTestCase = GraphQLTestCase<
	RemoveBillingInvoiceMutationVariables,
	RemoveBillingInvoiceMutationType
> & {
	createData: CreateBillingInvoiceInput;
	shouldCreate?: boolean;
	validate?: (response: RemoveBillingInvoiceMutationType) => void;
};

type TableBillingInvoiceTestCase = GraphQLTestCase<
	TableBillingInvoiceQueryVariables,
	TableBillingInvoiceQueryType
> & {
	validate: (response: TableBillingInvoiceQueryType) => void;
};

type SearchBillingInvoicesTestCase = GraphQLTestCase<
	SearchBillingInvoicesQueryVariables,
	SearchBillingInvoicesQueryType
> & {
	validate: (response: SearchBillingInvoicesQueryType) => void;
};

type AnalyticsBillingInvoicesTestCase = GraphQLTestCase<
	AnalyticsBillingInvoicesQueryVariables,
	AnalyticsBillingInvoicesQueryType
> & {
	validate: (response: AnalyticsBillingInvoicesQueryType) => void;
};
// ============================================
// Test Suite: Create BillingInvoice
// ============================================

describe("Graphql Create BillingInvoice", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreateBillingInvoiceTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(CreateBillingInvoiceMutation, testCase.variables);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.billing?.createBillingInvoice).toBeDefined();
			expect(response.data?.billing?.createBillingInvoice?.id).toBeDefined();
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
// Test Suite: Update BillingInvoice
// ============================================

describe("Graphql Update BillingInvoice", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: UpdateBillingInvoiceTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		// Create initial BillingInvoice
		const createResponse = await executor(CreateBillingInvoiceMutation, {
			billingInvoice: testCase.createData,
		});

		expect(createResponse.data?.billing?.createBillingInvoice?.id).toBeDefined();
		const billingInvoiceId = createResponse.data!.billing!.createBillingInvoice!.id!;
		const createdBillingInvoice = createResponse.data!.billing!.createBillingInvoice!;

		// Update BillingInvoice
		const updateResponse = await executor(UpdateBillingInvoiceMutation, {
			id: testCase.variables.id,
			billingInvoice: testCase.updateData,
		});

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(updateResponse.data?.billing?.updateBillingInvoice).toBeDefined();
			if (testCase.validate) {
				testCase.validate(
					updateResponse.data as UpdateBillingInvoiceMutationType,
					createdBillingInvoice,
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
// Test Suite: Remove BillingInvoice
// ============================================

describe("Graphql Remove BillingInvoice", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: RemoveBillingInvoiceTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		let billingInvoiceId: string;

		if (testCase.shouldCreate) {
			const createResponse = await executor(CreateBillingInvoiceMutation, {
				billingInvoice: {
					// Add minimal required fields
				} as unknown as CreateBillingInvoiceInput,
			});
			billingInvoiceId = createResponse.data!.billing!.createBillingInvoice!.id!;
		} else {
			billingInvoiceId = "00000000-0000-0000-0000-000000000000";
		}

		const deleteResponse = await executor(RemoveBillingInvoiceMutation, {
			id: billingInvoiceId,
		});

		if (testCase.success) {
			expect(deleteResponse.errors).toBeUndefined();
			expect(deleteResponse.data?.billing?.removeBillingInvoice).toBeDefined();
		} else {
			if (deleteResponse.errors) {
				expect(Array.isArray(deleteResponse.errors)).toBe(true);
			} else {
				expect(deleteResponse.data?.billing?.removeBillingInvoice?.success).toBe(false);
			}
		}

		if (testCase.validate) {
			testCase.validate(deleteResponse.data as RemoveBillingInvoiceMutationType);
		}
	});
});

// ============================================
// Test Suite: Table BillingInvoices Query
// ============================================

describe("Graphql Table BillingInvoices Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: TableBillingInvoiceTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(TableBillingInvoiceQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.billing?.billingInvoices).toBeDefined();
			testCase.validate(response.data as TableBillingInvoiceQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});

// ============================================
// Test Suite: Search BillingInvoices Query
// ============================================

describe("Graphql Search BillingInvoices Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: SearchBillingInvoicesTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(SearchBillingInvoicesQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.billing?.billingInvoices).toBeDefined();
			testCase.validate(response.data as SearchBillingInvoicesQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});

// ============================================
// Test Suite: Analytics BillingInvoices Query
// ============================================

describe("Graphql Analytics BillingInvoices Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: AnalyticsBillingInvoicesTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(AnalyticsBillingInvoicesQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.billing?.billingInvoices).toBeDefined();
			testCase.validate(response.data as AnalyticsBillingInvoicesQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});
