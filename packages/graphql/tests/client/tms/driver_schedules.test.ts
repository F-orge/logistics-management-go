import { beforeAll, describe, expect, it } from "bun:test";
import "../../setup";
import {
	CreateDriverScheduleMutation,
	RemoveDriverScheduleMutation,
	UpdateDriverScheduleMutation,
} from "../../../src/client";
import type {
	CreateDriverScheduleInput,
	CreateDriverScheduleMutation as CreateDriverScheduleMutationType,
	CreateDriverScheduleMutationVariables,
	RemoveDriverScheduleMutation as RemoveDriverScheduleMutationType,
	RemoveDriverScheduleMutationVariables,
	UpdateDriverScheduleInput,
	UpdateDriverScheduleMutation as UpdateDriverScheduleMutationType,
	UpdateDriverScheduleMutationVariables,
} from "../../../src/client/generated/graphql";
import { graphQLQueryExecutor } from "../../helpers";
import type { GraphQLTestCase } from "../../inputs/helpers";

// ============================================
// Type Definitions
// ============================================

type CreateDriverScheduleTestCase = GraphQLTestCase<
	CreateDriverScheduleMutationVariables,
	CreateDriverScheduleMutationType
>;

type UpdateDriverScheduleTestCase = GraphQLTestCase<
	UpdateDriverScheduleMutationVariables,
	UpdateDriverScheduleMutationType
> & {
	createData: CreateDriverScheduleInput;
	updateData: UpdateDriverScheduleInput;
	validate?: (
		response: UpdateDriverScheduleMutationType,
		createdSchedule: any,
	) => void;
};

type RemoveDriverScheduleTestCase = GraphQLTestCase<
	RemoveDriverScheduleMutationVariables,
	RemoveDriverScheduleMutationType
> & {
	createData: CreateDriverScheduleInput;
	shouldCreate?: boolean;
	validate?: (response: RemoveDriverScheduleMutationType) => void;
};

// ============================================
// Test Suite: Create Driver Schedule
// ============================================

describe("Graphql TMS Create Driver Schedule", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreateDriverScheduleTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			CreateDriverScheduleMutation,
			testCase.variables,
		);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.tms?.createDriverSchedule).toBeDefined();
			expect(response.data?.tms?.createDriverSchedule?.id).toBeDefined();
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
// Test Suite: Update Driver Schedule
// ============================================

describe("Graphql TMS Update Driver Schedule", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: UpdateDriverScheduleTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		// Create initial schedule
		const createResponse = await executor(CreateDriverScheduleMutation, {
			driverSchedule: testCase.createData,
		});

		expect(createResponse.data?.tms?.createDriverSchedule?.id).toBeDefined();
		const scheduleId = createResponse.data!.tms!.createDriverSchedule!.id!;
		const createdSchedule = createResponse.data!.tms!.createDriverSchedule!;

		// Update schedule
		const updateResponse = await executor(UpdateDriverScheduleMutation, {
			id: scheduleId,
			driverSchedule: testCase.updateData,
		});

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(updateResponse.data?.tms?.updateDriverSchedule).toBeDefined();
			if (testCase.validate) {
				testCase.validate(
					updateResponse.data as UpdateDriverScheduleMutationType,
					createdSchedule,
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
// Test Suite: Remove Driver Schedule
// ============================================

describe("Graphql TMS Remove Driver Schedule", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: RemoveDriverScheduleTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		let scheduleId: string;

		if (testCase.shouldCreate) {
			const createResponse = await executor(CreateDriverScheduleMutation, {
				driverSchedule: {
					// Add minimal required fields
				} as unknown as CreateDriverScheduleInput,
			});
			scheduleId = createResponse.data!.tms!.createDriverSchedule!.id!;
		} else {
			scheduleId = "00000000-0000-0000-0000-000000000000";
		}

		const deleteResponse = await executor(RemoveDriverScheduleMutation, {
			id: scheduleId,
		});

		if (testCase.success) {
			expect(deleteResponse.errors).toBeUndefined();
			expect(deleteResponse.data?.tms?.removeDriverSchedule).toBeDefined();
		} else {
			if (deleteResponse.errors) {
				expect(Array.isArray(deleteResponse.errors)).toBe(true);
			} else {
				expect(deleteResponse.data?.tms?.removeDriverSchedule?.success).toBe(
					false,
				);
			}
		}

		if (testCase.validate) {
			testCase.validate(
				deleteResponse.data as RemoveDriverScheduleMutationType,
			);
		}
	});
});
