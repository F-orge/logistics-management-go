import { beforeAll, describe, expect, it } from "bun:test";
import "../../setup";
import {
	CreateShipmentLegMutation,
	TableShipmentLegQuery,
	UpdateShipmentLegMutation,
} from "../../../src/client";
import type {
	CreateShipmentLegInput,
	CreateShipmentLegMutation as CreateShipmentLegMutationType,
	CreateShipmentLegMutationVariables,
	TableShipmentLegQueryQuery as TableShipmentLegQueryType,
	TableShipmentLegQueryQueryVariables as TableShipmentLegQueryVariables,
	UpdateShipmentLegInput,
	UpdateShipmentLegMutation as UpdateShipmentLegMutationType,
	UpdateShipmentLegMutationVariables,
} from "../../../src/client/generated/graphql";
import { graphQLQueryExecutor } from "../../helpers";
import type { GraphQLTestCase } from "../../inputs/helpers";

// ============================================
// Type Definitions
// ============================================

type CreateShipmentLegTestCase = GraphQLTestCase<
	CreateShipmentLegMutationVariables,
	CreateShipmentLegMutationType
>;

type UpdateShipmentLegTestCase = GraphQLTestCase<
	UpdateShipmentLegMutationVariables,
	UpdateShipmentLegMutationType
> & {
	createData: CreateShipmentLegInput;
	updateData: UpdateShipmentLegInput;
	validate?: (
		response: UpdateShipmentLegMutationType,
		createdShipmentLeg: any,
	) => void;
};

type TableShipmentLegTestCase = GraphQLTestCase<
	TableShipmentLegQueryVariables,
	TableShipmentLegQueryType
> & {
	validate: (response: TableShipmentLegQueryType) => void;
};

// ============================================
// Test Suite: Create Shipment Leg
// ============================================

describe("Graphql TMS Create Shipment Leg", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreateShipmentLegTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			CreateShipmentLegMutation,
			testCase.variables,
		);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.tms?.createShipmentLeg).toBeDefined();
			expect(response.data?.tms?.createShipmentLeg?.id).toBeDefined();
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
// Test Suite: Update Shipment Leg
// ============================================

describe("Graphql TMS Update Shipment Leg", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: UpdateShipmentLegTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		// Create initial shipment leg
		const createResponse = await executor(CreateShipmentLegMutation, {
			shipmentLeg: testCase.createData,
		});

		expect(createResponse.data?.tms?.createShipmentLeg?.id).toBeDefined();
		const shipmentLegId = createResponse.data!.tms!.createShipmentLeg!.id!;
		const createdShipmentLeg = createResponse.data!.tms!.createShipmentLeg!;

		// Update shipment leg
		const updateResponse = await executor(UpdateShipmentLegMutation, {
			id: shipmentLegId,
			shipmentLeg: testCase.updateData,
		});

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(updateResponse.data?.tms?.updateShipmentLeg).toBeDefined();
			if (testCase.validate) {
				testCase.validate(
					updateResponse.data as UpdateShipmentLegMutationType,
					createdShipmentLeg,
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
// Test Suite: Table Shipment Legs Query
// ============================================

describe("Graphql TMS Table Shipment Legs Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: TableShipmentLegTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(TableShipmentLegQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.tms?.shipmentLegs).toBeDefined();
			testCase.validate(response.data as TableShipmentLegQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});
