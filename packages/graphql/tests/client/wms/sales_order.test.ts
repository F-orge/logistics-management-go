import { describe, expect, it, beforeAll } from "bun:test";
import "../../setup";
import { graphQLQueryExecutor } from "../../helpers";
import type {
	CreateSalesOrderMutation as CreateSalesOrderMutationType,
	CreateSalesOrderMutationVariables,
	UpdateSalesOrderMutation as UpdateSalesOrderMutationType,
	UpdateSalesOrderMutationVariables,
	RemoveSalesOrderMutation as RemoveSalesOrderMutationType,
	RemoveSalesOrderMutationVariables,
	TableSalesOrderQuery as TableSalesOrderQueryType,
	TableSalesOrderQueryVariables,
	SearchSalesOrdersQuery as SearchSalesOrdersQueryType,
	SearchSalesOrdersQueryVariables,
	AnalyticsSalesOrdersQuery as AnalyticsSalesOrdersQueryType,
	AnalyticsSalesOrdersQueryVariables,
} from "../../../src/client/generated/graphql";
import type {
	CreateSalesOrderInput,
	UpdateSalesOrderInput,
} from "../../../src/client/generated/graphql";
import {
	CreateSalesOrderMutation,
	UpdateSalesOrderMutation,
	RemoveSalesOrderMutation,
	TableSalesOrderQuery,
	SearchSalesOrdersQuery,
	AnalyticsSalesOrdersQuery,
} from "../../../src/client";
import type { GraphQLTestCase } from "../../inputs/helpers";
// ============================================
// Type Definitions
// ============================================

type CreateSalesOrderTestCase = GraphQLTestCase<
	CreateSalesOrderMutationVariables,
	CreateSalesOrderMutationType
>;

type UpdateSalesOrderTestCase = GraphQLTestCase<
	UpdateSalesOrderMutationVariables,
	UpdateSalesOrderMutationType
> & {
	createData: CreateSalesOrderInput;
	updateData: UpdateSalesOrderInput;
	validate?: (response: UpdateSalesOrderMutationType, createdSalesOrder: any) => void;
};

type RemoveSalesOrderTestCase = GraphQLTestCase<
	RemoveSalesOrderMutationVariables,
	RemoveSalesOrderMutationType
> & {
	createData: CreateSalesOrderInput;
	shouldCreate?: boolean;
	validate?: (response: RemoveSalesOrderMutationType) => void;
};

type TableSalesOrderTestCase = GraphQLTestCase<
	TableSalesOrderQueryVariables,
	TableSalesOrderQueryType
> & {
	validate: (response: TableSalesOrderQueryType) => void;
};

type SearchSalesOrdersTestCase = GraphQLTestCase<
	SearchSalesOrdersQueryVariables,
	SearchSalesOrdersQueryType
> & {
	validate: (response: SearchSalesOrdersQueryType) => void;
};

type AnalyticsSalesOrdersTestCase = GraphQLTestCase<
	AnalyticsSalesOrdersQueryVariables,
	AnalyticsSalesOrdersQueryType
> & {
	validate: (response: AnalyticsSalesOrdersQueryType) => void;
};
// ============================================
// Test Suite: Create SalesOrder
// ============================================

describe("Graphql Create SalesOrder", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreateSalesOrderTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(CreateSalesOrderMutation, testCase.variables);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.createSalesOrder).toBeDefined();
			expect(response.data?.wms?.createSalesOrder?.id).toBeDefined();
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
// Test Suite: Update SalesOrder
// ============================================

describe("Graphql Update SalesOrder", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: UpdateSalesOrderTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		// Create initial SalesOrder
		const createResponse = await executor(CreateSalesOrderMutation, {
			salesOrder: testCase.createData,
		});

		expect(createResponse.data?.wms?.createSalesOrder?.id).toBeDefined();
		const salesOrderId = createResponse.data!.wms!.createSalesOrder!.id!;
		const createdSalesOrder = createResponse.data!.wms!.createSalesOrder!;

		// Update SalesOrder
		const updateResponse = await executor(UpdateSalesOrderMutation, {
			id: testCase.variables.id,
			salesOrder: testCase.updateData,
		});

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(updateResponse.data?.wms?.updateSalesOrder).toBeDefined();
			if (testCase.validate) {
				testCase.validate(
					updateResponse.data as UpdateSalesOrderMutationType,
					createdSalesOrder,
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
// Test Suite: Remove SalesOrder
// ============================================

describe("Graphql Remove SalesOrder", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: RemoveSalesOrderTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		let salesOrderId: string;

		if (testCase.shouldCreate) {
			const createResponse = await executor(CreateSalesOrderMutation, {
				salesOrder: {
					// Add minimal required fields
				} as unknown as CreateSalesOrderInput,
			});
			salesOrderId = createResponse.data!.wms!.createSalesOrder!.id!;
		} else {
			salesOrderId = "00000000-0000-0000-0000-000000000000";
		}

		const deleteResponse = await executor(RemoveSalesOrderMutation, {
			id: salesOrderId,
		});

		if (testCase.success) {
			expect(deleteResponse.errors).toBeUndefined();
			expect(deleteResponse.data?.wms?.removeSalesOrder).toBeDefined();
		} else {
			if (deleteResponse.errors) {
				expect(Array.isArray(deleteResponse.errors)).toBe(true);
			} else {
				expect(deleteResponse.data?.wms?.removeSalesOrder?.success).toBe(false);
			}
		}

		if (testCase.validate) {
			testCase.validate(deleteResponse.data as RemoveSalesOrderMutationType);
		}
	});
});

// ============================================
// Test Suite: Table SalesOrders Query
// ============================================

describe("Graphql Table SalesOrders Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: TableSalesOrderTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(TableSalesOrderQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.sales_orders).toBeDefined();
			testCase.validate(response.data as TableSalesOrderQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});

// ============================================
// Test Suite: Search SalesOrders Query
// ============================================

describe("Graphql Search SalesOrders Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: SearchSalesOrdersTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(SearchSalesOrdersQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.sales_orders).toBeDefined();
			testCase.validate(response.data as SearchSalesOrdersQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});

// ============================================
// Test Suite: Analytics SalesOrders Query
// ============================================

describe("Graphql Analytics SalesOrders Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: AnalyticsSalesOrdersTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(AnalyticsSalesOrdersQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.sales_orders).toBeDefined();
			testCase.validate(response.data as AnalyticsSalesOrdersQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});
