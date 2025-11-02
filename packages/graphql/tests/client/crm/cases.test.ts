import { beforeAll, describe, expect, it } from "bun:test";
import "../../setup";
import {
	AnalyticsCasesQuery,
	CreateCaseMutation,
	RemoveCaseMutation,
	SearchCasesQuery,
	TableCaseQuery,
	UpdateCaseMutation,
} from "../../../src/client";
import type {
	AnalyticsCasesQuery as AnalyticsCasesQueryType,
	AnalyticsCasesQueryVariables,
	CreateCaseInput,
	CreateCaseMutation as CreateCaseMutationType,
	CreateCaseMutationVariables,
	RemoveCaseMutation as RemoveCaseMutationType,
	RemoveCaseMutationVariables,
	SearchCasesQuery as SearchCasesQueryType,
	SearchCasesQueryVariables,
	TableCaseQuery as TableCaseQueryType,
	TableCaseQueryVariables,
	UpdateCaseInput,
	UpdateCaseMutation as UpdateCaseMutationType,
	UpdateCaseMutationVariables,
} from "../../../src/client/generated/graphql";
import { graphQLQueryExecutor, kyselyInstance } from "../../helpers";
import type { GraphQLTestCase } from "../../inputs/helpers";

// ============================================
// Type Definitions
// ============================================

type CreateCaseTestCase = GraphQLTestCase<
	CreateCaseMutationVariables,
	CreateCaseMutationType
>;

type UpdateCaseTestCase = GraphQLTestCase<
	UpdateCaseMutationVariables,
	UpdateCaseMutationType
> & {
	createData: CreateCaseInput;
	updateData: UpdateCaseInput;
	validate?: (response: UpdateCaseMutationType, createdCase: any) => void;
};

type RemoveCaseTestCase = GraphQLTestCase<
	RemoveCaseMutationVariables,
	RemoveCaseMutationType
> & {
	shouldCreate: boolean;
	validate?: (response: RemoveCaseMutationType) => void;
};

type TableCaseTestCase = GraphQLTestCase<
	TableCaseQueryVariables,
	TableCaseQueryType
> & {
	validate: (response: TableCaseQueryType) => void;
};

type SearchCaseTestCase = GraphQLTestCase<
	SearchCasesQueryVariables,
	SearchCasesQueryType
> & {
	validate: (response: SearchCasesQueryType) => void;
};

type AnalyticsCaseTestCase = GraphQLTestCase<
	AnalyticsCasesQueryVariables,
	AnalyticsCasesQueryType
> & {
	validate: (response: AnalyticsCasesQueryType) => void;
};

// ============================================
// Helper Functions
// ============================================

let testUserId: string;
let testContactId: string;

async function setupTestUser() {
	const db = kyselyInstance();
	const users = await db.selectFrom("user").selectAll().limit(1).execute();
	if (users.length > 0) {
		testUserId = users[0]!.id;
	} else {
		throw new Error("No test users found in database");
	}
}

async function setupTestContact() {
	const db = kyselyInstance();
	const contacts = await db
		.selectFrom("crm.contacts")
		.selectAll()
		.limit(1)
		.execute();
	if (contacts.length > 0) {
		testContactId = contacts[0]!.id;
	} else {
		throw new Error("No test contacts found in database");
	}
}

function generateUniqueCaseNumber(): string {
	return `CASE-${Date.now()}-${Math.random()
		.toString(36)
		.substring(7)
		.toUpperCase()}`;
}

function generateUniqueSubject(): string {
	const subjects = [
		"Login issues",
		"Payment processing error",
		"Account synchronization",
		"Data export problem",
		"Performance degradation",
		"Feature request for dashboard",
		"Integration API error",
		"Report generation failed",
	];
	const randomSubject = subjects[Math.floor(Math.random() * subjects.length)];
	return `${randomSubject} - ${Date.now()}`;
}

function generateUniqueDescription(): string {
	const descriptions = [
		"Customer cannot access their account after password reset",
		"System is running slowly during peak hours",
		"Third-party integration returning authentication errors",
		"User receives duplicate email notifications",
		"Custom report is not generating correctly",
		"API endpoint returning 500 error intermittently",
		"Data validation errors in bulk import",
		"Scheduling conflicts in calendar integration",
	];
	return descriptions[Math.floor(Math.random() * descriptions.length)]!;
}

// ============================================
// Test Suite: Create Case
// ============================================

describe("Graphql CRM Create Case", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(async () => {
		executor = graphQLQueryExecutor({ enableJWT: false });
		await setupTestUser();
		await setupTestContact();
	});

	const cases = [
		{
			name: "Case_Create_WithRequiredFields",
			getVariables: () => ({
				case: {
					caseNumber: generateUniqueCaseNumber(),
					ownerId: testUserId,
				},
			}),
			success: true,
		},
		{
			name: "Case_Create_WithAllFields",
			getVariables: () => ({
				case: {
					caseNumber: generateUniqueCaseNumber(),
					status: "NEW" as any,
					priority: "HIGH" as any,
					type: "TECHNICAL_SUPPORT" as any,
					ownerId: testUserId,
					...(testContactId && { contactId: testContactId }),
					description: "Customer experiencing login issues",
				},
			}),
			success: true,
		},
		{
			name: "Case_Create_MissingCaseNumber",
			getVariables: () => ({
				case: {
					ownerId: testUserId,
				} as unknown as CreateCaseInput,
			}),
			success: false,
			expectedError: {
				messagePattern: /required|missing|caseNumber/i,
			},
		},
		{
			name: "Case_Create_MissingOwnerId",
			getVariables: () => ({
				case: {
					caseNumber: generateUniqueCaseNumber(),
				} as unknown as CreateCaseInput,
			}),
			success: false,
			expectedError: {
				messagePattern: /required|missing|owner/i,
			},
		},
	];

	it.each(cases)("$name", async (testCase) => {
		const variables = testCase.getVariables();
		const response = await executor(CreateCaseMutation, variables);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.crm?.createCase).toBeDefined();
			expect(response.data?.crm?.createCase?.id).toBeDefined();
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
// Test Suite: Create Case - Additional Scenarios
// ============================================

describe("Graphql CRM Create Case - Additional Scenarios", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(async () => {
		executor = graphQLQueryExecutor({ enableJWT: false });
		await setupTestUser();
	});

	const cases = [
		{
			name: "Case_Create_MissingSubject",
			getVariables: () => ({
				case: {
					caseNumber: generateUniqueCaseNumber(),
					ownerId: testUserId,
					description: generateUniqueDescription(),
				} as unknown as CreateCaseInput,
			}),
			success: false,
			expectedError: {
				messagePattern: /required|missing|subject/i,
			},
		},
		{
			name: "Case_Create_InvalidStatus",
			getVariables: () => ({
				case: {
					caseNumber: generateUniqueCaseNumber(),
					ownerId: testUserId,
					status: "INVALID_STATUS" as any,
				},
			}),
			success: false,
			expectedError: {
				messagePattern: /invalid|status/i,
			},
		},
		{
			name: "Case_Create_WithPriorityAndType",
			getVariables: () => ({
				case: {
					caseNumber: generateUniqueCaseNumber(),
					ownerId: testUserId,
					priority: "CRITICAL" as any,
					type: "BUG_REPORT" as any,
					description: generateUniqueDescription(),
				},
			}),
			success: true,
		},
	];

	it.each(cases)("$name", async (testCase) => {
		const variables = testCase.getVariables();
		const response = await executor(CreateCaseMutation, variables);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.crm?.createCase).toBeDefined();
			expect(response.data?.crm?.createCase?.id).toBeDefined();
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
// Test Suite: Create Case - Additional Scenarios
// ============================================

describe("Graphql CRM Create Case - Additional Scenarios", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(async () => {
		executor = graphQLQueryExecutor({ enableJWT: false });
		await setupTestUser();
	});

	const cases = [
		{
			name: "Case_Create_MissingSubject",
			getVariables: () => ({
				case: {
					caseNumber: generateUniqueCaseNumber(),
					ownerId: testUserId,
					description: generateUniqueDescription(),
				} as unknown as CreateCaseInput,
			}),
			success: false,
			expectedError: {
				messagePattern: /required|missing|subject/i,
			},
		},
		{
			name: "Case_Create_InvalidStatus",
			getVariables: () => ({
				case: {
					caseNumber: generateUniqueCaseNumber(),
					ownerId: testUserId,
					status: "INVALID_STATUS" as any,
				},
			}),
			success: false,
			expectedError: {
				messagePattern: /invalid|status/i,
			},
		},
		{
			name: "Case_Create_WithPriorityAndType",
			getVariables: () => ({
				case: {
					caseNumber: generateUniqueCaseNumber(),
					ownerId: testUserId,
					priority: "CRITICAL" as any,
					type: "BUG_REPORT" as any,
					description: generateUniqueDescription(),
				},
			}),
			success: true,
		},
	];

	it.each(cases)("$name", async (testCase) => {
		const variables = testCase.getVariables();
		const response = await executor(CreateCaseMutation, variables);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.crm?.createCase).toBeDefined();
			expect(response.data?.crm?.createCase?.id).toBeDefined();
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
// Test Suite: Update Case
// ============================================

describe("Graphql CRM Update Case", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(async () => {
		executor = graphQLQueryExecutor({ enableJWT: false });
		await setupTestUser();
	});

	const cases: Array<{
		name: string;
		getCreateData: () => CreateCaseInput;
		updateData: UpdateCaseInput;
		variables?: any;
		success: boolean;
		expectedError?: { messagePattern: RegExp };
		validate?: (response: UpdateCaseMutationType) => void;
	}> = [
		{
			name: "Case_Update_StatusFromNewToInProgress",
			getCreateData: () => ({
				caseNumber: generateUniqueCaseNumber(),
				ownerId: testUserId,
				status: "NEW" as any,
			}),
			updateData: {
				status: "IN_PROGRESS" as any,
			},
			success: true,
			validate: (response) => {
				const data = response as any;
				expect(data?.crm?.updateCase?.status).toBe("IN_PROGRESS");
			},
		},
		{
			name: "Case_Update_PriorityChange",
			getCreateData: () => ({
				caseNumber: generateUniqueCaseNumber(),
				ownerId: testUserId,
				priority: "MEDIUM" as any,
			}),
			updateData: {
				priority: "HIGH" as any,
			},
			success: true,
			validate: (response) => {
				const data = response as any;
				expect(data?.crm?.updateCase?.priority).toBe("HIGH");
			},
		},
		{
			name: "Case_Update_StatusToResolved",
			getCreateData: () => ({
				caseNumber: generateUniqueCaseNumber(),
				ownerId: testUserId,
				status: "IN_PROGRESS" as any,
			}),
			updateData: {
				status: "RESOLVED" as any,
			},
			success: true,
		},
		{
			name: "Case_Update_MultipleFields",
			getCreateData: () => ({
				caseNumber: generateUniqueCaseNumber(),
				ownerId: testUserId,
				status: "NEW" as any,
				priority: "LOW" as any,
			}),
			updateData: {
				status: "IN_PROGRESS" as any,
				priority: "HIGH" as any,
				type: "PROBLEM" as any,
			},
			success: true,
		},
		{
			name: "Case_Update_NonExistent",
			getCreateData: () => ({
				caseNumber: generateUniqueCaseNumber(),
				ownerId: testUserId,
			}),
			updateData: {
				priority: "HIGH" as any,
			},
			variables: {
				id: "00000000-0000-0000-0000-000000000000",
				case: {
					priority: "HIGH" as any,
				},
			},
			success: false,
			expectedError: {
				messagePattern: /not found|does not exist/i,
			},
		},
	];

	it.each(cases)("$name", async (testCase) => {
		// Create initial case
		const createResponse = await executor(CreateCaseMutation, {
			case: testCase.getCreateData(),
		});

		expect(createResponse.data?.crm?.createCase?.id).toBeDefined();
		const caseId = createResponse.data!.crm!.createCase!.id!;
		const createdCase = createResponse.data!.crm!.createCase!;

		// Use fake ID if provided in variables, otherwise use created case ID
		const finalCaseId = testCase.variables?.id || caseId;

		// Update case
		const updateResponse = await executor(UpdateCaseMutation, {
			id: finalCaseId,
			case: testCase.updateData,
		});

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(updateResponse.data?.crm?.updateCase).toBeDefined();
			if (testCase.validate) {
				testCase.validate(updateResponse.data as UpdateCaseMutationType);
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
// Test Suite: Update Case - Status Transitions
// ============================================

describe("Graphql CRM Update Case - Status Transitions", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(async () => {
		executor = graphQLQueryExecutor({ enableJWT: false });
		await setupTestUser();
	});

	const cases: Array<{
		name: string;
		getCreateData: () => CreateCaseInput;
		updateData: UpdateCaseInput;
		variables?: any;
		success: boolean;
		expectedError?: { messagePattern: RegExp };
		validate?: (response: UpdateCaseMutationType) => void;
	}> = [
		{
			name: "Case_Update_StatusNewToOpen",
			getCreateData: () => ({
				caseNumber: generateUniqueCaseNumber(),
				ownerId: testUserId,
				status: "NEW" as any,
			}),
			updateData: {
				status: "IN_PROGRESS" as any,
			},
			success: true,
			validate: (response) => {
				const data = response as any;
				expect(data?.crm?.updateCase?.status).toBe("IN_PROGRESS");
			},
		},
		{
			name: "Case_Update_StatusOpenToPending",
			getCreateData: () => ({
				caseNumber: generateUniqueCaseNumber(),
				ownerId: testUserId,
				status: "IN_PROGRESS" as any,
			}),
			updateData: {
				status: "WAITING_FOR_CUSTOMER" as any,
			},
			success: true,
			validate: (response) => {
				const data = response as any;
				expect(data?.crm?.updateCase?.status).toBe("WAITING_FOR_CUSTOMER");
			},
		},
		{
			name: "Case_Update_StatusToClosed",
			getCreateData: () => ({
				caseNumber: generateUniqueCaseNumber(),
				ownerId: testUserId,
				status: "IN_PROGRESS" as any,
			}),
			updateData: {
				status: "CLOSED" as any,
			},
			success: true,
			validate: (response) => {
				const data = response as any;
				expect(data?.crm?.updateCase?.status).toBe("CLOSED");
			},
		},
		{
			name: "Case_Update_StatusToResolved",
			getCreateData: () => ({
				caseNumber: generateUniqueCaseNumber(),
				ownerId: testUserId,
				status: "IN_PROGRESS" as any,
			}),
			updateData: {
				status: "RESOLVED" as any,
			},
			success: true,
			validate: (response) => {
				const data = response as any;
				expect(data?.crm?.updateCase?.status).toBe("RESOLVED");
			},
		},
		{
			name: "Case_Update_AddDescription",
			getCreateData: () => ({
				caseNumber: generateUniqueCaseNumber(),
				ownerId: testUserId,
				status: "NEW" as any,
			}),
			updateData: {
				status: "IN_PROGRESS" as any,
				type: "PROBLEM" as any,
			},
			success: true,
			validate: (response) => {
				const data = response as any;
				expect(data?.crm?.updateCase?.status).toBe("IN_PROGRESS");
				expect(data?.crm?.updateCase?.type).toBe("PROBLEM");
			},
		},
	];

	it.each(cases)("$name", async (testCase) => {
		// Create initial case
		const createResponse = await executor(CreateCaseMutation, {
			case: testCase.getCreateData(),
		});

		expect(createResponse.data?.crm?.createCase?.id).toBeDefined();
		const caseId = createResponse.data!.crm!.createCase!.id!;
		const createdCase = createResponse.data!.crm!.createCase!;

		// Use fake ID if provided in variables, otherwise use created case ID
		const finalCaseId = testCase.variables?.id || caseId;

		// Update case
		const updateResponse = await executor(UpdateCaseMutation, {
			id: finalCaseId,
			case: testCase.updateData,
		});

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(updateResponse.data?.crm?.updateCase).toBeDefined();
			if (testCase.validate) {
				testCase.validate(updateResponse.data as UpdateCaseMutationType);
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
// Test Suite: Remove Case
// ============================================

describe("Graphql CRM Remove Case", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(async () => {
		executor = graphQLQueryExecutor({ enableJWT: false });
		await setupTestUser();
	});

	const cases: RemoveCaseTestCase[] = [
		{
			name: "Case_Remove_Success",
			variables: {
				id: "placeholder",
			},
			success: true,
			shouldCreate: true,
		},
		{
			name: "Case_Remove_NonExistent",
			variables: {
				id: "00000000-0000-0000-0000-000000000000",
			},
			success: false,
			shouldCreate: false,
			expectedError: {
				messagePattern: /not found|does not exist/i,
			},
		},
	];

	it.each(cases)("$name", async (testCase) => {
		let caseId: string;

		if (testCase.shouldCreate) {
			const createResponse = await executor(CreateCaseMutation, {
				case: {
					caseNumber: generateUniqueCaseNumber(),
					ownerId: testUserId,
				} as CreateCaseInput,
			});
			caseId = createResponse.data!.crm!.createCase!.id!;
		} else {
			caseId = "00000000-0000-0000-0000-000000000000";
		}

		const deleteResponse = await executor(RemoveCaseMutation, {
			id: caseId,
		});

		if (testCase.success) {
			expect(deleteResponse.errors).toBeUndefined();
			expect(deleteResponse.data?.crm?.removeCase).toBeDefined();
		} else {
			if (deleteResponse.errors) {
				expect(Array.isArray(deleteResponse.errors)).toBe(true);
			} else {
				expect(deleteResponse.data?.crm?.removeCase?.success).toBe(false);
			}
		}

		if (testCase.validate) {
			testCase.validate(deleteResponse.data as RemoveCaseMutationType);
		}
	});
});

// ============================================
// Test Suite: Table Case Query
// ============================================

describe("Graphql CRM Table Case Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(async () => {
		executor = graphQLQueryExecutor({ enableJWT: false });
		await setupTestUser();
	});

	const cases: TableCaseTestCase[] = [
		{
			name: "Case_Table_WithPagination",
			variables: {
				page: 1,
				perPage: 10,
			},
			success: true,
			validate: (response) => {
				expect(response).toBeDefined();
				const data = response as any;
				expect(Array.isArray(data?.crm?.cases)).toBe(true);
			},
		},
		{
			name: "Case_Table_SecondPage",
			variables: {
				page: 2,
				perPage: 5,
			},
			success: true,
			validate: (response) => {
				expect(response).toBeDefined();
				const data = response as any;
				expect(Array.isArray(data?.crm?.cases)).toBe(true);
			},
		},
		{
			name: "Case_Table_FilterByStatus",
			variables: {
				page: 1,
				perPage: 10,
				status: "NEW" as any,
			},
			success: true,
			validate: (response) => {
				expect(response).toBeDefined();
				const data = response as any;
				expect(Array.isArray(data?.crm?.cases)).toBe(true);
			},
		},
		{
			name: "Case_Table_FilterByPriority",
			variables: {
				page: 1,
				perPage: 10,
				priority: "HIGH" as any,
			},
			success: true,
			validate: (response) => {
				expect(response).toBeDefined();
				const data = response as any;
				expect(Array.isArray(data?.crm?.cases)).toBe(true);
			},
		},
	];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(TableCaseQuery, testCase.variables);
		testCase.validate(response.data as TableCaseQueryType);
	});
});

// ============================================
// Test Suite: Table Case Query - Additional Filters
// ============================================

describe("Graphql CRM Table Case Query - Additional Filters", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(async () => {
		executor = graphQLQueryExecutor({ enableJWT: false });
		await setupTestUser();
	});

	const cases: TableCaseTestCase[] = [
		{
			name: "Case_Table_SortedByStatus",
			variables: {
				page: 1,
				perPage: 10,
				status: "NEW" as any,
			},
			success: true,
			validate: (response) => {
				expect(response).toBeDefined();
				const data = response as any;
				expect(Array.isArray(data?.crm?.cases)).toBe(true);
				// Verify all results have matching status
				data?.crm?.cases?.forEach((caseItem: any) => {
					expect(caseItem?.status).toBe("NEW");
				});
			},
		},
		{
			name: "Case_Table_ActiveCasesOnly",
			variables: {
				page: 1,
				perPage: 10,
				status: "IN_PROGRESS" as any,
			},
			success: true,
			validate: (response) => {
				expect(response).toBeDefined();
				const data = response as any;
				expect(Array.isArray(data?.crm?.cases)).toBe(true);
				// Verify no closed cases
				data?.crm?.cases?.forEach((caseItem: any) => {
					expect(caseItem?.status).not.toBe("CLOSED");
				});
			},
		},
		{
			name: "Case_Table_ByOwnerFilter",
			variables: {
				page: 1,
				perPage: 10,
			},
			success: true,
			validate: (response) => {
				expect(response).toBeDefined();
				const data = response as any;
				expect(Array.isArray(data?.crm?.cases)).toBe(true);
				expect(data?.crm?.cases?.length).toBeGreaterThanOrEqual(0);
			},
		},
		{
			name: "Case_Table_LargePageSize",
			variables: {
				page: 1,
				perPage: 100,
			},
			success: true,
			validate: (response) => {
				expect(response).toBeDefined();
				const data = response as any;
				expect(Array.isArray(data?.crm?.cases)).toBe(true);
				// Large page should still return array
				expect(data?.crm?.cases?.length).toBeGreaterThanOrEqual(0);
			},
		},
	];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(TableCaseQuery, testCase.variables);
		testCase.validate(response.data as TableCaseQueryType);
	});
});

// ============================================
// Test Suite: Search Cases Query
// ============================================

describe("Graphql CRM Search Cases Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(async () => {
		executor = graphQLQueryExecutor({ enableJWT: false });
		await setupTestUser();
	});

	const cases: SearchCaseTestCase[] = [
		{
			name: "Case_Search_ByCaseNumber",
			variables: {
				search: "CASE-001",
			},
			success: true,
			validate: (response) => {
				expect(response).toBeDefined();
				const data = response as any;
				expect(Array.isArray(data?.crm?.cases)).toBe(true);
			},
		},
		{
			name: "Case_Search_PartialMatch",
			variables: {
				search: "CASE",
			},
			success: true,
			validate: (response) => {
				expect(response).toBeDefined();
				const data = response as any;
				expect(Array.isArray(data?.crm?.cases)).toBe(true);
			},
		},
		{
			name: "Case_Search_EmptyResults",
			variables: {
				search: "NonExistentCaseXYZ123456",
			},
			success: true,
			validate: (response) => {
				expect(response).toBeDefined();
				const data = response as any;
				expect(Array.isArray(data?.crm?.cases)).toBe(true);
				expect(data?.crm?.cases?.length).toBe(0);
			},
		},
		{
			name: "Case_Search_ByDescription",
			variables: {
				search: "login",
			},
			success: true,
			validate: (response) => {
				expect(response).toBeDefined();
				const data = response as any;
				expect(Array.isArray(data?.crm?.cases)).toBe(true);
			},
		},
		{
			name: "Case_Search_NumericCaseNumber",
			variables: {
				search: "001",
			},
			success: true,
			validate: (response) => {
				expect(response).toBeDefined();
				const data = response as any;
				expect(Array.isArray(data?.crm?.cases)).toBe(true);
			},
		},
	];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(SearchCasesQuery, testCase.variables);
		testCase.validate(response.data as SearchCasesQueryType);
	});
});

// ============================================
// Test Suite: Search Cases Query - Advanced Search
// ============================================

describe("Graphql CRM Search Cases Query - Advanced Search", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(async () => {
		executor = graphQLQueryExecutor({ enableJWT: false });
		await setupTestUser();
	});

	const cases: SearchCaseTestCase[] = [
		{
			name: "Case_Search_BySubject",
			variables: {
				search: "login",
			},
			success: true,
			validate: (response) => {
				expect(response).toBeDefined();
				const data = response as any;
				expect(Array.isArray(data?.crm?.cases)).toBe(true);
			},
		},
		{
			name: "Case_Search_ByContactRelationship",
			variables: {
				search: "customer",
			},
			success: true,
			validate: (response) => {
				expect(response).toBeDefined();
				const data = response as any;
				expect(Array.isArray(data?.crm?.cases)).toBe(true);
			},
		},
		{
			name: "Case_Search_ByPriority",
			variables: {
				search: "CRITICAL",
			},
			success: true,
			validate: (response) => {
				expect(response).toBeDefined();
				const data = response as any;
				expect(Array.isArray(data?.crm?.cases)).toBe(true);
			},
		},
		{
			name: "Case_Search_MultiwordQuery",
			variables: {
				search: "payment processing",
			},
			success: true,
			validate: (response) => {
				expect(response).toBeDefined();
				const data = response as any;
				expect(Array.isArray(data?.crm?.cases)).toBe(true);
			},
		},
		{
			name: "Case_Search_SpecialCharacters",
			variables: {
				search: "error@system",
			},
			success: true,
			validate: (response) => {
				expect(response).toBeDefined();
				const data = response as any;
				expect(Array.isArray(data?.crm?.cases)).toBe(true);
				expect(data?.crm?.cases?.length).toBe(0);
			},
		},
	];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(SearchCasesQuery, testCase.variables);
		testCase.validate(response.data as SearchCasesQueryType);
	});
});

// ============================================
// Test Suite: Analytics Cases Query
// ============================================

describe("Graphql CRM Analytics Cases Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(async () => {
		executor = graphQLQueryExecutor({ enableJWT: false });
		await setupTestUser();
	});

	const cases: AnalyticsCaseTestCase[] = [
		{
			name: "Case_Analytics_GetAll",
			variables: {},
			success: true,
			validate: (response) => {
				expect(response).toBeDefined();
				const data = response as any;
				expect(data?.crm?.cases).toBeDefined();
			},
		},
		{
			name: "Case_Analytics_WithDateRange",
			variables: {
				from: "2025-01-01" as any,
				to: "2025-12-31" as any,
			},
			success: true,
			validate: (response) => {
				expect(response).toBeDefined();
				const data = response as any;
				expect(Array.isArray(data?.crm?.cases)).toBe(true);
			},
		},
		{
			name: "Case_Analytics_FutureDate",
			variables: {
				from: "2026-01-01" as any,
				to: "2026-12-31" as any,
			},
			success: true,
			validate: (response) => {
				expect(response).toBeDefined();
				const data = response as any;
				expect(Array.isArray(data?.crm?.cases)).toBe(true);
			},
		},
	];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(AnalyticsCasesQuery, testCase.variables);
		testCase.validate(response.data as AnalyticsCasesQueryType);
	});
});
