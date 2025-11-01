import { describe, expect, it, beforeAll } from "bun:test";
import "../../setup";
import { graphQLQueryExecutor } from "../../helpers";
import type {
	CreateRouteMutation as CreateRouteMutationType,
	CreateRouteMutationVariables,
	UpdateRouteMutation as UpdateRouteMutationType,
	UpdateRouteMutationVariables,
	RemoveRouteMutation as RemoveRouteMutationType,
	RemoveRouteMutationVariables,
	TableRouteQuery as TableRouteQueryType,
	TableRouteQueryVariables,
} from "../../../src/client/generated/graphql";
import type {
	CreateRouteInput,
	UpdateRouteInput,
} from "../../../src/client/generated/graphql";
import {
	CreateRouteMutation,
	UpdateRouteMutation,
	RemoveRouteMutation,
	TableRouteQuery,
} from "../../../src/client";
import type { GraphQLTestCase } from "../../inputs/helpers";

// ============================================
// Type Definitions
// ============================================

type CreateRouteTestCase = GraphQLTestCase<
	CreateRouteMutationVariables,
	CreateRouteMutationType
>;

type UpdateRouteTestCase = GraphQLTestCase<
	UpdateRouteMutationVariables,
	UpdateRouteMutationType
> & {
	createData: CreateRouteInput;
	updateData: UpdateRouteInput;
	validate?: (response: UpdateRouteMutationType, createdRoute: any) => void;
};

type RemoveRouteTestCase = GraphQLTestCase<
	RemoveRouteMutationVariables,
	RemoveRouteMutationType
> & {
	createData: CreateRouteInput;
	shouldCreate?: boolean;
	validate?: (response: RemoveRouteMutationType) => void;
};

type TableRouteTestCase = GraphQLTestCase<
	TableRouteQueryVariables,
	TableRouteQueryType
> & {
	validate: (response: TableRouteQueryType) => void;
};

// ============================================
// Test Suite: Create Route
// ============================================

describe("Graphql TMS Create Route", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreateRouteTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(CreateRouteMutation, testCase.variables);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.tms?.createRoute).toBeDefined();
			expect(response.data?.tms?.createRoute?.id).toBeDefined();
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
// Test Suite: Update Route
// ============================================

describe("Graphql TMS Update Route", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: UpdateRouteTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		// Create initial route
		const createResponse = await executor(CreateRouteMutation, {
			route: testCase.createData,
		});

		expect(createResponse.data?.tms?.createRoute?.id).toBeDefined();
		const routeId = createResponse.data!.tms!.createRoute!.id!;
		const createdRoute = createResponse.data!.tms!.createRoute!;

		// Update route
		const updateResponse = await executor(UpdateRouteMutation, {
			id: routeId,
			route: testCase.updateData,
		});

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(updateResponse.data?.tms?.updateRoute).toBeDefined();
			if (testCase.validate) {
				testCase.validate(
					updateResponse.data as UpdateRouteMutationType,
					createdRoute,
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
// Test Suite: Remove Route
// ============================================

describe("Graphql TMS Remove Route", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: RemoveRouteTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		let routeId: string;

		if (testCase.shouldCreate) {
			const createResponse = await executor(CreateRouteMutation, {
				route: {
					// Add minimal required fields
				} as unknown as CreateRouteInput,
			});
			routeId = createResponse.data!.tms!.createRoute!.id!;
		} else {
			routeId = "00000000-0000-0000-0000-000000000000";
		}

		const deleteResponse = await executor(RemoveRouteMutation, {
			id: routeId,
		});

		if (testCase.success) {
			expect(deleteResponse.errors).toBeUndefined();
			expect(deleteResponse.data?.tms?.removeRoute).toBeDefined();
		} else {
			if (deleteResponse.errors) {
				expect(Array.isArray(deleteResponse.errors)).toBe(true);
			} else {
				expect(deleteResponse.data?.tms?.removeRoute?.success).toBe(false);
			}
		}

		if (testCase.validate) {
			testCase.validate(deleteResponse.data as RemoveRouteMutationType);
		}
	});
});

// ============================================
// Test Suite: Table Routes Query
// ============================================

describe("Graphql TMS Table Routes Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: TableRouteTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(TableRouteQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.tms?.routes).toBeDefined();
			testCase.validate(response.data as TableRouteQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});
