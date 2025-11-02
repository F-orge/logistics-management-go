import { beforeAll, describe, expect, it } from "bun:test";
import "../../setup";
import {
	CreateVehicleMutation,
	RemoveVehicleMutation,
	TableVehicleQuery,
	UpdateVehicleMutation,
} from "../../../src/client";
import type {
	CreateVehicleInput,
	CreateVehicleMutation as CreateVehicleMutationType,
	CreateVehicleMutationVariables,
	RemoveVehicleMutation as RemoveVehicleMutationType,
	RemoveVehicleMutationVariables,
	TableVehicleQuery as TableVehicleQueryType,
	TableVehicleQueryVariables,
	UpdateVehicleInput,
	UpdateVehicleMutation as UpdateVehicleMutationType,
	UpdateVehicleMutationVariables,
} from "../../../src/client/generated/graphql";
import { graphQLQueryExecutor } from "../../helpers";
import type { GraphQLTestCase } from "../../inputs/helpers";

// ============================================
// Type Definitions
// ============================================

type CreateVehicleTestCase = GraphQLTestCase<
	CreateVehicleMutationVariables,
	CreateVehicleMutationType
>;

type UpdateVehicleTestCase = GraphQLTestCase<
	UpdateVehicleMutationVariables,
	UpdateVehicleMutationType
> & {
	createData: CreateVehicleInput;
	updateData: UpdateVehicleInput;
	validate?: (response: UpdateVehicleMutationType, createdVehicle: any) => void;
};

type RemoveVehicleTestCase = GraphQLTestCase<
	RemoveVehicleMutationVariables,
	RemoveVehicleMutationType
> & {
	createData: CreateVehicleInput;
	shouldCreate?: boolean;
	validate?: (response: RemoveVehicleMutationType) => void;
};

type TableVehicleTestCase = GraphQLTestCase<
	TableVehicleQueryVariables,
	TableVehicleQueryType
> & {
	validate: (response: TableVehicleQueryType) => void;
};

// ============================================
// Test Suite: Create Vehicle
// ============================================

describe("Graphql TMS Create Vehicle", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreateVehicleTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(CreateVehicleMutation, testCase.variables);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.tms?.createVehicle).toBeDefined();
			expect(response.data?.tms?.createVehicle?.id).toBeDefined();
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
// Test Suite: Update Vehicle
// ============================================

describe("Graphql TMS Update Vehicle", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: UpdateVehicleTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		// Create initial vehicle
		const createResponse = await executor(CreateVehicleMutation, {
			vehicle: testCase.createData,
		});

		expect(createResponse.data?.tms?.createVehicle?.id).toBeDefined();
		const vehicleId = createResponse.data!.tms!.createVehicle!.id!;
		const createdVehicle = createResponse.data!.tms!.createVehicle!;

		// Update vehicle
		const updateResponse = await executor(UpdateVehicleMutation, {
			id: vehicleId,
			vehicle: testCase.updateData,
		});

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(updateResponse.data?.tms?.updateVehicle).toBeDefined();
			if (testCase.validate) {
				testCase.validate(
					updateResponse.data as UpdateVehicleMutationType,
					createdVehicle,
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
// Test Suite: Remove Vehicle
// ============================================

describe("Graphql TMS Remove Vehicle", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: RemoveVehicleTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		let vehicleId: string;

		if (testCase.shouldCreate) {
			const createResponse = await executor(CreateVehicleMutation, {
				vehicle: {
					// Add minimal required fields
				} as unknown as CreateVehicleInput,
			});
			vehicleId = createResponse.data!.tms!.createVehicle!.id!;
		} else {
			vehicleId = "00000000-0000-0000-0000-000000000000";
		}

		const deleteResponse = await executor(RemoveVehicleMutation, {
			id: vehicleId,
		});

		if (testCase.success) {
			expect(deleteResponse.errors).toBeUndefined();
			expect(deleteResponse.data?.tms?.removeVehicle).toBeDefined();
		} else {
			if (deleteResponse.errors) {
				expect(Array.isArray(deleteResponse.errors)).toBe(true);
			} else {
				expect(deleteResponse.data?.tms?.removeVehicle?.success).toBe(false);
			}
		}

		if (testCase.validate) {
			testCase.validate(deleteResponse.data as RemoveVehicleMutationType);
		}
	});
});

// ============================================
// Test Suite: Table Vehicles Query
// ============================================

describe("Graphql TMS Table Vehicles Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: TableVehicleTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(TableVehicleQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.tms?.vehicles).toBeDefined();
			testCase.validate(response.data as TableVehicleQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});
