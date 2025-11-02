import { beforeAll, describe, expect, it } from "bun:test";
import "../../setup";
import {
	CreateSupplierMutation,
	RemoveSupplierMutation,
	SearchSuppliersQuery,
	TableSupplierQuery,
	UpdateSupplierMutation,
} from "../../../src/client";
import type {
	CreateSupplierInput,
	CreateSupplierMutation as CreateSupplierMutationType,
	CreateSupplierMutationVariables,
	RemoveSupplierMutation as RemoveSupplierMutationType,
	RemoveSupplierMutationVariables,
	SearchSuppliersQuery as SearchSuppliersQueryType,
	SearchSuppliersQueryVariables,
	TableSupplierQuery as TableSupplierQueryType,
	TableSupplierQueryVariables,
	UpdateSupplierInput,
	UpdateSupplierMutation as UpdateSupplierMutationType,
	UpdateSupplierMutationVariables,
} from "../../../src/client/generated/graphql";
import { graphQLQueryExecutor } from "../../helpers";
import type { GraphQLTestCase } from "../../inputs/helpers";

// ============================================
// Type Definitions
// ============================================

type CreateSupplierTestCase = GraphQLTestCase<
	CreateSupplierMutationVariables,
	CreateSupplierMutationType
>;

type UpdateSupplierTestCase = GraphQLTestCase<
	UpdateSupplierMutationVariables,
	UpdateSupplierMutationType
> & {
	createData: CreateSupplierInput;
	updateData: UpdateSupplierInput;
	validate?: (
		response: UpdateSupplierMutationType,
		createdSupplier: any,
	) => void;
};

type RemoveSupplierTestCase = GraphQLTestCase<
	RemoveSupplierMutationVariables,
	RemoveSupplierMutationType
> & {
	createData: CreateSupplierInput;
	shouldCreate?: boolean;
	validate?: (response: RemoveSupplierMutationType) => void;
};

type TableSupplierTestCase = GraphQLTestCase<
	TableSupplierQueryVariables,
	TableSupplierQueryType
> & {
	validate: (response: TableSupplierQueryType) => void;
};

type SearchSuppliersTestCase = GraphQLTestCase<
	SearchSuppliersQueryVariables,
	SearchSuppliersQueryType
> & {
	validate: (response: SearchSuppliersQueryType) => void;
};
// ============================================
// Test Suite: Create Supplier
// ============================================

describe("Graphql Create Supplier", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreateSupplierTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(CreateSupplierMutation, testCase.variables);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.createSupplier).toBeDefined();
			expect(response.data?.wms?.createSupplier?.id).toBeDefined();
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
// Test Suite: Update Supplier
// ============================================

describe("Graphql Update Supplier", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: UpdateSupplierTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		// Create initial Supplier
		const createResponse = await executor(CreateSupplierMutation, {
			supplier: testCase.createData,
		});

		expect(createResponse.data?.wms?.createSupplier?.id).toBeDefined();
		const supplierId = createResponse.data!.wms!.createSupplier!.id!;
		const createdSupplier = createResponse.data!.wms!.createSupplier!;

		// Update Supplier
		const updateResponse = await executor(UpdateSupplierMutation, {
			id: testCase.variables.id,
			supplier: testCase.updateData,
		});

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(updateResponse.data?.wms?.updateSupplier).toBeDefined();
			if (testCase.validate) {
				testCase.validate(
					updateResponse.data as UpdateSupplierMutationType,
					createdSupplier,
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
// Test Suite: Remove Supplier
// ============================================

describe("Graphql Remove Supplier", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: RemoveSupplierTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		let supplierId: string;

		if (testCase.shouldCreate) {
			const createResponse = await executor(CreateSupplierMutation, {
				supplier: {
					// Add minimal required fields
				} as unknown as CreateSupplierInput,
			});
			supplierId = createResponse.data!.wms!.createSupplier!.id!;
		} else {
			supplierId = "00000000-0000-0000-0000-000000000000";
		}

		const deleteResponse = await executor(RemoveSupplierMutation, {
			id: supplierId,
		});

		if (testCase.success) {
			expect(deleteResponse.errors).toBeUndefined();
			expect(deleteResponse.data?.wms?.removeSupplier).toBeDefined();
		} else {
			if (deleteResponse.errors) {
				expect(Array.isArray(deleteResponse.errors)).toBe(true);
			} else {
				expect(deleteResponse.data?.wms?.removeSupplier?.success).toBe(false);
			}
		}

		if (testCase.validate) {
			testCase.validate(deleteResponse.data as RemoveSupplierMutationType);
		}
	});
});

// ============================================
// Test Suite: Table Suppliers Query
// ============================================

describe("Graphql Table Suppliers Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: TableSupplierTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(TableSupplierQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.suppliers).toBeDefined();
			testCase.validate(response.data as TableSupplierQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});

// ============================================
// Test Suite: Search Suppliers Query
// ============================================

describe("Graphql Search Suppliers Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: SearchSuppliersTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(SearchSuppliersQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.suppliers).toBeDefined();
			testCase.validate(response.data as SearchSuppliersQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});
