import { describe, expect, it, beforeAll } from "bun:test";
import "../../setup";
import { graphQLQueryExecutor } from "../../helpers";
import type {
	CreateDocumentMutation as CreateDocumentMutationType,
	CreateDocumentMutationVariables,
	UpdateDocumentMutation as UpdateDocumentMutationType,
	UpdateDocumentMutationVariables,
	RemoveDocumentMutation as RemoveDocumentMutationType,
	RemoveDocumentMutationVariables,
	TableDocumentQuery as TableDocumentQueryType,
	TableDocumentQueryVariables,
	SearchDocumentsQuery as SearchDocumentsQueryType,
	SearchDocumentsQueryVariables,
	AnalyticsDocumentsQuery as AnalyticsDocumentsQueryType,
	AnalyticsDocumentsQueryVariables,
} from "../../../src/client/generated/graphql";
import type {
	CreateDocumentInput,
	UpdateDocumentInput,
} from "../../../src/client/generated/graphql";
import {
	CreateDocumentMutation,
	UpdateDocumentMutation,
	RemoveDocumentMutation,
	TableDocumentQuery,
	SearchDocumentsQuery,
	AnalyticsDocumentsQuery,
} from "../../../src/client";
import type { GraphQLTestCase } from "../../inputs/helpers";
// ============================================
// Type Definitions
// ============================================

type CreateDocumentTestCase = GraphQLTestCase<
	CreateDocumentMutationVariables,
	CreateDocumentMutationType
>;

type UpdateDocumentTestCase = GraphQLTestCase<
	UpdateDocumentMutationVariables,
	UpdateDocumentMutationType
> & {
	createData: CreateDocumentInput;
	updateData: UpdateDocumentInput;
	validate?: (response: UpdateDocumentMutationType, createdDocument: any) => void;
};

type RemoveDocumentTestCase = GraphQLTestCase<
	RemoveDocumentMutationVariables,
	RemoveDocumentMutationType
> & {
	createData: CreateDocumentInput;
	shouldCreate?: boolean;
	validate?: (response: RemoveDocumentMutationType) => void;
};

type TableDocumentTestCase = GraphQLTestCase<
	TableDocumentQueryVariables,
	TableDocumentQueryType
> & {
	validate: (response: TableDocumentQueryType) => void;
};

type SearchDocumentsTestCase = GraphQLTestCase<
	SearchDocumentsQueryVariables,
	SearchDocumentsQueryType
> & {
	validate: (response: SearchDocumentsQueryType) => void;
};

type AnalyticsDocumentsTestCase = GraphQLTestCase<
	AnalyticsDocumentsQueryVariables,
	AnalyticsDocumentsQueryType
> & {
	validate: (response: AnalyticsDocumentsQueryType) => void;
};
// ============================================
// Test Suite: Create Document
// ============================================

describe("Graphql Create Document", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreateDocumentTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(CreateDocumentMutation, testCase.variables);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.billing?.createDocument).toBeDefined();
			expect(response.data?.billing?.createDocument?.id).toBeDefined();
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
// Test Suite: Update Document
// ============================================

describe("Graphql Update Document", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: UpdateDocumentTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		// Create initial Document
		const createResponse = await executor(CreateDocumentMutation, {
			document: testCase.createData,
		});

		expect(createResponse.data?.billing?.createDocument?.id).toBeDefined();
		const documentId = createResponse.data!.billing!.createDocument!.id!;
		const createdDocument = createResponse.data!.billing!.createDocument!;

		// Update Document
		const updateResponse = await executor(UpdateDocumentMutation, {
			id: testCase.variables.id,
			document: testCase.updateData,
		});

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(updateResponse.data?.billing?.updateDocument).toBeDefined();
			if (testCase.validate) {
				testCase.validate(
					updateResponse.data as UpdateDocumentMutationType,
					createdDocument,
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
// Test Suite: Remove Document
// ============================================

describe("Graphql Remove Document", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: RemoveDocumentTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		let documentId: string;

		if (testCase.shouldCreate) {
			const createResponse = await executor(CreateDocumentMutation, {
				document: {
					// Add minimal required fields
				} as unknown as CreateDocumentInput,
			});
			documentId = createResponse.data!.billing!.createDocument!.id!;
		} else {
			documentId = "00000000-0000-0000-0000-000000000000";
		}

		const deleteResponse = await executor(RemoveDocumentMutation, {
			id: documentId,
		});

		if (testCase.success) {
			expect(deleteResponse.errors).toBeUndefined();
			expect(deleteResponse.data?.billing?.removeDocument).toBeDefined();
		} else {
			if (deleteResponse.errors) {
				expect(Array.isArray(deleteResponse.errors)).toBe(true);
			} else {
				expect(deleteResponse.data?.billing?.removeDocument?.success).toBe(false);
			}
		}

		if (testCase.validate) {
			testCase.validate(deleteResponse.data as RemoveDocumentMutationType);
		}
	});
});

// ============================================
// Test Suite: Table Documents Query
// ============================================

describe("Graphql Table Documents Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: TableDocumentTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(TableDocumentQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.billing?.documents).toBeDefined();
			testCase.validate(response.data as TableDocumentQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});

// ============================================
// Test Suite: Search Documents Query
// ============================================

describe("Graphql Search Documents Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: SearchDocumentsTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(SearchDocumentsQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.billing?.documents).toBeDefined();
			testCase.validate(response.data as SearchDocumentsQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});

// ============================================
// Test Suite: Analytics Documents Query
// ============================================

describe("Graphql Analytics Documents Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: AnalyticsDocumentsTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(AnalyticsDocumentsQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.billing?.documents).toBeDefined();
			testCase.validate(response.data as AnalyticsDocumentsQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});
