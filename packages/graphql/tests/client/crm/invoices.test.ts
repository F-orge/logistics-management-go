import { describe, expect, it, beforeAll } from "bun:test";
import "../../setup";
import { graphQLQueryExecutor } from "../../helpers";
import type {
	CreateInvoiceMutation as CreateInvoiceMutationType,
	CreateInvoiceMutationVariables,
	UpdateInvoiceMutation as UpdateInvoiceMutationType,
	UpdateInvoiceMutationVariables,
	TableInvoiceQuery as TableInvoiceQueryType,
	TableInvoiceQueryVariables,
	SearchInvoicesQuery as SearchInvoicesQueryType,
	SearchInvoicesQueryVariables,
	AnalyticsInvoicesQuery as AnalyticsInvoicesQueryType,
	AnalyticsInvoicesQueryVariables,
} from "../../../src/client/generated/graphql";
import type {
	CreateInvoiceInput,
	UpdateInvoiceInput,
} from "../../../src/client/generated/graphql";
import {
	CreateInvoiceMutation,
	UpdateInvoiceMutation,
	TableInvoiceQuery,
	SearchInvoicesQuery,
	AnalyticsInvoicesQuery,
} from "../../../src/client";
import type { GraphQLTestCase } from "../../inputs/helpers";

// ============================================
// Type Definitions
// ============================================

type CreateInvoiceTestCase = GraphQLTestCase<
	CreateInvoiceMutationVariables,
	CreateInvoiceMutationType
>;

type UpdateInvoiceTestCase = GraphQLTestCase<
	UpdateInvoiceMutationVariables,
	UpdateInvoiceMutationType
> & {
	createData: CreateInvoiceInput;
	updateData: UpdateInvoiceInput;
	validate?: (response: UpdateInvoiceMutationType, createdInvoice: any) => void;
};

type TableInvoiceTestCase = GraphQLTestCase<
	TableInvoiceQueryVariables,
	TableInvoiceQueryType
> & {
	validate: (response: TableInvoiceQueryType) => void;
};

type SearchInvoiceTestCase = GraphQLTestCase<
	SearchInvoicesQueryVariables,
	SearchInvoicesQueryType
> & {
	validate: (response: SearchInvoicesQueryType) => void;
};

type AnalyticsInvoiceTestCase = GraphQLTestCase<
	AnalyticsInvoicesQueryVariables,
	AnalyticsInvoicesQueryType
> & {
	validate: (response: AnalyticsInvoicesQueryType) => void;
};

// ============================================
// Helper Functions
// ============================================

// TODO: Add helper functions as needed

// ============================================
// Test Suite: Create Invoice
// ============================================

describe("Graphql CRM Create Invoice", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreateInvoiceTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(CreateInvoiceMutation, testCase.variables);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.crm?.createInvoice).toBeDefined();
			expect(response.data?.crm?.createInvoice?.id).toBeDefined();
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
// Test Suite: Update Invoice
// ============================================

describe("Graphql CRM Update Invoice", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: UpdateInvoiceTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		// Create initial invoice
		const createResponse = await executor(CreateInvoiceMutation, {
			invoice: testCase.createData,
		});

		expect(createResponse.data?.crm?.createInvoice?.id).toBeDefined();
		const invoiceId = createResponse.data!.crm!.createInvoice!.id!;
		const createdInvoice = createResponse.data!.crm!.createInvoice!;

		// Update invoice
		const updateResponse = await executor(UpdateInvoiceMutation, {
			id: invoiceId,
			invoice: testCase.updateData,
		});

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(updateResponse.data?.crm?.updateInvoice).toBeDefined();
			if (testCase.validate) {
				testCase.validate(
					updateResponse.data as UpdateInvoiceMutationType,
					createdInvoice,
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
// Test Suite: Table Invoice Query
// ============================================

describe("Graphql CRM Table Invoice Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(async () => {
		executor = graphQLQueryExecutor({ enableJWT: false });
		// TODO: Setup test data in beforeAll if needed
	});

	const cases: TableInvoiceTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(TableInvoiceQuery, testCase.variables);
		testCase.validate(response.data as TableInvoiceQueryType);
	});
});

// ============================================
// Test Suite: Search Invoices Query
// ============================================

describe("Graphql CRM Search Invoices Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(async () => {
		executor = graphQLQueryExecutor({ enableJWT: false });
		// TODO: Setup test data in beforeAll if needed
	});

	const cases: SearchInvoiceTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(SearchInvoicesQuery, testCase.variables);
		testCase.validate(response.data as SearchInvoicesQueryType);
	});
});

// ============================================
// Test Suite: Analytics Invoices Query
// ============================================

describe("Graphql CRM Analytics Invoices Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(async () => {
		executor = graphQLQueryExecutor({ enableJWT: false });
		// TODO: Setup test data in beforeAll if needed
	});

	const cases: AnalyticsInvoiceTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(AnalyticsInvoicesQuery, testCase.variables);
		testCase.validate(response.data as AnalyticsInvoicesQueryType);
	});
});
