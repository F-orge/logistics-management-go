import { beforeAll, describe, expect, it } from "bun:test";
import "../../setup";
import {
	RemoveInvoiceItemMutation,
	UpdateInvoiceItemMutation,
} from "../../../src/client";
import type {
	RemoveInvoiceItemMutation as RemoveInvoiceItemMutationType,
	RemoveInvoiceItemMutationVariables,
	UpdateInvoiceItemInput,
	UpdateInvoiceItemMutation as UpdateInvoiceItemMutationType,
	UpdateInvoiceItemMutationVariables,
} from "../../../src/client/generated/graphql";
import { graphQLQueryExecutor } from "../../helpers";
import type { GraphQLTestCase } from "../../inputs/helpers";

// ============================================
// Type Definitions
// ============================================

type UpdateInvoiceItemTestCase = GraphQLTestCase<
	UpdateInvoiceItemMutationVariables,
	UpdateInvoiceItemMutationType
> & {
	updateData: UpdateInvoiceItemInput;
	validate?: (response: UpdateInvoiceItemMutationType) => void;
};

type RemoveInvoiceItemTestCase = GraphQLTestCase<
	RemoveInvoiceItemMutationVariables,
	RemoveInvoiceItemMutationType
> & {
	validate?: (response: RemoveInvoiceItemMutationType) => void;
};

// ============================================
// Helper Functions
// ============================================

// ============================================
// Test Suite: Update Invoice Item
// ============================================

describe("Graphql CRM Update Invoice Item", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: UpdateInvoiceItemTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		// Update invoice item
		const updateResponse = await executor(
			UpdateInvoiceItemMutation,
			testCase.variables,
		);

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(updateResponse.data?.crm?.updateInvoiceItem).toBeDefined();
			if (testCase.validate) {
				testCase.validate(updateResponse.data as UpdateInvoiceItemMutationType);
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
// Test Suite: Remove Invoice Item
// ============================================

describe("Graphql CRM Remove Invoice Item", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: RemoveInvoiceItemTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const deleteResponse = await executor(
			RemoveInvoiceItemMutation,
			testCase.variables,
		);

		if (testCase.success) {
			expect(deleteResponse.errors).toBeUndefined();
			expect(deleteResponse.data?.crm?.removeInvoiceItem).toBeDefined();
		} else {
			if (deleteResponse.errors) {
				expect(Array.isArray(deleteResponse.errors)).toBe(true);
			} else {
				expect(deleteResponse.data?.crm?.removeInvoiceItem?.success).toBe(
					false,
				);
			}
		}

		if (testCase.validate) {
			testCase.validate(deleteResponse.data as RemoveInvoiceItemMutationType);
		}
	});
});
