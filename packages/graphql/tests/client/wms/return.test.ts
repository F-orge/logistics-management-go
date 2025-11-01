import { describe, expect, it, beforeAll } from "bun:test";
import "../../setup";
import { graphQLQueryExecutor } from "../../helpers";
import type {
	CreateReturnMutation as CreateReturnMutationType,
	CreateReturnMutationVariables,
	UpdateReturnMutation as UpdateReturnMutationType,
	UpdateReturnMutationVariables,
	RemoveReturnMutation as RemoveReturnMutationType,
	RemoveReturnMutationVariables,
	TableReturnQuery as TableReturnQueryType,
	TableReturnQueryVariables,
	SearchReturnsQuery as SearchReturnsQueryType,
	SearchReturnsQueryVariables,
	AnalyticsReturnsQuery as AnalyticsReturnsQueryType,
	AnalyticsReturnsQueryVariables,
} from "../../../src/client/generated/graphql";
import type {
	CreateReturnInput,
	UpdateReturnInput,
} from "../../../src/client/generated/graphql";
import {
	CreateReturnMutation,
	UpdateReturnMutation,
	RemoveReturnMutation,
	TableReturnQuery,
	SearchReturnsQuery,
	AnalyticsReturnsQuery,
} from "../../../src/client";
import type { GraphQLTestCase } from "../../inputs/helpers";
// ============================================
// Type Definitions
// ============================================

type CreateReturnTestCase = GraphQLTestCase<
	CreateReturnMutationVariables,
	CreateReturnMutationType
>;

type UpdateReturnTestCase = GraphQLTestCase<
	UpdateReturnMutationVariables,
	UpdateReturnMutationType
> & {
	createData: CreateReturnInput;
	updateData: UpdateReturnInput;
	validate?: (response: UpdateReturnMutationType, createdReturn: any) => void;
};

type RemoveReturnTestCase = GraphQLTestCase<
	RemoveReturnMutationVariables,
	RemoveReturnMutationType
> & {
	createData: CreateReturnInput;
	shouldCreate?: boolean;
	validate?: (response: RemoveReturnMutationType) => void;
};

type TableReturnTestCase = GraphQLTestCase<
	TableReturnQueryVariables,
	TableReturnQueryType
> & {
	validate: (response: TableReturnQueryType) => void;
};

type SearchReturnsTestCase = GraphQLTestCase<
	SearchReturnsQueryVariables,
	SearchReturnsQueryType
> & {
	validate: (response: SearchReturnsQueryType) => void;
};

type AnalyticsReturnsTestCase = GraphQLTestCase<
	AnalyticsReturnsQueryVariables,
	AnalyticsReturnsQueryType
> & {
	validate: (response: AnalyticsReturnsQueryType) => void;
};
// ============================================
// Test Suite: Create Return
// ============================================

describe("Graphql Create Return", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreateReturnTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(CreateReturnMutation, testCase.variables);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.createReturn).toBeDefined();
			expect(response.data?.wms?.createReturn?.id).toBeDefined();
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
// Test Suite: Update Return
// ============================================

describe("Graphql Update Return", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: UpdateReturnTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		// Create initial Return
		const createResponse = await executor(CreateReturnMutation, {
			return: testCase.createData,
		});

		expect(createResponse.data?.wms?.createReturn?.id).toBeDefined();
		const returnId = createResponse.data!.wms!.createReturn!.id!;
		const createdReturn = createResponse.data!.wms!.createReturn!;

		// Update Return
		const updateResponse = await executor(UpdateReturnMutation, {
			id: testCase.variables.id,
			return: testCase.updateData,
		});

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(updateResponse.data?.wms?.updateReturn).toBeDefined();
			if (testCase.validate) {
				testCase.validate(
					updateResponse.data as UpdateReturnMutationType,
					createdReturn,
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
// Test Suite: Remove Return
// ============================================

describe("Graphql Remove Return", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: RemoveReturnTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		let returnId: string;

		if (testCase.shouldCreate) {
			const createResponse = await executor(CreateReturnMutation, {
				return: {
					// Add minimal required fields
				} as unknown as CreateReturnInput,
			});
			returnId = createResponse.data!.wms!.createReturn!.id!;
		} else {
			returnId = "00000000-0000-0000-0000-000000000000";
		}

		const deleteResponse = await executor(RemoveReturnMutation, {
			id: returnId,
		});

		if (testCase.success) {
			expect(deleteResponse.errors).toBeUndefined();
			expect(deleteResponse.data?.wms?.removeReturn).toBeDefined();
		} else {
			if (deleteResponse.errors) {
				expect(Array.isArray(deleteResponse.errors)).toBe(true);
			} else {
				expect(deleteResponse.data?.wms?.removeReturn?.success).toBe(false);
			}
		}

		if (testCase.validate) {
			testCase.validate(deleteResponse.data as RemoveReturnMutationType);
		}
	});
});

// ============================================
// Test Suite: Table Returns Query
// ============================================

describe("Graphql Table Returns Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: TableReturnTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(TableReturnQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.returns).toBeDefined();
			testCase.validate(response.data as TableReturnQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});

// ============================================
// Test Suite: Search Returns Query
// ============================================

describe("Graphql Search Returns Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: SearchReturnsTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(SearchReturnsQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.returns).toBeDefined();
			testCase.validate(response.data as SearchReturnsQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});

// ============================================
// Test Suite: Analytics Returns Query
// ============================================

describe("Graphql Analytics Returns Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: AnalyticsReturnsTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(AnalyticsReturnsQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.returns).toBeDefined();
			testCase.validate(response.data as AnalyticsReturnsQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});
