import { describe, expect, it, beforeAll } from "bun:test";
import "../../setup";
import { graphQLQueryExecutor } from "../../helpers";
import type {
	UpdateVehicleMaintenanceMutation as UpdateVehicleMaintenanceMutationType,
	UpdateVehicleMaintenanceMutationVariables,
	RemoveVehicleMaintenanceMutation as RemoveVehicleMaintenanceMutationType,
	RemoveVehicleMaintenanceMutationVariables,
} from "../../../src/client/generated/graphql";
import type { UpdateVehicleMaintenanceInput } from "../../../src/client/generated/graphql";
import {
	UpdateVehicleMaintenanceMutation,
	RemoveVehicleMaintenanceMutation,
} from "../../../src/client";
import type { GraphQLTestCase } from "../../inputs/helpers";

// ============================================
// Type Definitions
// ============================================

type UpdateVehicleMaintenanceTestCase = GraphQLTestCase<
	UpdateVehicleMaintenanceMutationVariables,
	UpdateVehicleMaintenanceMutationType
> & {
	updateData: UpdateVehicleMaintenanceInput;
	validate?: (response: UpdateVehicleMaintenanceMutationType) => void;
};

type RemoveVehicleMaintenanceTestCase = GraphQLTestCase<
	RemoveVehicleMaintenanceMutationVariables,
	RemoveVehicleMaintenanceMutationType
> & {
	validate?: (response: RemoveVehicleMaintenanceMutationType) => void;
};

// ============================================
// Test Suite: Update Vehicle Maintenance
// ============================================

describe("Graphql TMS Update Vehicle Maintenance", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: UpdateVehicleMaintenanceTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		// Update vehicle maintenance
		const updateResponse = await executor(
			UpdateVehicleMaintenanceMutation,
			testCase.variables,
		);

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(updateResponse.data?.tms?.updateVehicleMaintenance).toBeDefined();
			if (testCase.validate) {
				testCase.validate(
					updateResponse.data as UpdateVehicleMaintenanceMutationType,
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
// Test Suite: Remove Vehicle Maintenance
// ============================================

describe("Graphql TMS Remove Vehicle Maintenance", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: RemoveVehicleMaintenanceTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const deleteResponse = await executor(
			RemoveVehicleMaintenanceMutation,
			testCase.variables,
		);

		if (testCase.success) {
			expect(deleteResponse.errors).toBeUndefined();
			expect(deleteResponse.data?.tms?.removeVehicleMaintenance).toBeDefined();
		} else {
			if (deleteResponse.errors) {
				expect(Array.isArray(deleteResponse.errors)).toBe(true);
			} else {
				expect(
					deleteResponse.data?.tms?.removeVehicleMaintenance?.success,
				).toBe(false);
			}
		}

		if (testCase.validate) {
			testCase.validate(
				deleteResponse.data as RemoveVehicleMaintenanceMutationType,
			);
		}
	});
});
