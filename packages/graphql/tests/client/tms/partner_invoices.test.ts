import { beforeAll, describe, expect, it } from "bun:test";
import "../../setup";
import {
	CreatePartnerInvoiceMutation,
	TablePartnerInvoice,
	UpdatePartnerInvoiceMutation,
} from "../../../src/client";
import type {
	CreatePartnerInvoiceInput,
	CreatePartnerInvoiceMutation as CreatePartnerInvoiceMutationType,
	CreatePartnerInvoiceMutationVariables,
	TablePartnerInvoiceQuery as TablePartnerInvoiceQueryType,
	TablePartnerInvoiceQueryVariables,
	UpdatePartnerInvoiceInput,
	UpdatePartnerInvoiceMutation as UpdatePartnerInvoiceMutationType,
	UpdatePartnerInvoiceMutationVariables,
} from "../../../src/client/generated/graphql";
import { graphQLQueryExecutor } from "../../helpers";
import type { GraphQLTestCase } from "../../inputs/helpers";

// ============================================
// Type Definitions
// ============================================

type CreatePartnerInvoiceTestCase = GraphQLTestCase<
	CreatePartnerInvoiceMutationVariables,
	CreatePartnerInvoiceMutationType
>;

type UpdatePartnerInvoiceTestCase = GraphQLTestCase<
	UpdatePartnerInvoiceMutationVariables,
	UpdatePartnerInvoiceMutationType
> & {
	createData: CreatePartnerInvoiceInput;
	updateData: UpdatePartnerInvoiceInput;
	validate?: (
		response: UpdatePartnerInvoiceMutationType,
		createdPartnerInvoice: any,
	) => void;
};

type TablePartnerInvoiceTestCase = GraphQLTestCase<
	TablePartnerInvoiceQueryVariables,
	TablePartnerInvoiceQueryType
> & {
	validate: (response: TablePartnerInvoiceQueryType) => void;
};

// ============================================
// Test Suite: Create Partner Invoice
// ============================================

describe("Graphql TMS Create Partner Invoice", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreatePartnerInvoiceTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			CreatePartnerInvoiceMutation,
			testCase.variables,
		);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.tms?.createPartnerInvoice).toBeDefined();
			expect(response.data?.tms?.createPartnerInvoice?.id).toBeDefined();
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
// Test Suite: Update Partner Invoice
// ============================================

describe("Graphql TMS Update Partner Invoice", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: UpdatePartnerInvoiceTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		// Create initial partner invoice
		const createResponse = await executor(CreatePartnerInvoiceMutation, {
			partnerInvoice: testCase.createData,
		});

		expect(createResponse.data?.tms?.createPartnerInvoice?.id).toBeDefined();
		const partnerInvoiceId =
			createResponse.data!.tms!.createPartnerInvoice!.id!;
		const createdPartnerInvoice =
			createResponse.data!.tms!.createPartnerInvoice!;

		// Update partner invoice
		const updateResponse = await executor(UpdatePartnerInvoiceMutation, {
			id: partnerInvoiceId,
			partnerInvoice: testCase.updateData,
		});

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(updateResponse.data?.tms?.updatePartnerInvoice).toBeDefined();
			if (testCase.validate) {
				testCase.validate(
					updateResponse.data as UpdatePartnerInvoiceMutationType,
					createdPartnerInvoice,
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
// Test Suite: Table Partner Invoices Query
// ============================================

describe("Graphql TMS Table Partner Invoices Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: TablePartnerInvoiceTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(TablePartnerInvoice, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.tms?.partnerInvoices).toBeDefined();
			testCase.validate(response.data as TablePartnerInvoiceQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});
