import { describe, expect, it, beforeAll } from "bun:test";
import "../../setup";
import { graphQLQueryExecutor } from "../../helpers";
import type {
	CreateRateCardMutation as CreateRateCardMutationType,
	CreateRateCardMutationVariables,
	UpdateRateCardMutation as UpdateRateCardMutationType,
	UpdateRateCardMutationVariables,
	RemoveRateCardMutation as RemoveRateCardMutationType,
	RemoveRateCardMutationVariables,
	TableRateCardQuery as TableRateCardQueryType,
	TableRateCardQueryVariables,
	SearchRateCardsQuery as SearchRateCardsQueryType,
	SearchRateCardsQueryVariables,
	AnalyticsRateCardsQuery as AnalyticsRateCardsQueryType,
	AnalyticsRateCardsQueryVariables,
} from "../../../src/client/generated/graphql";
import type {
	CreateRateCardInput,
	UpdateRateCardInput,
} from "../../../src/client/generated/graphql";
import {
	CreateRateCardMutation,
	UpdateRateCardMutation,
	RemoveRateCardMutation,
	TableRateCardQuery,
	SearchRateCardsQuery,
	AnalyticsRateCardsQuery,
} from "../../../src/client";
import type { GraphQLTestCase } from "../../inputs/helpers";
// ============================================
// Type Definitions
// ============================================

type CreateRateCardTestCase = GraphQLTestCase<
	CreateRateCardMutationVariables,
	CreateRateCardMutationType
>;

type UpdateRateCardTestCase = GraphQLTestCase<
	UpdateRateCardMutationVariables,
	UpdateRateCardMutationType
> & {
	createData: CreateRateCardInput;
	updateData: UpdateRateCardInput;
	validate?: (response: UpdateRateCardMutationType, createdRateCard: any) => void;
};

type RemoveRateCardTestCase = GraphQLTestCase<
	RemoveRateCardMutationVariables,
	RemoveRateCardMutationType
> & {
	createData: CreateRateCardInput;
	shouldCreate?: boolean;
	validate?: (response: RemoveRateCardMutationType) => void;
};

type TableRateCardTestCase = GraphQLTestCase<
	TableRateCardQueryVariables,
	TableRateCardQueryType
> & {
	validate: (response: TableRateCardQueryType) => void;
};

type SearchRateCardsTestCase = GraphQLTestCase<
	SearchRateCardsQueryVariables,
	SearchRateCardsQueryType
> & {
	validate: (response: SearchRateCardsQueryType) => void;
};

type AnalyticsRateCardsTestCase = GraphQLTestCase<
	AnalyticsRateCardsQueryVariables,
	AnalyticsRateCardsQueryType
> & {
	validate: (response: AnalyticsRateCardsQueryType) => void;
};
// ============================================
// Test Suite: Create RateCard
// ============================================

describe("Graphql Create RateCard", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreateRateCardTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(CreateRateCardMutation, testCase.variables);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.billing?.createRateCard).toBeDefined();
			expect(response.data?.billing?.createRateCard?.id).toBeDefined();
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
// Test Suite: Update RateCard
// ============================================

describe("Graphql Update RateCard", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: UpdateRateCardTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		// Create initial RateCard
		const createResponse = await executor(CreateRateCardMutation, {
			rateCard: testCase.createData,
		});

		expect(createResponse.data?.billing?.createRateCard?.id).toBeDefined();
		const rateCardId = createResponse.data!.billing!.createRateCard!.id!;
		const createdRateCard = createResponse.data!.billing!.createRateCard!;

		// Update RateCard
		const updateResponse = await executor(UpdateRateCardMutation, {
			id: testCase.variables.id,
			rateCard: testCase.updateData,
		});

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(updateResponse.data?.billing?.updateRateCard).toBeDefined();
			if (testCase.validate) {
				testCase.validate(
					updateResponse.data as UpdateRateCardMutationType,
					createdRateCard,
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
// Test Suite: Remove RateCard
// ============================================

describe("Graphql Remove RateCard", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: RemoveRateCardTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		let rateCardId: string;

		if (testCase.shouldCreate) {
			const createResponse = await executor(CreateRateCardMutation, {
				rateCard: {
					// Add minimal required fields
				} as unknown as CreateRateCardInput,
			});
			rateCardId = createResponse.data!.billing!.createRateCard!.id!;
		} else {
			rateCardId = "00000000-0000-0000-0000-000000000000";
		}

		const deleteResponse = await executor(RemoveRateCardMutation, {
			id: rateCardId,
		});

		if (testCase.success) {
			expect(deleteResponse.errors).toBeUndefined();
			expect(deleteResponse.data?.billing?.removeRateCard).toBeDefined();
		} else {
			if (deleteResponse.errors) {
				expect(Array.isArray(deleteResponse.errors)).toBe(true);
			} else {
				expect(deleteResponse.data?.billing?.removeRateCard?.success).toBe(false);
			}
		}

		if (testCase.validate) {
			testCase.validate(deleteResponse.data as RemoveRateCardMutationType);
		}
	});
});

// ============================================
// Test Suite: Table RateCards Query
// ============================================

describe("Graphql Table RateCards Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: TableRateCardTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(TableRateCardQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.billing?.rate_cards).toBeDefined();
			testCase.validate(response.data as TableRateCardQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});

// ============================================
// Test Suite: Search RateCards Query
// ============================================

describe("Graphql Search RateCards Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: SearchRateCardsTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(SearchRateCardsQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.billing?.rate_cards).toBeDefined();
			testCase.validate(response.data as SearchRateCardsQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});

// ============================================
// Test Suite: Analytics RateCards Query
// ============================================

describe("Graphql Analytics RateCards Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: AnalyticsRateCardsTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(AnalyticsRateCardsQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.billing?.rate_cards).toBeDefined();
			testCase.validate(response.data as AnalyticsRateCardsQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});
