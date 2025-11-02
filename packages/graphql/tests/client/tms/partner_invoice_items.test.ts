import { describe, expect, it, beforeAll } from "bun:test";
import "../../setup";
import { graphQLQueryExecutor } from "../../helpers";
import type {
	UpdatePartnerInvoiceItemMutation as UpdatePartnerInvoiceItemMutationType,
	UpdatePartnerInvoiceItemMutationVariables,
	RemovePartnerInvoiceItemMutation as RemovePartnerInvoiceItemMutationType,
	RemovePartnerInvoiceItemMutationVariables,
} from "../../../src/client/generated/graphql";
import type { UpdatePartnerInvoiceItemInput } from "../../../src/client/generated/graphql";
import {
	UpdatePartnerInvoiceItemMutation,
	RemovePartnerInvoiceItemMutation,
} from "../../../src/client";
import type { GraphQLTestCase } from "../../inputs/helpers";

// ============================================
// Type Definitions
// ============================================

type UpdatePartnerInvoiceItemTestCase = GraphQLTestCase<
	UpdatePartnerInvoiceItemMutationVariables,
	UpdatePartnerInvoiceItemMutationType
> & {
	updateData: UpdatePartnerInvoiceItemInput;
	validate?: (response: UpdatePartnerInvoiceItemMutationType) => void;
};

type RemovePartnerInvoiceItemTestCase = GraphQLTestCase<
	RemovePartnerInvoiceItemMutationVariables,
	RemovePartnerInvoiceItemMutationType
> & {
	validate?: (response: RemovePartnerInvoiceItemMutationType) => void;
};

// ============================================
// Test Suite: Update Partner Invoice Item
// ============================================

describe("Graphql TMS Update Partner Invoice Item", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: UpdatePartnerInvoiceItemTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		// Update partner invoice item
		const updateResponse = await executor(
			UpdatePartnerInvoiceItemMutation,
			testCase.variables,
		);

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(updateResponse.data?.tms?.updatePartnerInvoiceItem).toBeDefined();
			if (testCase.validate) {
				testCase.validate(
					updateResponse.data as UpdatePartnerInvoiceItemMutationType,
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
// Test Suite: Remove Partner Invoice Item
// ============================================

describe("Graphql TMS Remove Partner Invoice Item", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: RemovePartnerInvoiceItemTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const deleteResponse = await executor(
			RemovePartnerInvoiceItemMutation,
			testCase.variables,
		);

		if (testCase.success) {
			expect(deleteResponse.errors).toBeUndefined();
			expect(deleteResponse.data?.tms?.removePartnerInvoiceItem).toBeDefined();
		} else {
			if (deleteResponse.errors) {
				expect(Array.isArray(deleteResponse.errors)).toBe(true);
			} else {
				expect(
					deleteResponse.data?.tms?.removePartnerInvoiceItem?.success,
				).toBe(false);
			}
		}

		if (testCase.validate) {
			testCase.validate(
				deleteResponse.data as RemovePartnerInvoiceItemMutationType,
			);
		}
	});
});
