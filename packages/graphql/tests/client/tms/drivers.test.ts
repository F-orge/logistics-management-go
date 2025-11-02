import { beforeAll, describe, expect, it } from "bun:test";
import "../../setup";
import {
	AnalyticsDriversQuery,
	CreateDriverMutation,
	RemoveDriverMutation,
	SearchDriversQuery,
	TableDriverQuery,
	UpdateDriverMutation,
} from "../../../src/client";
import type {
	AnalyticsDriversQuery as AnalyticsDriversQueryType,
	AnalyticsDriversQueryVariables,
	CreateDriverInput,
	CreateDriverMutation as CreateDriverMutationType,
	CreateDriverMutationVariables,
	RemoveDriverMutation as RemoveDriverMutationType,
	RemoveDriverMutationVariables,
	SearchDriversQuery as SearchDriversQueryType,
	SearchDriversQueryVariables,
	TableDriverQuery as TableDriverQueryType,
	TableDriverQueryVariables,
	UpdateDriverInput,
	UpdateDriverMutation as UpdateDriverMutationType,
	UpdateDriverMutationVariables,
} from "../../../src/client/generated/graphql";
import { graphQLQueryExecutor } from "../../helpers";
import type { GraphQLTestCase } from "../../inputs/helpers";

// ============================================
// Type Definitions
// ============================================

type CreateDriverTestCase = GraphQLTestCase<
	CreateDriverMutationVariables,
	CreateDriverMutationType
>;

type UpdateDriverTestCase = GraphQLTestCase<
	UpdateDriverMutationVariables,
	UpdateDriverMutationType
> & {
	createData: CreateDriverInput;
	updateData: UpdateDriverInput;
	validate?: (response: UpdateDriverMutationType, createdDriver: any) => void;
};

type RemoveDriverTestCase = GraphQLTestCase<
	RemoveDriverMutationVariables,
	RemoveDriverMutationType
> & {
	createData: CreateDriverInput;
	shouldCreate?: boolean;
	validate?: (response: RemoveDriverMutationType) => void;
};

type TableDriverTestCase = GraphQLTestCase<
	TableDriverQueryVariables,
	TableDriverQueryType
> & {
	validate: (response: TableDriverQueryType) => void;
};

type SearchDriverTestCase = GraphQLTestCase<
	SearchDriversQueryVariables,
	SearchDriversQueryType
> & {
	validate: (response: SearchDriversQueryType) => void;
};

type AnalyticsDriverTestCase = GraphQLTestCase<
	AnalyticsDriversQueryVariables,
	AnalyticsDriversQueryType
> & {
	validate: (response: AnalyticsDriversQueryType) => void;
};

// ============================================
// Test Suite: Create Driver
// ============================================

describe("Graphql TMS Create Driver", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreateDriverTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(CreateDriverMutation, testCase.variables);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.tms?.createDriver).toBeDefined();
			expect(response.data?.tms?.createDriver?.id).toBeDefined();
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
// Test Suite: Update Driver
// ============================================

describe("Graphql TMS Update Driver", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: UpdateDriverTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		// Create initial driver
		const createResponse = await executor(CreateDriverMutation, {
			driver: testCase.createData,
		});

		expect(createResponse.data?.tms?.createDriver?.id).toBeDefined();
		const driverId = createResponse.data!.tms!.createDriver!.id!;
		const createdDriver = createResponse.data!.tms!.createDriver!;

		// Update driver
		const updateResponse = await executor(UpdateDriverMutation, {
			id: driverId,
			driver: testCase.updateData,
		});

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(updateResponse.data?.tms?.updateDriver).toBeDefined();
			if (testCase.validate) {
				testCase.validate(
					updateResponse.data as UpdateDriverMutationType,
					createdDriver,
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
// Test Suite: Remove Driver
// ============================================

describe("Graphql TMS Remove Driver", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: RemoveDriverTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		let driverId: string;

		if (testCase.shouldCreate) {
			const createResponse = await executor(CreateDriverMutation, {
				driver: {
					// Add minimal required fields
				} as unknown as CreateDriverInput,
			});
			driverId = createResponse.data!.tms!.createDriver!.id!;
		} else {
			driverId = "00000000-0000-0000-0000-000000000000";
		}

		const deleteResponse = await executor(RemoveDriverMutation, {
			id: driverId,
		});

		if (testCase.success) {
			expect(deleteResponse.errors).toBeUndefined();
			expect(deleteResponse.data?.tms?.removeDriver).toBeDefined();
		} else {
			if (deleteResponse.errors) {
				expect(Array.isArray(deleteResponse.errors)).toBe(true);
			} else {
				expect(deleteResponse.data?.tms?.removeDriver?.success).toBe(false);
			}
		}

		if (testCase.validate) {
			testCase.validate(deleteResponse.data as RemoveDriverMutationType);
		}
	});
});

// ============================================
// Test Suite: Table Drivers Query
// ============================================

describe("Graphql TMS Table Drivers Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: TableDriverTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(TableDriverQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.tms?.drivers).toBeDefined();
			testCase.validate(response.data as TableDriverQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});

// ============================================
// Test Suite: Search Drivers Query
// ============================================

describe("Graphql TMS Search Drivers Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: SearchDriverTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(SearchDriversQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.tms?.drivers).toBeDefined();
			testCase.validate(response.data as SearchDriversQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});

// ============================================
// Test Suite: Analytics Drivers Query
// ============================================

describe("Graphql TMS Analytics Drivers Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: AnalyticsDriverTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(AnalyticsDriversQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.tms?.drivers).toBeDefined();
			testCase.validate(response.data as AnalyticsDriversQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});
