import { beforeAll, describe, expect, it } from "bun:test";
import "../../setup";
import {
	RemoveInvoiceLineItemMutation,
	UpdateInvoiceLineItemMutation,
} from "../../../src/client";
import type {
	RemoveInvoiceLineItemMutation as RemoveInvoiceLineItemMutationType,
	RemoveInvoiceLineItemMutationVariables,
	UpdateInvoiceLineItemInput,
	UpdateInvoiceLineItemMutation as UpdateInvoiceLineItemMutationType,
	UpdateInvoiceLineItemMutationVariables,
} from "../../../src/client/generated/graphql";
import { graphQLQueryExecutor } from "../../helpers";
import type { GraphQLTestCase } from "../../inputs/helpers";

// ============================================
// Type Definitions
// ============================================

type UpdateInvoiceLineItemTestCase = GraphQLTestCase<
	UpdateInvoiceLineItemMutationVariables,
	UpdateInvoiceLineItemMutationType
> & {
	updateData: UpdateInvoiceLineItemInput;
	validate?: (
		response: UpdateInvoiceLineItemMutationType,
		createdInvoiceLineItem: any,
	) => void;
};

type RemoveInvoiceLineItemTestCase = GraphQLTestCase<
	RemoveInvoiceLineItemMutationVariables,
	RemoveInvoiceLineItemMutationType
> & {
	shouldCreate?: boolean;
	validate?: (response: RemoveInvoiceLineItemMutationType) => void;
};

// ============================================
// Test Suite: Update InvoiceLineItem
// ============================================

describe("Graphql Update InvoiceLineItem", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: UpdateInvoiceLineItemTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		// Note: This entity does not have Create operation
		// Test cases should define the invoiceLineItemId to test against

		// Update InvoiceLineItem
		const updateResponse = await executor(UpdateInvoiceLineItemMutation, {
			id: testCase.variables.id,
			invoiceLineItem: testCase.updateData,
		});

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(updateResponse.data?.billing?.updateInvoiceLineItem).toBeDefined();
			if (testCase.validate) {
				testCase.validate(
					updateResponse.data as UpdateInvoiceLineItemMutationType,
					{},
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
// Test Suite: Remove InvoiceLineItem
// ============================================

describe("Graphql Remove InvoiceLineItem", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: RemoveInvoiceLineItemTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		let invoiceLineItemId: string;

		if (testCase.shouldCreate) {
			throw new Error(
				"Cannot create InvoiceLineItem - no Create operation available",
			);
		} else {
			invoiceLineItemId = "00000000-0000-0000-0000-000000000000";
		}

		const deleteResponse = await executor(RemoveInvoiceLineItemMutation, {
			id: invoiceLineItemId,
		});

		if (testCase.success) {
			expect(deleteResponse.errors).toBeUndefined();
			expect(deleteResponse.data?.billing?.removeInvoiceLineItem).toBeDefined();
		} else {
			if (deleteResponse.errors) {
				expect(Array.isArray(deleteResponse.errors)).toBe(true);
			} else {
				expect(
					deleteResponse.data?.billing?.removeInvoiceLineItem?.success,
				).toBe(false);
			}
		}

		if (testCase.validate) {
			testCase.validate(
				deleteResponse.data as RemoveInvoiceLineItemMutationType,
			);
		}
	});
});
