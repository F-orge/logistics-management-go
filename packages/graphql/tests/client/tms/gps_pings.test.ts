import { beforeAll, describe, expect, it } from "bun:test";
import "../../setup";
import {
	CreateGpsPingMutation,
	TableGpsPingQuery,
	UpdateGpsPingMutation,
} from "../../../src/client";
import type {
	CreateGpsPingInput,
	CreateGpsPingMutation as CreateGpsPingMutationType,
	CreateGpsPingMutationVariables,
	TableGpsPingQuery as TableGpsPingQueryType,
	TableGpsPingQueryVariables,
	UpdateGpsPingInput,
	UpdateGpsPingMutation as UpdateGpsPingMutationType,
	UpdateGpsPingMutationVariables,
} from "../../../src/client/generated/graphql";
import { graphQLQueryExecutor } from "../../helpers";
import type { GraphQLTestCase } from "../../inputs/helpers";

// ============================================
// Type Definitions
// ============================================

type CreateGpsPingTestCase = GraphQLTestCase<
	CreateGpsPingMutationVariables,
	CreateGpsPingMutationType
>;

type UpdateGpsPingTestCase = GraphQLTestCase<
	UpdateGpsPingMutationVariables,
	UpdateGpsPingMutationType
> & {
	createData: CreateGpsPingInput;
	updateData: UpdateGpsPingInput;
	validate?: (response: UpdateGpsPingMutationType, createdGpsPing: any) => void;
};

type TableGpsPingTestCase = GraphQLTestCase<
	TableGpsPingQueryVariables,
	TableGpsPingQueryType
> & {
	validate: (response: TableGpsPingQueryType) => void;
};

// ============================================
// Test Suite: Create GPS Ping
// ============================================

describe("Graphql TMS Create GPS Ping", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreateGpsPingTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(CreateGpsPingMutation, testCase.variables);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.tms?.createGpsPing).toBeDefined();
			expect(response.data?.tms?.createGpsPing?.id).toBeDefined();
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
// Test Suite: Update GPS Ping
// ============================================

describe("Graphql TMS Update GPS Ping", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: UpdateGpsPingTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		// Create initial GPS ping
		const createResponse = await executor(CreateGpsPingMutation, {
			gpsPing: testCase.createData,
		});

		expect(createResponse.data?.tms?.createGpsPing?.id).toBeDefined();
		const gpsPingId = createResponse.data!.tms!.createGpsPing!.id!;
		const createdGpsPing = createResponse.data!.tms!.createGpsPing!;

		// Update GPS ping
		const updateResponse = await executor(UpdateGpsPingMutation, {
			id: gpsPingId,
			gpsPing: testCase.updateData,
		});

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(updateResponse.data?.tms?.updateGpsPing).toBeDefined();
			if (testCase.validate) {
				testCase.validate(
					updateResponse.data as UpdateGpsPingMutationType,
					createdGpsPing,
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
// Test Suite: Table GPS Pings Query
// ============================================

describe("Graphql TMS Table GPS Pings Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: TableGpsPingTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(TableGpsPingQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.tms?.gpsPings).toBeDefined();
			testCase.validate(response.data as TableGpsPingQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});
