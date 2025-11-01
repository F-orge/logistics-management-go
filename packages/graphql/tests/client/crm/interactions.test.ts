import { describe, expect, it, beforeAll } from "bun:test";
import "../../setup";
import { graphQLQueryExecutor } from "../../helpers";
import type {
	CreateInteractionMutation as CreateInteractionMutationType,
	CreateInteractionMutationVariables,
	UpdateInteractionMutation as UpdateInteractionMutationType,
	UpdateInteractionMutationVariables,
	RemoveInteractionMutation as RemoveInteractionMutationType,
	RemoveInteractionMutationVariables,
	TableInteractionQuery as TableInteractionQueryType,
	TableInteractionQueryVariables,
	SearchInteractionsQuery as SearchInteractionsQueryType,
	SearchInteractionsQueryVariables,
} from "../../../src/client/generated/graphql";
import type {
	CreateInteractionInput,
	UpdateInteractionInput,
} from "../../../src/client/generated/graphql";
import {
	CreateInteractionMutation,
	UpdateInteractionMutation,
	RemoveInteractionMutation,
	TableInteractionQuery,
	SearchInteractionsQuery,
} from "../../../src/client";
import type { GraphQLTestCase } from "../../inputs/helpers";

// ============================================
// Type Definitions
// ============================================

type CreateInteractionTestCase = GraphQLTestCase<
	CreateInteractionMutationVariables,
	CreateInteractionMutationType
>;

type UpdateInteractionTestCase = GraphQLTestCase<
	UpdateInteractionMutationVariables,
	UpdateInteractionMutationType
> & {
	createData: CreateInteractionInput;
	updateData: UpdateInteractionInput;
	validate?: (
		response: UpdateInteractionMutationType,
		createdInteraction: any,
	) => void;
};

type RemoveInteractionTestCase = GraphQLTestCase<
	RemoveInteractionMutationVariables,
	RemoveInteractionMutationType
> & {
	shouldCreate: boolean;
	validate?: (response: RemoveInteractionMutationType) => void;
};

type TableInteractionTestCase = GraphQLTestCase<
	TableInteractionQueryVariables,
	TableInteractionQueryType
> & {
	validate: (response: TableInteractionQueryType) => void;
};

type SearchInteractionTestCase = GraphQLTestCase<
	SearchInteractionsQueryVariables,
	SearchInteractionsQueryType
> & {
	validate: (response: SearchInteractionsQueryType) => void;
};

// ============================================
// Helper Functions
// ============================================

// ============================================
// Test Suite: Create Interaction
// ============================================

describe("Graphql CRM Create Interaction", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreateInteractionTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			CreateInteractionMutation,
			testCase.variables,
		);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.crm?.createInteraction).toBeDefined();
			expect(response.data?.crm?.createInteraction?.id).toBeDefined();
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
// Test Suite: Update Interaction
// ============================================

describe("Graphql CRM Update Interaction", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: UpdateInteractionTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		// Create initial interaction
		const createResponse = await executor(CreateInteractionMutation, {
			interaction: testCase.createData,
		});

		expect(createResponse.data?.crm?.createInteraction?.id).toBeDefined();
		const interactionId = createResponse.data!.crm!.createInteraction!.id!;
		const createdInteraction = createResponse.data!.crm!.createInteraction!;

		// Update interaction
		const updateResponse = await executor(UpdateInteractionMutation, {
			id: interactionId,
			interaction: testCase.updateData,
		});

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(updateResponse.data?.crm?.updateInteraction).toBeDefined();
			if (testCase.validate) {
				testCase.validate(
					updateResponse.data as UpdateInteractionMutationType,
					createdInteraction,
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
// Test Suite: Remove Interaction
// ============================================

describe("Graphql CRM Remove Interaction", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: RemoveInteractionTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		let interactionId: string;

		if (testCase.shouldCreate) {
			const createResponse = await executor(CreateInteractionMutation, {
				interaction: {} as unknown as CreateInteractionInput,
			});
			interactionId = createResponse.data!.crm!.createInteraction!.id!;
		} else {
			interactionId = "00000000-0000-0000-0000-000000000000";
		}

		const deleteResponse = await executor(RemoveInteractionMutation, {
			id: interactionId,
		});

		if (testCase.success) {
			expect(deleteResponse.errors).toBeUndefined();
			expect(deleteResponse.data?.crm?.removeInteraction).toBeDefined();
		} else {
			if (deleteResponse.errors) {
				expect(Array.isArray(deleteResponse.errors)).toBe(true);
			} else {
				expect(deleteResponse.data?.crm?.removeInteraction?.success).toBe(
					false,
				);
			}
		}

		if (testCase.validate) {
			testCase.validate(deleteResponse.data as RemoveInteractionMutationType);
		}
	});
});

// ============================================
// Test Suite: Table Interaction Query
// ============================================

describe("Graphql CRM Table Interaction Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	let createdInteractions: Array<{
		id: string;
	}> = [];

	beforeAll(async () => {
		executor = graphQLQueryExecutor({ enableJWT: false });
		// Setup interactions for table testing if needed
	});

	const cases: TableInteractionTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(TableInteractionQuery, testCase.variables);
		testCase.validate(response.data as TableInteractionQueryType);
	});
});

// ============================================
// Test Suite: Search Interactions Query
// ============================================

describe("Graphql CRM Search Interactions Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	let createdInteractions: Array<{ id: string }> = [];

	beforeAll(async () => {
		executor = graphQLQueryExecutor({ enableJWT: false });
		// Setup interactions for search testing if needed
	});

	const cases: SearchInteractionTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			SearchInteractionsQuery,
			testCase.variables,
		);
		testCase.validate(response.data as SearchInteractionsQueryType);
	});
});
