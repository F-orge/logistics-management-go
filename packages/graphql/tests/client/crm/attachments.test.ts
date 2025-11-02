import { describe, expect, it, beforeAll } from "bun:test";
import "../../setup";
import { graphQLQueryExecutor } from "../../helpers";
import type {
	CreateAttachmentMutation as CreateAttachmentMutationType,
	CreateAttachmentMutationVariables,
	RemoveAttachmentMutation as RemoveAttachmentMutationType,
	RemoveAttachmentMutationVariables,
	TableAttachmentQuery as TableAttachmentQueryType,
	TableAttachmentQueryVariables,
	SearchAttachmentsQuery as SearchAttachmentsQueryType,
	SearchAttachmentsQueryVariables,
} from "../../../src/client/generated/graphql";
import type { CreateAttachmentInput } from "../../../src/client/generated/graphql";
import {
	CreateAttachmentMutation,
	RemoveAttachmentMutation,
	TableAttachmentQuery,
	SearchAttachmentsQuery,
} from "../../../src/client";
import type { GraphQLTestCase } from "../../inputs/helpers";

// ============================================
// Type Definitions
// ============================================

type CreateAttachmentTestCase = GraphQLTestCase<
	CreateAttachmentMutationVariables,
	CreateAttachmentMutationType
>;

type RemoveAttachmentTestCase = GraphQLTestCase<
	RemoveAttachmentMutationVariables,
	RemoveAttachmentMutationType
> & {
	shouldCreate: boolean;
	validate?: (response: RemoveAttachmentMutationType) => void;
};

type TableAttachmentTestCase = GraphQLTestCase<
	TableAttachmentQueryVariables,
	TableAttachmentQueryType
> & {
	validate: (response: TableAttachmentQueryType) => void;
};

type SearchAttachmentTestCase = GraphQLTestCase<
	SearchAttachmentsQueryVariables,
	SearchAttachmentsQueryType
> & {
	validate: (response: SearchAttachmentsQueryType) => void;
};

// ============================================
// Helper Functions
// ============================================

// ============================================
// Test Suite: Create Attachment
// ============================================

describe("Graphql CRM Create Attachment", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreateAttachmentTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			CreateAttachmentMutation,
			testCase.variables,
		);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.crm?.createAttachment).toBeDefined();
			expect(response.data?.crm?.createAttachment?.id).toBeDefined();
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
// Test Suite: Remove Attachment
// ============================================

describe("Graphql CRM Remove Attachment", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: RemoveAttachmentTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		let attachmentId: string;

		if (testCase.shouldCreate) {
			const createResponse = await executor(CreateAttachmentMutation, {
				attachment: {} as unknown as CreateAttachmentInput,
			});
			attachmentId = createResponse.data!.crm!.createAttachment!.id!;
		} else {
			attachmentId = "00000000-0000-0000-0000-000000000000";
		}

		const deleteResponse = await executor(RemoveAttachmentMutation, {
			id: attachmentId,
		});

		if (testCase.success) {
			expect(deleteResponse.errors).toBeUndefined();
			expect(deleteResponse.data?.crm?.removeAttachment).toBeDefined();
		} else {
			if (deleteResponse.errors) {
				expect(Array.isArray(deleteResponse.errors)).toBe(true);
			} else {
				expect(deleteResponse.data?.crm?.removeAttachment?.success).toBe(false);
			}
		}

		if (testCase.validate) {
			testCase.validate(deleteResponse.data as RemoveAttachmentMutationType);
		}
	});
});

// ============================================
// Test Suite: Table Attachment Query
// ============================================

describe("Graphql CRM Table Attachment Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(async () => {
		executor = graphQLQueryExecutor({ enableJWT: false });
		// Setup attachments for table testing if needed
	});

	const cases: TableAttachmentTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(TableAttachmentQuery, testCase.variables);
		testCase.validate(response.data as TableAttachmentQueryType);
	});
});

// ============================================
// Test Suite: Search Attachments Query
// ============================================

describe("Graphql CRM Search Attachments Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(async () => {
		executor = graphQLQueryExecutor({ enableJWT: false });
		// Setup attachments for search testing if needed
	});

	const cases: SearchAttachmentTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(SearchAttachmentsQuery, testCase.variables);
		testCase.validate(response.data as SearchAttachmentsQueryType);
	});
});
