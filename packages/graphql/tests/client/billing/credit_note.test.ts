import { describe, expect, it, beforeAll } from "bun:test";
import "../../setup";
import { graphQLQueryExecutor } from "../../helpers";
import type {
	CreateCreditNoteMutation as CreateCreditNoteMutationType,
	CreateCreditNoteMutationVariables,
	UpdateCreditNoteMutation as UpdateCreditNoteMutationType,
	UpdateCreditNoteMutationVariables,
	RemoveCreditNoteMutation as RemoveCreditNoteMutationType,
	RemoveCreditNoteMutationVariables,
	TableCreditNoteQuery as TableCreditNoteQueryType,
	TableCreditNoteQueryVariables,
	SearchCreditNotesQuery as SearchCreditNotesQueryType,
	SearchCreditNotesQueryVariables,
	AnalyticsCreditNotesQuery as AnalyticsCreditNotesQueryType,
	AnalyticsCreditNotesQueryVariables,
} from "../../../src/client/generated/graphql";
import type {
	CreateCreditNoteInput,
	UpdateCreditNoteInput,
} from "../../../src/client/generated/graphql";
import {
	CreateCreditNoteMutation,
	UpdateCreditNoteMutation,
	RemoveCreditNoteMutation,
	TableCreditNoteQuery,
	SearchCreditNotesQuery,
	AnalyticsCreditNotesQuery,
} from "../../../src/client";
import type { GraphQLTestCase } from "../../inputs/helpers";
// ============================================
// Type Definitions
// ============================================

type CreateCreditNoteTestCase = GraphQLTestCase<
	CreateCreditNoteMutationVariables,
	CreateCreditNoteMutationType
>;

type UpdateCreditNoteTestCase = GraphQLTestCase<
	UpdateCreditNoteMutationVariables,
	UpdateCreditNoteMutationType
> & {
	createData: CreateCreditNoteInput;
	updateData: UpdateCreditNoteInput;
	validate?: (response: UpdateCreditNoteMutationType, createdCreditNote: any) => void;
};

type RemoveCreditNoteTestCase = GraphQLTestCase<
	RemoveCreditNoteMutationVariables,
	RemoveCreditNoteMutationType
> & {
	createData: CreateCreditNoteInput;
	shouldCreate?: boolean;
	validate?: (response: RemoveCreditNoteMutationType) => void;
};

type TableCreditNoteTestCase = GraphQLTestCase<
	TableCreditNoteQueryVariables,
	TableCreditNoteQueryType
> & {
	validate: (response: TableCreditNoteQueryType) => void;
};

type SearchCreditNotesTestCase = GraphQLTestCase<
	SearchCreditNotesQueryVariables,
	SearchCreditNotesQueryType
> & {
	validate: (response: SearchCreditNotesQueryType) => void;
};

type AnalyticsCreditNotesTestCase = GraphQLTestCase<
	AnalyticsCreditNotesQueryVariables,
	AnalyticsCreditNotesQueryType
> & {
	validate: (response: AnalyticsCreditNotesQueryType) => void;
};
// ============================================
// Test Suite: Create CreditNote
// ============================================

describe("Graphql Create CreditNote", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreateCreditNoteTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(CreateCreditNoteMutation, testCase.variables);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.billing?.createCreditNote).toBeDefined();
			expect(response.data?.billing?.createCreditNote?.id).toBeDefined();
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
// Test Suite: Update CreditNote
// ============================================

describe("Graphql Update CreditNote", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: UpdateCreditNoteTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		// Create initial CreditNote
		const createResponse = await executor(CreateCreditNoteMutation, {
			creditNote: testCase.createData,
		});

		expect(createResponse.data?.billing?.createCreditNote?.id).toBeDefined();
		const creditNoteId = createResponse.data!.billing!.createCreditNote!.id!;
		const createdCreditNote = createResponse.data!.billing!.createCreditNote!;

		// Update CreditNote
		const updateResponse = await executor(UpdateCreditNoteMutation, {
			id: testCase.variables.id,
			creditNote: testCase.updateData,
		});

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(updateResponse.data?.billing?.updateCreditNote).toBeDefined();
			if (testCase.validate) {
				testCase.validate(
					updateResponse.data as UpdateCreditNoteMutationType,
					createdCreditNote,
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
// Test Suite: Remove CreditNote
// ============================================

describe("Graphql Remove CreditNote", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: RemoveCreditNoteTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		let creditNoteId: string;

		if (testCase.shouldCreate) {
			const createResponse = await executor(CreateCreditNoteMutation, {
				creditNote: {
					// Add minimal required fields
				} as unknown as CreateCreditNoteInput,
			});
			creditNoteId = createResponse.data!.billing!.createCreditNote!.id!;
		} else {
			creditNoteId = "00000000-0000-0000-0000-000000000000";
		}

		const deleteResponse = await executor(RemoveCreditNoteMutation, {
			id: creditNoteId,
		});

		if (testCase.success) {
			expect(deleteResponse.errors).toBeUndefined();
			expect(deleteResponse.data?.billing?.removeCreditNote).toBeDefined();
		} else {
			if (deleteResponse.errors) {
				expect(Array.isArray(deleteResponse.errors)).toBe(true);
			} else {
				expect(deleteResponse.data?.billing?.removeCreditNote?.success).toBe(false);
			}
		}

		if (testCase.validate) {
			testCase.validate(deleteResponse.data as RemoveCreditNoteMutationType);
		}
	});
});

// ============================================
// Test Suite: Table CreditNotes Query
// ============================================

describe("Graphql Table CreditNotes Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: TableCreditNoteTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(TableCreditNoteQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.billing?.credit_notes).toBeDefined();
			testCase.validate(response.data as TableCreditNoteQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});

// ============================================
// Test Suite: Search CreditNotes Query
// ============================================

describe("Graphql Search CreditNotes Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: SearchCreditNotesTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(SearchCreditNotesQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.billing?.credit_notes).toBeDefined();
			testCase.validate(response.data as SearchCreditNotesQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});

// ============================================
// Test Suite: Analytics CreditNotes Query
// ============================================

describe("Graphql Analytics CreditNotes Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: AnalyticsCreditNotesTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(AnalyticsCreditNotesQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.billing?.credit_notes).toBeDefined();
			testCase.validate(response.data as AnalyticsCreditNotesQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});
