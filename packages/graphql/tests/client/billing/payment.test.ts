import { describe, expect, it, beforeAll } from "bun:test";
import "../../setup";
import { graphQLQueryExecutor } from "../../helpers";
import type {
	CreatePaymentMutation as CreatePaymentMutationType,
	CreatePaymentMutationVariables,
	UpdatePaymentMutation as UpdatePaymentMutationType,
	UpdatePaymentMutationVariables,
	RemovePaymentMutation as RemovePaymentMutationType,
	RemovePaymentMutationVariables,
	TablePaymentQuery as TablePaymentQueryType,
	TablePaymentQueryVariables,
	SearchPaymentsQuery as SearchPaymentsQueryType,
	SearchPaymentsQueryVariables,
	AnalyticsPaymentsQuery as AnalyticsPaymentsQueryType,
	AnalyticsPaymentsQueryVariables,
} from "../../../src/client/generated/graphql";
import type {
	CreatePaymentInput,
	UpdatePaymentInput,
} from "../../../src/client/generated/graphql";
import {
	CreatePaymentMutation,
	UpdatePaymentMutation,
	RemovePaymentMutation,
	TablePaymentQuery,
	SearchPaymentsQuery,
	AnalyticsPaymentsQuery,
} from "../../../src/client";
import type { GraphQLTestCase } from "../../inputs/helpers";
// ============================================
// Type Definitions
// ============================================

type CreatePaymentTestCase = GraphQLTestCase<
	CreatePaymentMutationVariables,
	CreatePaymentMutationType
>;

type UpdatePaymentTestCase = GraphQLTestCase<
	UpdatePaymentMutationVariables,
	UpdatePaymentMutationType
> & {
	createData: CreatePaymentInput;
	updateData: UpdatePaymentInput;
	validate?: (response: UpdatePaymentMutationType, createdPayment: any) => void;
};

type RemovePaymentTestCase = GraphQLTestCase<
	RemovePaymentMutationVariables,
	RemovePaymentMutationType
> & {
	createData: CreatePaymentInput;
	shouldCreate?: boolean;
	validate?: (response: RemovePaymentMutationType) => void;
};

type TablePaymentTestCase = GraphQLTestCase<
	TablePaymentQueryVariables,
	TablePaymentQueryType
> & {
	validate: (response: TablePaymentQueryType) => void;
};

type SearchPaymentsTestCase = GraphQLTestCase<
	SearchPaymentsQueryVariables,
	SearchPaymentsQueryType
> & {
	validate: (response: SearchPaymentsQueryType) => void;
};

type AnalyticsPaymentsTestCase = GraphQLTestCase<
	AnalyticsPaymentsQueryVariables,
	AnalyticsPaymentsQueryType
> & {
	validate: (response: AnalyticsPaymentsQueryType) => void;
};
// ============================================
// Test Suite: Create Payment
// ============================================

describe("Graphql Create Payment", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreatePaymentTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(CreatePaymentMutation, testCase.variables);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.billing?.createPayment).toBeDefined();
			expect(response.data?.billing?.createPayment?.id).toBeDefined();
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
// Test Suite: Update Payment
// ============================================

describe("Graphql Update Payment", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: UpdatePaymentTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		// Create initial Payment
		const createResponse = await executor(CreatePaymentMutation, {
			payment: testCase.createData,
		});

		expect(createResponse.data?.billing?.createPayment?.id).toBeDefined();
		const paymentId = createResponse.data!.billing!.createPayment!.id!;
		const createdPayment = createResponse.data!.billing!.createPayment!;

		// Update Payment
		const updateResponse = await executor(UpdatePaymentMutation, {
			id: testCase.variables.id,
			payment: testCase.updateData,
		});

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(updateResponse.data?.billing?.updatePayment).toBeDefined();
			if (testCase.validate) {
				testCase.validate(
					updateResponse.data as UpdatePaymentMutationType,
					createdPayment,
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
// Test Suite: Remove Payment
// ============================================

describe("Graphql Remove Payment", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: RemovePaymentTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		let paymentId: string;

		if (testCase.shouldCreate) {
			const createResponse = await executor(CreatePaymentMutation, {
				payment: {
					// Add minimal required fields
				} as unknown as CreatePaymentInput,
			});
			paymentId = createResponse.data!.billing!.createPayment!.id!;
		} else {
			paymentId = "00000000-0000-0000-0000-000000000000";
		}

		const deleteResponse = await executor(RemovePaymentMutation, {
			id: paymentId,
		});

		if (testCase.success) {
			expect(deleteResponse.errors).toBeUndefined();
			expect(deleteResponse.data?.billing?.removePayment).toBeDefined();
		} else {
			if (deleteResponse.errors) {
				expect(Array.isArray(deleteResponse.errors)).toBe(true);
			} else {
				expect(deleteResponse.data?.billing?.removePayment?.success).toBe(false);
			}
		}

		if (testCase.validate) {
			testCase.validate(deleteResponse.data as RemovePaymentMutationType);
		}
	});
});

// ============================================
// Test Suite: Table Payments Query
// ============================================

describe("Graphql Table Payments Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: TablePaymentTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(TablePaymentQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.billing?.payments).toBeDefined();
			testCase.validate(response.data as TablePaymentQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});

// ============================================
// Test Suite: Search Payments Query
// ============================================

describe("Graphql Search Payments Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: SearchPaymentsTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(SearchPaymentsQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.billing?.payments).toBeDefined();
			testCase.validate(response.data as SearchPaymentsQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});

// ============================================
// Test Suite: Analytics Payments Query
// ============================================

describe("Graphql Analytics Payments Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: AnalyticsPaymentsTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(AnalyticsPaymentsQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.billing?.payments).toBeDefined();
			testCase.validate(response.data as AnalyticsPaymentsQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});
