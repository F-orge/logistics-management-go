import { beforeAll, describe, expect, it } from "bun:test";
import "../../setup";
import {
	CreateWarehouseMutation,
	RemoveWarehouseMutation,
	SearchWarehousesQuery,
	TableWarehouseQuery,
	UpdateWarehouseMutation,
} from "../../../src/client";
import type {
	CreateWarehouseInput,
	CreateWarehouseMutation as CreateWarehouseMutationType,
	CreateWarehouseMutationVariables,
	RemoveWarehouseMutation as RemoveWarehouseMutationType,
	RemoveWarehouseMutationVariables,
	SearchWarehousesQuery as SearchWarehousesQueryType,
	SearchWarehousesQueryVariables,
	TableWarehouseQuery as TableWarehouseQueryType,
	TableWarehouseQueryVariables,
	UpdateWarehouseInput,
	UpdateWarehouseMutation as UpdateWarehouseMutationType,
	UpdateWarehouseMutationVariables,
} from "../../../src/client/generated/graphql";
import { graphQLQueryExecutor } from "../../helpers";
import type { GraphQLTestCase } from "../../inputs/helpers";

// ============================================
// Type Definitions
// ============================================

type CreateWarehouseTestCase = GraphQLTestCase<
	CreateWarehouseMutationVariables,
	CreateWarehouseMutationType
>;

type UpdateWarehouseTestCase = GraphQLTestCase<
	UpdateWarehouseMutationVariables,
	UpdateWarehouseMutationType
> & {
	createData: CreateWarehouseInput;
	updateData: UpdateWarehouseInput;
	validate?: (
		response: UpdateWarehouseMutationType,
		createdWarehouse: any,
	) => void;
};

type RemoveWarehouseTestCase = GraphQLTestCase<
	RemoveWarehouseMutationVariables,
	RemoveWarehouseMutationType
> & {
	createData: CreateWarehouseInput;
	shouldCreate?: boolean;
	validate?: (response: RemoveWarehouseMutationType) => void;
};

type TableWarehouseTestCase = GraphQLTestCase<
	TableWarehouseQueryVariables,
	TableWarehouseQueryType
> & {
	validate: (response: TableWarehouseQueryType) => void;
};

type SearchWarehousesTestCase = GraphQLTestCase<
	SearchWarehousesQueryVariables,
	SearchWarehousesQueryType
> & {
	validate: (response: SearchWarehousesQueryType) => void;
};
// ============================================
// Test Suite: Create Warehouse
// ============================================

describe("Graphql Create Warehouse", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreateWarehouseTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			CreateWarehouseMutation,
			testCase.variables,
		);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.createWarehouse).toBeDefined();
			expect(response.data?.wms?.createWarehouse?.id).toBeDefined();
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
// Test Suite: Update Warehouse
// ============================================

describe("Graphql Update Warehouse", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: UpdateWarehouseTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		// Create initial Warehouse
		const createResponse = await executor(CreateWarehouseMutation, {
			warehouse: testCase.createData,
		});

		expect(createResponse.data?.wms?.createWarehouse?.id).toBeDefined();
		const warehouseId = createResponse.data!.wms!.createWarehouse!.id!;
		const createdWarehouse = createResponse.data!.wms!.createWarehouse!;

		// Update Warehouse
		const updateResponse = await executor(UpdateWarehouseMutation, {
			id: testCase.variables.id,
			warehouse: testCase.updateData,
		});

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(updateResponse.data?.wms?.updateWarehouse).toBeDefined();
			if (testCase.validate) {
				testCase.validate(
					updateResponse.data as UpdateWarehouseMutationType,
					createdWarehouse,
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
// Test Suite: Remove Warehouse
// ============================================

describe("Graphql Remove Warehouse", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: RemoveWarehouseTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		let warehouseId: string;

		if (testCase.shouldCreate) {
			const createResponse = await executor(CreateWarehouseMutation, {
				warehouse: {
					// Add minimal required fields
				} as unknown as CreateWarehouseInput,
			});
			warehouseId = createResponse.data!.wms!.createWarehouse!.id!;
		} else {
			warehouseId = "00000000-0000-0000-0000-000000000000";
		}

		const deleteResponse = await executor(RemoveWarehouseMutation, {
			id: warehouseId,
		});

		if (testCase.success) {
			expect(deleteResponse.errors).toBeUndefined();
			expect(deleteResponse.data?.wms?.removeWarehouse).toBeDefined();
		} else {
			if (deleteResponse.errors) {
				expect(Array.isArray(deleteResponse.errors)).toBe(true);
			} else {
				expect(deleteResponse.data?.wms?.removeWarehouse?.success).toBe(false);
			}
		}

		if (testCase.validate) {
			testCase.validate(deleteResponse.data as RemoveWarehouseMutationType);
		}
	});
});

// ============================================
// Test Suite: Table Warehouses Query
// ============================================

describe("Graphql Table Warehouses Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: TableWarehouseTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(TableWarehouseQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.warehouses).toBeDefined();
			testCase.validate(response.data as TableWarehouseQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});

// ============================================
// Test Suite: Search Warehouses Query
// ============================================

describe("Graphql Search Warehouses Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: SearchWarehousesTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(SearchWarehousesQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.warehouses).toBeDefined();
			testCase.validate(response.data as SearchWarehousesQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});
