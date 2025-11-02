import { beforeAll, describe, expect, it } from "bun:test";
import "../../setup";
import { CreateShipmentLegEventMutation } from "../../../src/client";
import type {
	CreateShipmentLegEventMutation as CreateShipmentLegEventMutationType,
	CreateShipmentLegEventMutationVariables,
} from "../../../src/client/generated/graphql";
import { graphQLQueryExecutor } from "../../helpers";
import type { GraphQLTestCase } from "../../inputs/helpers";

// ============================================
// Type Definitions
// ============================================

type CreateShipmentLegEventTestCase = GraphQLTestCase<
	CreateShipmentLegEventMutationVariables,
	CreateShipmentLegEventMutationType
>;

// ============================================
// Test Suite: Create Shipment Leg Event
// ============================================

describe("Graphql TMS Create Shipment Leg Event", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreateShipmentLegEventTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			CreateShipmentLegEventMutation,
			testCase.variables,
		);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.tms?.createShipmentLegEvent).toBeDefined();
			expect(response.data?.tms?.createShipmentLegEvent?.id).toBeDefined();
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
