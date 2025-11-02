import { beforeAll, describe, expect, it } from "bun:test";
import "../../setup";
import {
	AnalyticsPackagesQuery,
	CreatePackageMutation,
	RemovePackageMutation,
	SearchPackagesQuery,
	TablePackageQuery,
	UpdatePackageMutation,
} from "../../../src/client";
import type {
	AnalyticsPackagesQuery as AnalyticsPackagesQueryType,
	AnalyticsPackagesQueryVariables,
	CreatePackageInput,
	CreatePackageMutation as CreatePackageMutationType,
	CreatePackageMutationVariables,
	RemovePackageMutation as RemovePackageMutationType,
	RemovePackageMutationVariables,
	SearchPackagesQuery as SearchPackagesQueryType,
	SearchPackagesQueryVariables,
	TablePackageQuery as TablePackageQueryType,
	TablePackageQueryVariables,
	UpdatePackageInput,
	UpdatePackageMutation as UpdatePackageMutationType,
	UpdatePackageMutationVariables,
} from "../../../src/client/generated/graphql";
import { graphQLQueryExecutor } from "../../helpers";
import type { GraphQLTestCase } from "../../inputs/helpers";

// ============================================
// Type Definitions
// ============================================

type CreatePackageTestCase = GraphQLTestCase<
	CreatePackageMutationVariables,
	CreatePackageMutationType
>;

type UpdatePackageTestCase = GraphQLTestCase<
	UpdatePackageMutationVariables,
	UpdatePackageMutationType
> & {
	createData: CreatePackageInput;
	updateData: UpdatePackageInput;
	validate?: (response: UpdatePackageMutationType, createdPackage: any) => void;
};

type RemovePackageTestCase = GraphQLTestCase<
	RemovePackageMutationVariables,
	RemovePackageMutationType
> & {
	createData: CreatePackageInput;
	shouldCreate?: boolean;
	validate?: (response: RemovePackageMutationType) => void;
};

type TablePackageTestCase = GraphQLTestCase<
	TablePackageQueryVariables,
	TablePackageQueryType
> & {
	validate: (response: TablePackageQueryType) => void;
};

type SearchPackagesTestCase = GraphQLTestCase<
	SearchPackagesQueryVariables,
	SearchPackagesQueryType
> & {
	validate: (response: SearchPackagesQueryType) => void;
};

type AnalyticsPackagesTestCase = GraphQLTestCase<
	AnalyticsPackagesQueryVariables,
	AnalyticsPackagesQueryType
> & {
	validate: (response: AnalyticsPackagesQueryType) => void;
};
// ============================================
// Test Suite: Create Package
// ============================================

describe("Graphql Create Package", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreatePackageTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(CreatePackageMutation, testCase.variables);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.createPackage).toBeDefined();
			expect(response.data?.wms?.createPackage?.id).toBeDefined();
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
// Test Suite: Update Package
// ============================================

describe("Graphql Update Package", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: UpdatePackageTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		// Create initial Package
		const createResponse = await executor(CreatePackageMutation, {
			package: testCase.createData,
		});

		expect(createResponse.data?.wms?.createPackage?.id).toBeDefined();
		const packageId = createResponse.data!.wms!.createPackage!.id!;
		const createdPackage = createResponse.data!.wms!.createPackage!;

		// Update Package
		const updateResponse = await executor(UpdatePackageMutation, {
			id: testCase.variables.id,
			package: testCase.updateData,
		});

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(updateResponse.data?.wms?.updatePackage).toBeDefined();
			if (testCase.validate) {
				testCase.validate(
					updateResponse.data as UpdatePackageMutationType,
					createdPackage,
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
// Test Suite: Remove Package
// ============================================

describe("Graphql Remove Package", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: RemovePackageTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		let packageId: string;

		if (testCase.shouldCreate) {
			const createResponse = await executor(CreatePackageMutation, {
				package: {
					// Add minimal required fields
				} as unknown as CreatePackageInput,
			});
			packageId = createResponse.data!.wms!.createPackage!.id!;
		} else {
			packageId = "00000000-0000-0000-0000-000000000000";
		}

		const deleteResponse = await executor(RemovePackageMutation, {
			id: packageId,
		});

		if (testCase.success) {
			expect(deleteResponse.errors).toBeUndefined();
			expect(deleteResponse.data?.wms?.removePackage).toBeDefined();
		} else {
			if (deleteResponse.errors) {
				expect(Array.isArray(deleteResponse.errors)).toBe(true);
			} else {
				expect(deleteResponse.data?.wms?.removePackage?.success).toBe(false);
			}
		}

		if (testCase.validate) {
			testCase.validate(deleteResponse.data as RemovePackageMutationType);
		}
	});
});

// ============================================
// Test Suite: Table Packages Query
// ============================================

describe("Graphql Table Packages Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: TablePackageTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(TablePackageQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.packages).toBeDefined();
			testCase.validate(response.data as TablePackageQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});

// ============================================
// Test Suite: Search Packages Query
// ============================================

describe("Graphql Search Packages Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: SearchPackagesTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(SearchPackagesQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.packages).toBeDefined();
			testCase.validate(response.data as SearchPackagesQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});

// ============================================
// Test Suite: Analytics Packages Query
// ============================================

describe("Graphql Analytics Packages Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: AnalyticsPackagesTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(AnalyticsPackagesQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.packages).toBeDefined();
			testCase.validate(response.data as AnalyticsPackagesQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});
